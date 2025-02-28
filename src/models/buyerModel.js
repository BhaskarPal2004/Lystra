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
        require: true,
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
    blockedBy: [{
        type: mongoose.Schema.ObjectId,
        ref: 'seller'
    }]

}, { timestamps: true });

const Buyer = mongoose.model("buyer", buyerSchema);
export default Buyer;