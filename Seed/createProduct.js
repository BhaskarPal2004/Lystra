import Address from "../src/Models/AddressModel.js";
import Product from "../src/Models/Listing/ProductModel.js";
import { Seller } from "../src/Models/UserModel.js";
import { faker } from '@faker-js/faker';

const createProduct = async (n) => {
    const sellers = await Seller.find({});
    const address = await Address.find({});
    for (let i = 0; i < n; i++) {
        const product = new Product({
            name: faker.commerce.productName(),
            sellerId: sellers[Math.floor(Math.random() * sellers.length)].id,
            isFeatured: false,
            category: [faker.commerce.department(), faker.commerce.department()],
            description: faker.commerce.productDescription(),
            keyWords: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
            details: [{
                key: "brand",
                value: "brandjkh"
            },
            {
                key: "dimesion",
                value: "3x8x9"
            }
            ],
            address: [address[Math.floor(Math.random()* address.length)].id,address[Math.floor(Math.random()* address.length)].id],
            costPrice: Math.ceil(Math.random() * 5000) + 20,
            markedPrice: Math.ceil(Math.random() * 5000) + 20,
            discount: Math.floor(Math.random() * 99),
            count: Math.floor(Math.random() * 1000)
        })
        await product.save();
    }
}

export default createProduct;