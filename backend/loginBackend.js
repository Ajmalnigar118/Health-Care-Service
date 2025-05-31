// backend/loginBackend.js
const User = require('../models/User');

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful!' });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}

module.exports = handleLogin;
