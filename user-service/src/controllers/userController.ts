import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    _id:null,
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '3h' });
  res.json({ accessToken,user:{id:user._id,name:user.name,email:user.email} });
};


export const userProfile = async (req: Request, res: Response) => {

  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.json({ user:{id:user._id,name:user.name,email:user.email} });
};
