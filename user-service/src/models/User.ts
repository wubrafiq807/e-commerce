import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id?:mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
