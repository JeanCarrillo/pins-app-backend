import User from '../models/User';
import { Document } from 'mongoose';

export const getUser = async (id: string): Promise<Document> => {
  try {
    return await User.findById({ _id: id }).populate('invoices');
  } catch (error) {
    throw new Error('Error getting user');
  }
};

export const getUserWithUsername = async (
  username: string,
): Promise<Document> => await User.findOne({ username });

export const addPinToUser = async (
  id: string,
  pinId: string,
  pointsToRemove: number,
): Promise<Document> => {
  try {
    return await User.findByIdAndUpdate(
      id,
      { $addToSet: { pins: pinId }, $inc: { points: -pointsToRemove } },
      { new: true, useFindAndModify: false },
    );
  } catch (error) {
    throw new Error('Error creating user pin');
  }
};

export const addInvoiceToUser = async (
  id: string,
  invoiceId: string,
  pointsToAdd: number,
): Promise<Document> => {
  try {
    return await User.findByIdAndUpdate(
      id,
      { $inc: { points: pointsToAdd }, $addToSet: { invoices: invoiceId } },
      { new: true, useFindAndModify: false },
    );
  } catch (error) {
    throw new Error('Error creating user invoice');
  }
};
