import * as jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import User from '../models/User';

interface UserDocument extends Document {
  validatePassword(pw: string): boolean;
}

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
    console.log(error);
    throw new Error(error.message);
  }
};

export const signup = async (user: {
  username: string;
  password: string;
}): Promise<Document> => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    console.log({ error });
    throw new Error('Error creating user');
  }
};
