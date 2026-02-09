const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

function buildTransporter() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const transporter = buildTransporter();
  const { CONTACT_FROM, CONTACT_TO } = process.env;

  if (!transporter || !CONTACT_FROM || !CONTACT_TO) {
    return res.status(500).json({ error: 'Email service is not configured yet.' });
  }

  try {
    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });

    return res.status(200).json({ status: 'ok', message: 'Thanks for reaching out!' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;
