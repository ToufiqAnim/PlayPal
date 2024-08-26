import { Request, Response } from 'express';
import {
  signUpService,
  loginService,
  getProfileService,
  updateProfileService,
  GetUsers,
} from './user.service';
import { z } from 'zod';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

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
export const login = catchAsync(async (req, res) => {
  const result = await loginService(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});
export const GetAllUsers = catchAsync(async (req: Request, res: Response) => {
  const facilities = await GetUsers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users retrieved successfully',
    data: facilities,
  });
});
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
