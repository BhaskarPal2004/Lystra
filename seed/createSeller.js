import Seller from "../src/Models/sellerModel.js";
import bcrypt from "bcryptjs";
const createSeller = async n => {
    for(let i=0;i<n;i++){
        const seller= new Seller({
            name: "seller"+i,
            email: "seller"+i+"@itobuz.com",
            password: bcrypt.hashSync("Abc@123"+i,10),
            isVerified: true
        });
        await seller.save();
    }
}
export default createSeller;