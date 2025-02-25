import mongoose from "mongoose";
const baseOption = {
    discriminatorKey: 'role',
    collection: 'user'

};
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
    }
}, baseOption)
const User = mongoose.model("user", userSchema);


const Seller = User.discriminator('seller', new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    }
}));
const Buyer = User.discriminator('Buyer', new mongoose.Schema());
export { Seller, Buyer, User };