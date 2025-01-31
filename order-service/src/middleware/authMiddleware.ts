import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT token
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    (req as any).user = decoded; // Store the decoded user data in the request
    global.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticateJWT;
