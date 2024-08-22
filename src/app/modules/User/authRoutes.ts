import express from 'express';
import { login, signUp } from './user.controller';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

export const AuthRoutes = router;
