import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { IUser, User } from './user.model';
import { userValidationSchema } from './user.validation';

// JWT Secret Key
const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'remember you secret';

// Service for signing up a user
export const signUpService = async (userData: IUser) => {
  // Validate data using Zod
  const validatedData = userValidationSchema.parse(userData);

  // Check if email already exists
  const existingUser = await User.findOne({ email: validatedData.email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(validatedData.password, 10);
  const newUser = new User({ ...validatedData, password: hashedPassword });

  // Save user
  await newUser.save();
  newUser.password = ''; // Remove password before returning user data

  return newUser;
};

// Service for logging in a user
export const loginService = async (email: string, password: string) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user };
};

// Service for getting user profile
export const getProfileService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.password = ''; // Remove password before returning user data
  return user;
};

// Service for updating user profile
export const updateProfileService = async (
  userId: string,
  updateData: Partial<IUser>,
) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });

  if (!updatedUser) {
    throw new Error('User not found');
  }

  updatedUser.password = ''; // Remove password before returning user data
  return updatedUser;
};
