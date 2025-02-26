import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ad"
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buyer"
    },
    billingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    status: {
        type: String,
        enum: ['created', 'confirmed', 'shipped', 'cancelled', 'delivered', 'failure'],
        default: 'created'
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Payment'
    }
})

const Order = mongoose.model("Order", orderSchema);
export default Order;