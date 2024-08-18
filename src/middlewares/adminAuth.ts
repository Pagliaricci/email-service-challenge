import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from './auth';

const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    const user = (req as any).user;

    if (user && user.role === 'ADMIN') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  });
};

export default authorizeAdmin;
