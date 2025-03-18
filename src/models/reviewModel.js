import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyer',
        required: true
    },
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ad',
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true
    },
    productRating: {
        type: Number,
        default: 0,
        range: [0, 5]
    },
    sellerRating: {
        type: Number,
        default: 0,
        range: [0, 5]
    },
    feedbackTitle: {
        type: String,
        default: null,
    },
    feedbackComment:{
        type: String,
        default: null,
    }

}, { timestamps: true });

const Review = mongoose.model("review", reviewSchema);
export default Review;