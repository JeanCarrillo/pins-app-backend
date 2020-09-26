import { pinsService, usersService } from '../services';
import { Response } from 'express';
import { RequestWithUserId } from '../types/interfaces';

export const getPins = async (
  req: RequestWithUserId,
  res: Response,
): Promise<Response> => {
  try {
    const todos = await pinsService.getPins();
    return res.json({ data: todos });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

export const createPin = async (
  req: RequestWithUserId,
  res: Response,
): Promise<Response> => {
  try {
    const { title, description, lat, lng, startDate, duration } = req.body;
    const { filename } = req.file;
    const { userId } = req;

    if (duration < 1 || duration > 24)
      return res.status(403).json({ message: 'Invalid request' });

    const pointsToRemove = Math.floor(duration);

    const user = await usersService.getUser(userId);
    if (user.get('points') < pointsToRemove)
      return res.status(403).json({ message: 'Not enough points' });

    const sDate = new Date(startDate);
    const endDate = new Date(
      sDate.setHours(sDate.getHours() + duration),
    ).toUTCString();

    const createdPin = await pinsService.createPin({
      title,
      description,
      lat,
      lng,
      startDate: sDate.toUTCString(),
      endDate,
      filename,
    });

    await usersService.addPinToUser(userId, createdPin._id, pointsToRemove);

    return res.status(201).json({
      data: createdPin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating pin' });
  }
};

// export const updatePin = async (
//   req: RequestWithUserId,
//   res: Response,
// ): Promise<Response> => {
//   try {
//     // const { id } = req.params;
//     // const { task, done } = req.body;
//     const updatedPin = await pinsService.updatePin();
//     return res.json({ data: updatedPin });
//   } catch ({ message }) {
//     return res.status(500).json({ message });
//   }
// };

// export const deletePin = async (
//   req: RequestWithUserId,
//   res: Response,
// ): Promise<Response> => {
//   try {
//     const { id } = req.params;
//     await pinsService.deletePin(id);
//     return res.status(200).json({ message: 'OK' });
//   } catch ({ message }) {
//     return res.status(500).json({ message });
//   }
// };
