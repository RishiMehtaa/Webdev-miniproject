const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const { sendMail } = require('../utils/mailer');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

async function createUser(req, res) {
  try {
    const data = req.body;
    if (!data.name || !data.email || !data.password) return res.status(400).json({ message: 'name, email and password required' });

    const existing = await User.findOne({ email: data.email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(data.password, 10);
    const user = new User({ name: data.name, email: data.email, password: hashed, role: data.role || 'volunteer' });
    await user.save();

   
    if (user.email) {
      sendMail(user.email, 'Welcome', `Welcome ${user.name}!`).catch(() => {});
    }

    return res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const data = req.body;
    if (!data.email || !data.password) return res.status(400).json({ message: 'email and password required' });

    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({ message: 'Login successful', userId: user._id, role: user.role, token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function getProfile(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: 'userId required' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = { createUser, loginUser, getProfile };
