import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/signup', UserController.SignUp);
router.post('/login', UserController.Login);

export const AuthRoutes = router;
