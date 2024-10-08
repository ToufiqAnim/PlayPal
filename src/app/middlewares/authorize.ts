import { Request, Response, NextFunction } from 'express';
import { User } from '../modules/User/user.model';

// Middleware to authorize based on role
export const authorize = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user || user.role !== role) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'ERROR!! You dont have permission',
      });
    }

    next();
  };
};
