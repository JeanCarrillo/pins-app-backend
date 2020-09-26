import { Request, Response } from 'express';
import { authService } from '../services';

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const data = await authService.login({
      username,
      password,
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Error during login');
  }
};

export const signup = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { username } = req.body;
    if (username.length < 4)
      return res
        .status(403)
        .json({ message: 'Username should be at least 4 characters' });
    const createdUser = await authService.signup({ ...req.body });
    return res.json({ data: createdUser });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
