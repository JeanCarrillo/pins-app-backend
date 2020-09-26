import { Response } from 'express';
import { stripeService, usersService, invoicesService } from '../services';
import { RequestWithUserId } from '../types/interfaces';

interface CardToken {
  id: string;
}

export const checkout = async (
  req: RequestWithUserId,
  res: Response,
): Promise<Response> => {
  try {
    const {
      cardToken,
      points,
    }: { cardToken: CardToken; points: number } = req.body;
    const { userId } = req;
    if (typeof points !== 'number' || points < 1 || points > 24)
      return res.status(403).json({ message: 'Invalid order' });

    const price = points * 100; // 1 point = 1 euro = 100 cents

    // const customer = await stripe.customers.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   source: req.body.stripeToken,
    // });

    const charge = await stripeService.checkout({
      cardTokenId: cardToken.id,
      points,
      price,
    });

    const invoice = await invoicesService.createInvoice({
      charge,
      points,
      price,
    });

    await usersService.addInvoiceToUser(userId, invoice._id, points);

    return res.status(201).json({
      data: invoice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error during checkout' });
  }
};
