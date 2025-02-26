import Buyer from "../src/Models/buyerModel.js";
import bcrypt from "bcryptjs";
import { faker } from '@faker-js/faker';
const createBuyer = async n => {
    for(let i=0;i<n;i++){
        const buyer= new Buyer({
            name: "buyer"+i,
            email: "buyer"+i+"@itobuz.com",
            password: bcrypt.hashSync("Abc@123"+i,10),
            isVerified: true
        });
        await buyer.save();
    }
}
export default createBuyer;