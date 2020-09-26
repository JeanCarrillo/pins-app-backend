import { Request, Response } from 'express';
import { authService, usersService } from '../services';

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const data = await authService.login({
      username,
      password,
    });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(403).json('Invalid credentials');
  }
};

export const signup = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(403).json({ message: 'Invalid request' });
    if (username.length < 4)
      return res
        .status(403)
        .json({ message: 'Username should be at least 4 characters' });
    if (password.length < 4)
      return res
        .status(403)
        .json({ message: 'Password should be at least 4 characters' });
    const userExists = await usersService.getUserWithUsername(username);
    if (userExists)
      return res.status(403).json({
        message: 'User already exists',
      });
    const createdUser = await authService.signup({ username, password });
    return res.json({ data: createdUser });
  } catch (error) {
    return res.status(500).json({
      message: 'Error during sign up',
    });
  }
};
