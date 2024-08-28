import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { IUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, email } = decoded;

      const user = await User.isUserExists(email);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'No Data Found !');
      }

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        );
      }

      req.user = decoded;
      next();
    } catch (error: any) {
      console.error('JWT Verification Error:', error.message); // Log the error for debugging
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }
  });
};

export default auth;
