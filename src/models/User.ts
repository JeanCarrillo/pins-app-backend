import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    username: { type: String, required: true, createIndexes: { unique: true } },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    pins: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pin',
      },
    ],
    invoices: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.set('password', await bcrypt.hash(this.get('password'), salt));
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function (data: string) {
  if (!data) return false;
  return await bcrypt.compare(data, this.password);
};

export default model('User', userSchema);
