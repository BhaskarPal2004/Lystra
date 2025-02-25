import mongoose from "mongoose";

const baseOption = {
    discriminatorKey: 'type',
    collection: 'Listing'

};
const details = new mongoose.Schema({key:String, value: String});
const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true,
        default: false
    },
    category: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    keyWords: [{
        type: String,
        required: true
    }],
    details:[details],
    images: [{
        type: String,
    }],
    address: [{type:mongoose.Schema.Types.ObjectId, ref: "addresses"}]
}, baseOption);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;