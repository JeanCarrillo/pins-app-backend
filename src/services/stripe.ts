import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const checkout = async ({
  cardTokenId,
  points,
  price,
}: {
  cardTokenId: string;
  points: number;
  price: number;
}): Promise<Stripe.Response<Stripe.Charge>> => {
  try {
    // const customer = await stripe.customers.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   source: req.body.stripeToken,
    // });

    return await stripe.charges.create({
      amount: price,
      currency: 'eur',
      source: cardTokenId,
      description: `Payment for PinsApp : ${points} points`,
      receipt_email: 'some@mail.com',
    });
  } catch (error) {
    throw new Error('Error during checkout' + error.message);
  }
};
