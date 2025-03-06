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
    category: {
        type: String,
        enum: ['electronics', 'vehicles', 'real estate', 'home and furniture', 'jobs and services', 'fashion and beauty'],
        required: true
    },
    subCategory: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    details: {
        type: Object,
        required: true
    },
    files: [{
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
        required: true
    },
    expiryDate:{
        type: Date,
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
    condition: {
        type: String,
        required: true,
        enum: ["new", "used", "refurbished"]

    },
    reports: [{
        reporterId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        message: {
            type: String,
            default: null
        },
        isFake: {
            type: Boolean,
            default: false
        },
        isFraudulent: {
            type: Boolean,
            default: false
        }
    }],
    orders: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }]
}, { timestamps: true });

const Ad = mongoose.model("ad", adSchema);
export default Ad;
