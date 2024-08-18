import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (token == null) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    (req as any).user = user;
    next();
  });
};

const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  authenticateToken(req, res, () => {
    const user = (req as any).user;

    if (user && user.role === 'ADMIN') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  });
};

export { authenticateToken as authMiddleware, authorizeAdmin as adminMiddleware };
