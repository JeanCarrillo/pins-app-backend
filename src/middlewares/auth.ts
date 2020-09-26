import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { JwtTokenInterface, RequestWithUserId } from '../types/interfaces';

export const authMiddleware = (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as JwtTokenInterface;
    req.userId = userId;
    return next();
  } catch (error) {
    return res.status(403).json({
      message: 'Not authenticated',
    });
  }
};
