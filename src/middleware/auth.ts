import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

// Rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Authentication middleware
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = verify(token, process.env.JWT_SECRET || '');
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  req.userId = (decodedToken as any).userId;
  next();
};