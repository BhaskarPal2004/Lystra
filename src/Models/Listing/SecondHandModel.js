import Listing from "./Listing.js";
import mongoose from "mongoose";
const SecondHand = Listing.discriminator('SecondHand',
    new mongoose.Schema({
        price: {
            type: Number,
            required: true,
        },
        boughtOn: {
            type: Date,
            required: false,
        },
        condition: {
            type: String,
            enum: ['NEW','OLD', 'MINT', 'REFURBISHED',null],//will add more categories
            default: null,
            required: true,
        },
        listedOn: {
            type: Date,
            required: true,
            default: Date.now()
        }
    })
);

export default SecondHand;