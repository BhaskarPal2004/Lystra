import bcrypt from "bcryptjs";

import Buyer from "../src/models/buyerModel.js";


const createBuyer = async n => {
    for (let i = 0; i < n; i++) {
        const buyer = new Buyer({
            name: "buyer" + i,
            email: "buyer" + i + "@itobuz.com",
            password: bcrypt.hashSync("Abc@123" + i, 10),
            phoneNumber: 1234567890+i,
            isVerified: true
        });
        await buyer.save();
    }
}

export default createBuyer;