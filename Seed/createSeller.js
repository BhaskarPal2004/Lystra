import User from "../src/Models/UserModel.js";
import { faker } from '@faker-js/faker';

const createSeller = async (n) => {
    for (let i = 0; i < n; i++) {
        const seller = new User({
                name: faker.internet.username(),
                email: `seller${i}@gmail.com`,
                password: `seller${i}`,
                phoneNumber: 123450+i,
                isVerified: true,
                role:'buyer'
            })
        await seller.save()
    }
}

export default createSeller;