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
    rating: {
        type: Number,
        default: 0,
        range: [0, 5]
    },
    review: {
        type: String,
        default: null
    },
    reviewResponse:{
        type: String,
        default: null
    }

}, { timestamps: true });

const Review = mongoose.model("review", reviewSchema);
export default Review;