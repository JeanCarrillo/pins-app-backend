import { usersService } from '../services';
import { Response } from 'express';
import { RequestWithUserId } from '../types/interfaces';

// export const getUsers = async (
//   req: RequestWithUserId,
//   res: Response,
// ): Promise<Response> => {
//   try {
//     const users = await usersService.getUsers();
//     return res.json({ data: users });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const getUser = async (
  req: RequestWithUserId,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;
    if (id !== req.userId)
      return res.status(403).json({ message: 'Unauthorized' });

    const user = await usersService.getUser(id);
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// export const deleteUser = async (
//   req: RequestWithUserId,
//   res: Response,
// ): Promise<Response> => {
//   try {
//     const { id } = req.params;
//     await usersService.deleteUser(id);
//     return res.status(200).send({ message: 'OK!' });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };
