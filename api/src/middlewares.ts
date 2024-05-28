import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IProtectedRequest } from './type';

export const verifyToken = (req: IProtectedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.userId = (decoded as { userId: string }).userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
