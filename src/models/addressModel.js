import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true 
        },
        coordinates: {
            type: [Number],
            required: true ,
            index:"2dsphere"
        }
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
        default: ""
    },
    pinCode: {
        type: Number,
        required: true
    }

}, { timestamps: true })


const Address = mongoose.model("address", addressSchema);
Address.createIndexes({ location: '2dsphere' });
export default Address;
