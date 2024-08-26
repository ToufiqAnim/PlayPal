import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { IUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    const user = await User.isUserExists(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
