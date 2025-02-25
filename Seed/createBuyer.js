import { Buyer } from "../src/Models/UserModel.js";
import { faker } from '@faker-js/faker';

const createBuyer = async (n) => {
    for (let i = 0; i < n; i++) {
        const buyer = new Buyer({
                name: faker.internet.username(),
                email: `buyer${i}@gmail.com`,
                password: `buyer${i}`,
                phoneNumber: 123450+i,
                isVerified: true,
                
            })
        await buyer.save();
    }
}

export default createBuyer;