/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import notFound from './app/middlewares/notFound';
// import router from './app/routes';
import { errorHandler } from './app/middlewares/errorHandeler';
import { AuthRoutes } from './app/modules/User/authRoutes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api/auth', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi Next Level Developer !');
});

app.use(errorHandler);

//Not Found
app.use(notFound);

export default app;
