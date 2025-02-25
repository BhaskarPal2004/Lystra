import Listing from "./ListingModel.js";
import mongoose from "mongoose";
const Service = Listing.discriminator('Service',
    new mongoose.Schema({
        rate: {//per hr or per day
            type: String,
        }
    })
);

export default Service;