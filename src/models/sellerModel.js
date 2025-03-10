import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    phoneNumber: {
        type: String,
        unique: true,
        default: null
    },
    profilePicture: {
        type: String,
        default: ""
    },
    address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address',
        default: null
    },
    ads: [{
        type: mongoose.Schema.ObjectId,
        ref: 'ad'
    }],
    orders: [{
        type: mongoose.Schema.ObjectId,
        ref: 'order'
    }],
    payments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'payments'
    }],
    averageReview: {
        averageRating: {
            type: Number,
            default: null
        },
        topReviews: [{
            type: String,
            default: null
        }]
    },
    blockedList: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    reports: [{
        reporterId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        message: {
            type: String,
            default: null
        }
    }],
    isSubscribed: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Seller = mongoose.model("seller", sellerSchema);
export default Seller;