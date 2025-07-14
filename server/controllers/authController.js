import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    }); 
    await newUser.save();
    // Generate JWT token
    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }     

};

 const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }   
    // Generate JWT token
    const token = jwt.sign({ id: user._id ,username: user.username}, process.env.JWT_SECRET, {
      expiresIn: '7d',
    }); 
    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } 
};  

export { register, login };
