import { Request, Response } from 'express';
import {
  signUpService,
  loginService,
  getProfileService,
  updateProfileService,
} from './user.service';
import { z } from 'zod';

// Sign Up Controller
export const signUp = async (req: Request, res: Response) => {
  try {
    const newUser = await signUpService(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message:
        error instanceof z.ZodError
          ? 'Validation error'
          : 'Internal server error',
      error: error instanceof z.ZodError ? error.errors : error.message,
    });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginService(email, password);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: error.message,
    });
  }
};

// Get Profile Controller
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await getProfileService(userId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: error.message,
    });
  }
};

// Update Profile Controller
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const updatedUser = await updateProfileService(userId, req.body);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: error.message,
    });
  }
};
