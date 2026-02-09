const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/phibo_portfolio';

const seedProjects = [
  {
    title: 'Smart Inventory Hub',
    summary: 'Inventory tracking app with role-based access, analytics dashboard, and MongoDB storage.',
    stack: ['React', 'Node', 'MongoDB'],
    role: 'Full Stack Developer',
    highlights: ['Role-based access', 'Inventory analytics', 'Responsive UI']
  },
  {
    title: 'Event Booking Suite',
    summary: 'Full-stack booking platform with calendar management, notifications, and payments API.',
    stack: ['Next.js', 'Express', 'MongoDB'],
    role: 'Full Stack Developer',
    highlights: ['Calendar sync', 'Automated reminders', 'Payment integration']
  },
  {
    title: 'Portfolio CMS',
    summary: 'Custom CMS to manage personal projects, skills, and contact leads in one place.',
    stack: ['Vue', 'REST API', 'MongoDB'],
    role: 'Backend + Frontend',
    highlights: ['Content publishing', 'Secure admin', 'Fast queries']
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  await Project.deleteMany({});
  await Project.insertMany(seedProjects);
  console.log('Seeded projects:', seedProjects.length);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
