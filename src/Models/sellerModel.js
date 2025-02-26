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
        type: Number,
    },
    profilePicture: {
        type: String,
        default: null
    },
    ads: [{
        type: mongoose.Schema.ObjectId,
        ref: 'ad'
    }],
    reviews: [{
        type: mongoose.Schema.ObjectId,
        ref: 'review'
    }]
}, { timestamps: true });

const Seller = mongoose.model("seller", sellerSchema);

export default Seller;