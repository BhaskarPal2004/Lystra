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
    address: [{
        type: mongoose.Schema.ObjectId,
        ref: 'address',
        default: null
    }],
    interests: [{
        type: String
    }],
    favoriteAds: [{
        type: mongoose.Schema.ObjectId,
        ref: 'ad'
    }],
    blockedList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blockUser',
        required: true,
    }],
    reports: [{
        type: mongoose.Schema.ObjectId,
        ref: 'reportUser'
    }]

}, { timestamps: true });

const Buyer = mongoose.model("buyer", buyerSchema);
export default Buyer;