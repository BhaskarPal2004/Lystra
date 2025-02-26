import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'buyer',
        required: true
    },
    adId: {
        type: mongoose.Schema.ObjectId,
        ref: 'ad',
    },
    rating: {
        type: Number,
        default: 0,
        range: [0, 5]
    },
    review: {
        type: String,
        default: null
    }
});

const Review = mongoose.model("review",reviewSchema);
export default Review;