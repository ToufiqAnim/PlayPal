import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

// Sign Up Controller
const SignUp = async (req: Request, res: Response) => {
  const newUser = await UserService.SignUp(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: newUser,
  });
};

// Login Controller
const Login = catchAsync(async (req, res) => {
  const result = await UserService.Login(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});
export const UserController = {
  SignUp,
  Login,
};
