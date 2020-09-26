import Pin from '../models/Pin';
import { Document } from 'mongoose';

// export const getPin = async (id: string): Promise<Document> => {
//   try {
//     return await Pin.findById(id);
//   } catch (error) {
//     throw new Error('Error getting pin');
//   }
// };

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
    console.log(error);
    throw new Error('Error creating Pin');
  }
};

// export const updatePin = async (): Promise<null> => {
//   try {
//     return null;
//   } catch (error) {
//     throw new Error('Error updating Pin');
//   }
// };

// export const deletePin = async (
//   id: string,
// ): Promise<{ deletedCount?: number }> => {
//   try {
//     return Pin.deleteOne({ _id: id });
//   } catch (error) {
//     throw new Error('Error deleting Pin');
//   }
// };
