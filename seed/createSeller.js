import Seller from "../src/Models/sellerModel.js";
import Address from "../src/models/addressModel.js";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
const createAddress = async () => {
    const location=faker.location;
    const address = new Address({
        line1: `${location.buildingNumber()}, ${location.street()}`,
        line2: location.streetAddress(),
        state: location.state(),
        city: location.city(),
        country: location.country(),
        pinCode:Math.floor(Math.random()*999999)
    })
    await address.save();
    return address._id;
}
const createSeller = async n => {
    for (let i = 0; i < n; i++) {
        const seller = new Seller({
            name: "seller" + i,
            email: "seller" + i + "@itobuz.com",
            password: bcrypt.hashSync("Abc@123" + i, 10),
            isVerified: true,
            address: await createAddress()
        });
        await seller.save();
    }
}
export default createSeller;
