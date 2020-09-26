import * as jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import { UserDocument } from '../types/interfaces';
import User from '../models/User';

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{
  user: Document;
  token: string;
}> => {
  try {
    const user = (await User.findOne({ username })) as UserDocument;
    // user not found
    if (!user) throw new Error('Error during login: invalid credentials');

    const valid = await user.validatePassword(password);

    // invalid password
    if (!valid) throw new Error('Error during login: invalid credentials');

    return {
      user,
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      }),
    };
  } catch (error) {
    throw new Error('Error during login: invalid credentials');
  }
};

export const signup = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<Document> => {
  try {
    const newUser = new User({ username, password });
    return await newUser.save();
  } catch (error) {
    throw new Error('Error creating user');
  }
};
