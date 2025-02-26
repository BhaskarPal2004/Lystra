import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true,
        default: false
    },
    listingType: {
        type: String,
        enum: ['service', 'product', 'secondHandProduct', 'others'],
        required: true
    },
    category: [{
        type: String,
        enum: ['electronics', 'vehicles', 'real estate', 'home and furniture', 'jobs and services', 'fashion and beauty'],
        required: true
    }],
    subCategory: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    details: [{
        type: Object,
        required: true
    }],
    images: [{
        type: String,
        default: null
    }],
    price: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        default: null
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
    }
}, { timestamps: true });

const Ad = mongoose.model("Ad", adSchema);
export default Ad;