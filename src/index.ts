import express, { Application, Request, Response, NextFunction } from 'express';
import registerRoute from './routes/register';
import loginRoute from './routes/login';
import statsRoute from './routes/stats';
import { authMiddleware } from './middlewares/auth';
import {sendEmailController} from './controllers/emailController';  

import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.use('/stats', authMiddleware, statsRoute);
app.use('/email', sendEmailController);

app.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.send('This is a protected route');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
