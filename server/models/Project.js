const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    stack: [{ type: String, required: true }],
    repoUrl: { type: String },
    liveUrl: { type: String },
    role: { type: String },
    highlights: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
