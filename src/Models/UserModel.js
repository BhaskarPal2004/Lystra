import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        required: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer'
    }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

export default User;