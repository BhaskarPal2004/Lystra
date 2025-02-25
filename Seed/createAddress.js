import { faker } from "@faker-js/faker";
import Address from "../src/Models/Address.js";

const createAddress= async (n)=>{
    for(let i=0;i<n;i++){
        const address = new Address({
            line1: `${faker.location.buildingNumber()}, ${faker.location.street()}`,
            line2: faker.location.country(),
            state: faker.location.state(),
            city: faker.location.city(),
            landMark: faker.location.county(),
            pinCode: Math.floor(Math.random()*999999),
        })
        address.save();
    }
}
export default createAddress;