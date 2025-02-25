import mongoose from "mongoose";
import "dotenv/config";
import createBuyer from "./createBuyer.js";
import createSeller from "./createSeller.js";
import createProduct from "./createProduct.js";
import createAddress from "./createAddress.js";
import { User } from "../src/Models/UserModel.js";
import Address from "../src/Models/AddressModel.js";
import Listing from "../src/Models/Listing/ListingModel.js";
const main = async () => {
        await mongoose.connect(process.env.MONGO_URI);

        await User.deleteMany({});
        await Address.deleteMany({});
        await Listing.deleteMany({});

        await createBuyer(10);
        await createSeller(10);
        await createAddress(10);

        await createProduct(20);
        await mongoose.disconnect();
        console.log('done :>> ');
}

main();