import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    adId: {
        type: mongoose.Types.ObjectId,
        ref: 'ad',
        required: true
    },
    performance: {
        views: {
            type: Number,
            default: 0
        },
        clicks: {
            type: Number,
            default: 0
        },
    },
    CTR: {
        type: Number,
        default: 0
    },
    conversionRate: {
        type: Number,
        default: 0
    }
})

const Analytics = mongoose.model('analytics', analyticsSchema)
export default Analytics