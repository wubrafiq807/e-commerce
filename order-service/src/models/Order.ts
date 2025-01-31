
import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
    _id?: string | mongoose.Types.ObjectId;
    userId: string | mongoose.Types.ObjectId;
    productId: string | mongoose.Types.ObjectId; // or string if you're using a simple product ID
    quantity: number;
  }
  

const orderSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId},
  userId: { type: mongoose.Schema.Types.ObjectId, required:true},
  productId: { type: mongoose.Schema.Types.ObjectId, required:true},
  quantity: { type: Number, required: true}
});


export default mongoose.model<IOrder>('Order', orderSchema);
