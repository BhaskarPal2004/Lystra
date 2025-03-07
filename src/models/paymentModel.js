import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    adId: {
        type: mongoose.Schema.ObjectId,
        ref: 'ad'
    },
    razorpayPaymentId: {
        type: String,
        default: null
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentSignature: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['cod', 'online'],
        default: 'cod'
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'refunded'],
        default: 'pending'
    }

}, { timestamps: true })

const Payment = mongoose.model("payment", paymentSchema);
export default Payment;