import { Schema, model } from 'mongoose';

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const pinSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: pointSchema,
    required: true,
    createIndexes: '2dsphere',
  },
  img: {
    publicUrl: String,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

pinSchema.set('timestamps', true);

export default model('Pin', pinSchema);
