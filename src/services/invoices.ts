import { Document } from 'mongoose';
import Stripe from 'stripe';
import Invoice from '../models/Invoice';

export const createInvoice = async ({
  points,
  price,
  charge,
}: {
  points: number;
  price: number;
  charge: Stripe.Charge;
}): Promise<Document> => {
  try {
    return await new Invoice({
      points,
      amount: price,
      receipt: charge.receipt_url,
    }).save();
  } catch (error) {
    console.log(error);
    throw new Error('Error creating invoice' + error.message);
  }
};
