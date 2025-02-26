import Order from "../src/models/OrderModel.js";
import Review from "../src/models/reviewModel.js";
import { faker } from "@faker-js/faker";

const createReview=async n=>{
    const orders=await Order.find({});
    for(let i=0;i<n;i++){
        const order=orders[Math.floor(Math.random()*orders.length)];
        const review= new Review({
            buyerId: order.buyerId,
            adId: order.adId,
            rating: Math.ceil(Math.random()*5),
            review: faker.lorem.lines(3)
        })
        await review.save();
    }
}
export default createReview;