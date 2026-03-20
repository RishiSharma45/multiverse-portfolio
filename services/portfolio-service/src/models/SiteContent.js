const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: '' },
    heroSubtitle: { type: String, default: '' },

    aboutText: { type: String, default: '' },

    skills: {
      type: [String],
      default: []
    },

    contactEmail: { type: String, default: '' },
    contactLinkedIn: { type: String, default: '' },
    contactGitHub: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteContent', siteContentSchema);