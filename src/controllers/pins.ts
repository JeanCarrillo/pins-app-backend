import { pinsService, usersService } from '../services';
import { Response } from 'express';
import { RequestWithUserId } from '../types/interfaces';

export const getPins = async (
  req: RequestWithUserId,
  res: Response,
): Promise<Response> => {
  try {
    const { coords } = req.query;
    if (coords && typeof coords === 'string') {
      const [lng, lat] = coords.split(',');
      const pins = await pinsService.getPins({
        lng: Number(lng),
        lat: Number(lat),
      });
      return res.json({ data: pins });
    }
    const pins = await pinsService.getPins({ lng: null, lat: null });
    return res.json({ data: pins });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting pins' });
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
    const userPoints = user.get('points');
    if (userPoints < pointsToRemove || userPoints - pointsToRemove < 0)
      return res.status(403).json({ message: 'Not enough points' });

    const sDate = new Date(startDate).getTime();
    const endDate = sDate + Math.floor(duration * 1000 * 60 * 60);

    const createdPin = await pinsService.createPin({
      title,
      description,
      lat,
      lng,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      filename,
    });

    await usersService.addPinToUser(userId, createdPin._id, pointsToRemove);

    return res.status(201).json({
      data: createdPin,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating pin' });
  }
};
