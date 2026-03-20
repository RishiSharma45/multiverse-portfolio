const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};