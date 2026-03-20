const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,

  // Dynamic fields 🔥
  extraFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);