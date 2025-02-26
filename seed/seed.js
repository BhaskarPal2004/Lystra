import mongoose from "mongoose";
import "dotenv/config";
import Buyer from "../src/Models/buyerModel.js";
import createBuyer from "./createBuyer.js";
const main = async () => {
        await mongoose.connect(process.env.MONGO_URI);
        await Buyer.deleteMany({});
        await createBuyer(5);
        await mongoose.disconnect();
        console.log('done :>> ');
}

main();