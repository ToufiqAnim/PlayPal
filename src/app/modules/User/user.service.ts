import { User } from './user.model';
import { ILoginUser, IUser } from './user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { createToken } from '../../utils/createTOken';
import config from '../../config';

// Service for signing up a user
const SignUp = async (userData: IUser) => {
  const existingUser = await User.isUserExists(userData.email);
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!!!');
  }
  const result = await User.create(userData);

  return result;
};

// Service for logging in a user
const Login = async (payload: ILoginUser) => {
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
    user,
  };
};
export const UserService = {
  SignUp,
  Login,
};
