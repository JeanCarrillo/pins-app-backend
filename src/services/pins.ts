import Pin from '../models/Pin';
import { Document } from 'mongoose';

export const getPins = async ({
  lng,
  lat,
}: {
  lng?: number;
  lat?: number;
}): Promise<Document[]> => {
  try {
    return await Pin.find({
      location: {
        $nearSphere: {
          $maxDistance: 100000,
          $geometry: {
            type: 'Point',
            coordinates: [lng || 4.79, lat || 45.75],
          },
        },
      },
      endDate: { $gte: new Date().toUTCString() },
    });
  } catch (error) {
    throw new Error('Error getting Pins');
  }
};

export const createPin = async ({
  title,
  description,
  lat,
  lng,
  startDate,
  endDate,
  filename,
}: {
  title: string;
  description: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  filename: string;
}): Promise<Document> => {
  try {
    return await new Pin({
      title,
      description,
      location: { type: 'Point', coordinates: [lng, lat] },
      startDate,
      endDate,
      img: {
        publicUrl: '/public/' + filename,
      },
    }).save();
  } catch (error) {
    throw new Error('Error creating Pin');
  }
};
