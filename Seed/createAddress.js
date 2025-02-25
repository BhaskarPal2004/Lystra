import { faker } from "@faker-js/faker";
import Address from "../src/Models/Address.js";

const createAddress= async (n)=>{
    for(let i=0;i<n;i++){
        const address = new Address({
            line1: `${faker.location.buildingNumber()}, ${faker.location.street()}`,
            line2: faker.location.country(),
            city: faker.location.city(),
            pinCode: Math.floor(Math.random()*999999),
        })
        address.save();
    }
}
export default createAddress;