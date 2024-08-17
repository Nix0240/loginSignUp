const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/default.json');


exports.register = async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;
  
  try {
    const user = new User({ firstName, lastName, mobile, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
