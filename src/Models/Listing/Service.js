import Listing from "./Listing.js";

const Service = Listing.discriminator('Service',
    new mongoose.Schema({
        rate: {//per hr or per day
            type: String,
        }
    })
);

export default Service;