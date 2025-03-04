import { faker } from "@faker-js/faker";

import Ad from "../src/models/adModel.js";
import Order from "../src/models/OrderModel.js";
import Review from "../src/models/reviewModel.js";


const createReview = async n => {
    const orders = await Order.find({});
    for (let i = 0; i < n; i++) {
        const order = orders[Math.floor(Math.random() * orders.length)];
        const ad= await Ad.findById(order.adId)
        const review = new Review({
            buyerId: order.buyerId,
            sellerId: ad.sellerId ,
            rating: Math.ceil(Math.random() * 5),
            review: faker.lorem.lines(3),
            reviewResponse: faker.lorem.lines(3)
        })
        await review.save();
    }
}

export default createReview;