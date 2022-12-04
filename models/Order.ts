import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema({
    name: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;