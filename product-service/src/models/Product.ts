import mongoose from 'mongoose';

export interface IProduct extends Document {
  _id?: string | mongoose.Types.ObjectId
  name: string;
  description: string;
  price: number;
}

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required:true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }
  });

export default mongoose.model<IProduct>('Product', productSchema);