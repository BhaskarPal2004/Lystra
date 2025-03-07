import fs from 'fs'
import PDFDocument from 'pdfkit'
import { generateFooter, generateHeader } from './setter.js';
import formatDate from "date-fns/format"
import formatCurrency from 'format-currency';


// createInvoice.js
export const createInvoice = (invoice, path) => {
    let doc = new PDFDocument({
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        size: 'A4',
        layout: 'portrait',
    });

    generateHeader(doc);

    // buyerName :buyer.name,
// buyerPhoneNo:buyer.phoneNumber,
// billingAddress :adAddress,
// sippingAddress:buyerAddress,
// contact :{
//     sellerName:seller.name,
//     address:sellerAddress,
//     contactInformation:seller.phoneNumber,
// },
// paymentId:payment._id,
// paymentType:payment.paymentType,
// amountPaid:payment.amount,
// adName:ad.name,
// adCategory:ad.category,
// adSubcategory:ad.subCategory,



    doc.fontSize(
        10,
    ).text(
        // `hi my name is:${invoice.shipping.name},i am from Baradoggal`,
        `Hi ${buyerName}`,
        { align: 'center', width: 500 },
    );

    doc.fontSize(
        10,
    ).text(
        ` bnkuin  8gy gihvhgbhkjkll;m j`,
        { align: 'center', width: 500 },
    );

    
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

// export function generateCustomerInformation(doc, invoice) {
//     const customerInformationTop = 200;

//     doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160);

//     generateHeader(doc, 185);

//     doc.fontSize(10)
//         .text('Invoice Number:', 50, customerInformationTop)
//         .font('Helvetica-Bold')
//         .text(invoice.invoice_nr, 150, customerInformationTop)
//         .font('Helvetica')
//         .text('Invoice Date:', 50, customerInformationTop + 15)
//         .text(formatDate(new Date()), 150, customerInformationTop + 15)
//         .text('Balance Due:', 50, customerInformationTop + 30)
//         .text(
//             formatCurrency(invoice.subtotal - invoice.paid),
//             150,
//             customerInformationTop + 30,
//         )
//         .font('Helvetica-Bold')
//         .text(invoice.shipping.name, 300, customerInformationTop)
//         .font('Helvetica')
//         .text(invoice.shipping.address, 300, customerInformationTop + 15)
//         .text(
//             `${invoice.shipping.city}, ${invoice.shipping.state}, ${invoice.shipping.country}`,
//             300,
//             customerInformationTop + 30,
//         )
//         .moveDown();

//     generateHeader(doc, 252);
// }