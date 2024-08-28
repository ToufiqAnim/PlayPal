import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidationSchema.UserSignUpValidationSchema),
  UserController.SignUp,
);
router.post(
  '/login',
  validateRequest(UserValidationSchema.UserLoginValidationSchema),
  UserController.Login,
);

export const AuthRoutes = router;
