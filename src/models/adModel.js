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
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory'
    },
    description: {
        type: String,
        required: true
    },
    details: {
        type: Object
    },
    files: [{
        fileUrl: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            required: true
        }
    }],
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    analytics: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'analytics'
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
    paymentMode: {
        type: String,
        enum: ['cod', 'online']
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }]

}, { timestamps: true });

const Ad = mongoose.model("ad", adSchema);
export default Ad;
