import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET as string;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'You have no access to this route',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'object' && 'userId' in decoded) {
      (req as any).userId = (decoded as JwtPayload).userId; // Attach the userId to the request object
      next();
    } else {
      throw new Error('Invalid token payload');
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'You have no access to this route',
    });
  }
};
