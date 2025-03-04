import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    coordinates: {
        type: [Number, Number],
        index: '2d'
    },
    line1: {
        type: String,
        required: true
    },
    line2: {
        type: String,
        default: null
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    landMark: {
        type: String,
        required: false
    },
    pinCode: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const Address = mongoose.model("address", addressSchema);
export default Address;