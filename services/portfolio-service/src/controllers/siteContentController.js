const SiteContent = require('../models/SiteContent');

exports.getSiteContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne();

    if (!content) {
      content = await SiteContent.create({
        heroTitle: 'Welcome to My Multiverse Portfolio',
        heroSubtitle: 'Exploring projects, ideas, and skills across different universes of technology.',
        aboutText:
          'I build creative and technical solutions with a focus on full-stack development, microservices, and futuristic user experiences.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Microservices'],
        contactEmail: 'yourmail@example.com',
        contactLinkedIn: 'your-linkedin-profile',
        contactGitHub: 'your-github-profile'
      });
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSiteContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne();

    if (!content) {
      content = new SiteContent(req.body);
    } else {
      Object.assign(content, req.body);
    }

    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};