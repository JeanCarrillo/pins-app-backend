import { Request } from 'express';
import { Document } from 'mongoose';

export interface RequestWithUserId extends Request {
  userId: string;
}

export interface JwtTokenInterface {
  userId: string;
}

export interface UserDocument extends Document {
  validatePassword(pw: string): boolean;
}
