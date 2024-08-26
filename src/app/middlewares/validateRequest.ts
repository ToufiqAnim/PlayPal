/* import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ERROR } from '../modules/shared/api.response.types';
import httpStatus from 'http-status';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof Error) {
        return ERROR(
          res,
          httpStatus.BAD_REQUEST,
          'Validation error',
          (err as any).errors || [{ message: err.message }],
          err.stack,
        );
      }
    }
  };
};
export default validateRequest;
