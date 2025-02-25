import Listing from "./Listing.js";
import mongoose from "mongoose";
const Product = Listing.discriminator('Product',
    new mongoose.Schema({
        costPrice: {
            type: Number,
            required: true,
            select: false,//will only be shown to seller not buyer
        },
        markedPrice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0
        },
        count: {//Inventory:can't order if count=0
            type: Number,
            required: true,
            default: 0
        }
    })
);

export default Product;