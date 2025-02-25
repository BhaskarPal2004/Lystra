import { Seller } from "../src/Models/UserModel.js";
import { faker } from '@faker-js/faker';

const createSeller = async (n) => {
    for (let i = 0; i < n; i++) {
        const seller = new Seller({
                name: faker.internet.username(),
                email: `seller${i}@gmail.com`,
                password: `seller${i}`,
                phoneNumber: 123450+i,
                isVerified: true,
                registrationNumber: 12340+i,
            })
        await seller.save()
    }
}

export default createSeller;