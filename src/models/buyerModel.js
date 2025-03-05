import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {//already hashed
        type: String,
        required: true,
        select: false
    },
    isVerified: {//email verification
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
    interests: [{
        type: String
    }],
    savedAds: [{
        type: mongoose.Schema.ObjectId,
        ref: 'ad'
    }],
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment"
    }],
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
    }]
}, { timestamps: true });

const Buyer = mongoose.model("buyer", buyerSchema);
export default Buyer;