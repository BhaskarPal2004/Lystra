import { createInvoice } from './createInvoice.js'
import Order from '../../models/orderModel.js';
import Buyer from '../../models/buyerModel.js';
import Ad from '../../models/adModel.js';
import Seller from '../../models/sellerModel.js';
import Address from '../../models/addressModel.js';
import Payment from '../../models/paymentModel.js';


export const invoiceCreateFunction = async (orderId) => {
    const invoiceId = `Invoice_${orderId}`;

    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    const [buyer, payment, ad] = await Promise.all([
        Buyer.findById(order.buyerId),
        Payment.findById(order.paymentId),
        Ad.findById(order.adId),
    ]);

    if (!buyer) throw new Error("Buyer not found");
    if (!payment) throw new Error("Payment details not found");
    if (!ad) throw new Error("Ad not found");

    const seller = await Seller.findById(ad.sellerId);
    if (!seller) throw new Error("Seller not found");

    const [sellerAddress, buyerAddress, adAddress] = await Promise.all([
        Address.findById(seller.address),
        Address.findById(buyer.address),
        Address.findById(ad.address),
    ]);

    // if (!sellerAddress) throw new Error("Seller address not found");
    // if (!buyerAddress) throw new Error("Buyer address not found");
    if (!adAddress) throw new Error("Ad billing address not found");

    const invoice = {
        buyerName: buyer.name,
        buyerPhoneNo: buyer.phoneNumber,
        billingAddress: adAddress,
        sippingAddress: buyerAddress,
        buyerEmail: buyer.email,
        sellerEmail: seller.email,
        contact: {
            sellerName: seller.name,
            address: sellerAddress,
            contactInformation: seller.phoneNumber,
        },
        paymentId: payment._id,
        paymentType: payment.paymentType,
        paymentStatus: payment.status,
        amountPaid: payment.amount,
        adName: ad.name,
        adCategory: ad.category,
        adSubcategory: ad.subCategory,
        invoiceNumber: invoiceId,

    };

    const fileName = `${invoiceId}.pdf`
    console.log("Invoice data:", JSON.stringify(invoice, null, 2));
    createInvoice(invoice, `./invoices/${fileName}`)
    return fileName;
}


