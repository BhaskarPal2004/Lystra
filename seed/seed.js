import mongoose from "mongoose";
import "dotenv/config";
import Buyer from "../src/models/buyerModel.js";
import Seller from "../src/models/sellerModel.js";
import Order from "../src/models/OrderModel.js";
import Ad from "../src/models/adModel.js";
import createBuyer from "./createBuyer.js";
import createSeller from "./createSeller.js";
import createAd from "./createAd.js";
import createOrder from "./createOrder.js";
import Address from "../src/models/addressModel.js";
import Payment from "../src/models/paymentModel.js";
const main = async () => {
        await mongoose.connect(process.env.MONGO_URI);
        await Address.deleteMany({});
        await Payment.deleteMany({});
        await Buyer.deleteMany({});
        await Seller.deleteMany({});
        await Ad.deleteMany({});
        await Order.deleteMany({});
                
        await createBuyer(5);
        await createSeller(5);
        await createAd(10);
        await createOrder(10);

        await mongoose.disconnect();
        console.log('done :>> ');
}

main();