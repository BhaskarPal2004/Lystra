import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    fromAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    toAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
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