import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['cod', 'upi', 'card'],
        default: 'cod'
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        default: 'pending'
    }
})

const Payment = mongoose.model("Order", paymentSchema);
export default Payment;