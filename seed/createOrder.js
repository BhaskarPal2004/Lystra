import Ad from "../src/models/adModel.js";
import Buyer from "../src/models/buyerModel.js";
import { faker } from "@faker-js/faker";
import Order from "../src/models/OrderModel.js";
import Payment from "../src/models/paymentModel.js";
import Address from "../src/models/addressModel.js";
const createPayment = async (ad) => {
    const paymentType = ['cod', 'upi', 'card'];
    const status = ['pending', 'paid', 'cancelled', 'refunded'];
    const payment = new Payment({
        adId: ad._id,
        amount: ad.price,
        paymentType: paymentType[Math.floor(Math.random() * 3)],
        status: status[Math.floor(Math.random() * 4)],
    })
    await payment.save();
}
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
const createOrder = async n => {
    const buyers = await Buyer.find({});
    const ads = await Ad.find({});
    const status = ['created', 'confirmed', 'shipped', 'cancelled', 'delivered', 'failure'];
    for (let i = 0; i < n; i++) {
        const buyer = buyers[Math.floor(Math.random() * buyers.length)];
        const ad = ads[Math.floor(Math.random() * ads.length)];
        const order = new Order({
            adId: ad._id,
            buyerId: buyer._id,
            billingAddress: ad.address,
            shippingAddress: await createAddress(),
            status: status[Math.floor(Math.random() * 6)],
            paymentId: await createPayment(ad),
        })
        await order.save();
    }
}
export default createOrder;