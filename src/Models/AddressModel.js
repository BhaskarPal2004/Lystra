import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    line1: {
        type: String,
        required: true
    },
    line2: {
        type: String
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
})

const Address = mongoose.model("Address", addressSchema);
export default Address;