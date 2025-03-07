import { createInvoice } from './createInvoice.js'
import Order from '../../models/orderModel.js';
import Buyer from '../../models/buyerModel.js';
import Ad from '../../models/adModel.js';
import Seller from '../../models/sellerModel.js';
import Address from '../../models/addressModel.js';
import Payment from '../../models/paymentModel.js';


export const invoiceCreateFunction = async(orderId) => {

    const invoiceId =`Invoice_${orderId}`;
    const order = await Order.findById(orderId);
    const buyer = await Buyer.findById(order.buyerId);
    const payment = await Payment.findById(order.paymentId);
    console.log(payment);
    const ad = await Ad.findById(order.adId);
    const seller = await Seller.findById(ad.sellerId);

    const sellerAddress = await Address.findById(seller.address);
    const buyerAddress = await Address.findById(buyer.address);
    const adAddress = await Address.findById(ad.address);


    const invoice = {
        buyerName :buyer.name,
        buyerPhoneNo:buyer.phoneNumber,
        billingAddress :adAddress,
        sippingAddress:buyerAddress,
        buyerEmail:buyer.email,
        sellerEmail:seller.email,
        contact :{
            sellerName:seller.name,
            address:sellerAddress,
            contactInformation:seller.phoneNumber,
        },
        paymentId:payment._id,
        paymentType:payment.paymentType,
        amountPaid:payment.amount,
        adName:ad.name,
        adCategory:ad.category,
        adSubcategory:ad.subCategory,
        invoiceNumber:invoiceId,

    };

    createInvoice(invoice, `./invoices/${invoiceId}.pdf`)
}


   