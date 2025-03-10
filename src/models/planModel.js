import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    planName: {
        type: String,
        enum: ['premium', 'ultimate'],
        required: true
    },
    planAmount: {
        type: Number,
        enum: [500, 1000],
        required: true
    },
    adCount: {
        type: Number,
        enum: [5, 10]
    },
})

const Plan = mongoose.model("plan", planSchema);
export default Plan