import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ad",
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buyer",
        required: true
    },
    billingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true
    },
    status: {
        type: String,
        enum: ['created', 'confirmed', 'shipped', 'cancelled', 'delivered', 'failure'],
        default: 'created'
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment',
        default: null
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'refunded'],
        default: 'pending'
    },
    paymentType: {
        type: String,
        enum: ['cod', 'online'],
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model("order", orderSchema);
export default Order;