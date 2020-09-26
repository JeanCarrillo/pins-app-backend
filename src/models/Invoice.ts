import { Schema, model } from 'mongoose';

const invoiceSchema = new Schema(
  {
    points: { type: Number, required: true },
    amount: { type: Number, required: true },
    receipt: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  },
);

invoiceSchema.set('timestamps', true);

export default model('Invoice', invoiceSchema);
