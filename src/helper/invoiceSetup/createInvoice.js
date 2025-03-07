

import fs from 'fs';
import PDFDocument from 'pdfkit';
import { generateFooter, generateHeader } from './setter.js';

export const createInvoice = (invoice, path) => {
    const doc = new PDFDocument({
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        size: 'A4',
        layout: 'portrait',
    });

    // generateHeader(doc);

    doc.fontSize(20).font('Helvetica-Bold').text('INVOICE', { align: 'center' }).moveDown();

    // Invoice Info
    doc.fontSize(8).text(`Invoice #: ${invoice.invoiceNumber}`, 50, 100)
        .text(`Date: ${new Date().toLocaleDateString()}`, 400, 100);

    // Billing and Seller Information
    doc.rect(50, 130, 500, 200).stroke();
    doc.fontSize(10).font('Helvetica-Bold').text('Bill to:', 55, 135).font('Helvetica')
        .text(invoice.buyerName, 55, 155)
        .text(`Address: ${invoice.billingAddress.line1}`)
        .text(`${invoice.billingAddress.state}, ${invoice.billingAddress.city},${invoice.billingAddress.country},${invoice.billingAddress.pinCode}`)
        .text(`Landmark: ${invoice.billingAddress.landMark}`)
        .text(`Email: ${invoice.buyerEmail}`, 55, 225)
        .text(`Mobile: ${invoice.buyerPhoneNo}`, 55, 240);


    doc.fontSize(10).font('Helvetica-Bold').text('Seller Info:', 300, 135).font('Helvetica')
        .text(invoice.contact.sellerName, 300, 155)
        .text(`Address: ${invoice.contact.address? invoice.contact.address.line1 : ''}`, 300, 170)
        .text(`${invoice.contact.address?invoice.contact.address.state:''} ${invoice.contact.address?invoice.contact.address.city:''} ${invoice.contact.address?invoice.contact.address.country:''} ${invoice.contact.address?invoice.contact.address.pinCode:''}`, 300, 185)
        .text(`Email: ${invoice.sellerEmail}`, 300, 225)
        .text(`Mobile: ${invoice.contact.contactInformation}`, 300, 240)

    doc.fontSize(10).font('Helvetica-Bold').text('Seller Info:', 300, 260).font('Helvetica')
        .text(invoice.contact.sellerName, 300, 155)
        .text(`Address: ${invoice.contact.address? invoice.contact.address.line1 : ''}`, 300, 170)
        .text(`${invoice.contact.address?invoice.contact.address.state:''} ${invoice.contact.address?invoice.contact.address.city:''} ${invoice.contact.address?invoice.contact.address.country:''} ${invoice.contact.address?invoice.contact.address.pinCode:''}`, 300, 185)
        .text(`Email: ${invoice.sellerEmail}`, 300, 225)
        .text(`Mobile: ${invoice.contact.contactInformation}`, 300, 240)

    // Order Details Table
    const startY = 400;
    const colWidths = [200, 150, 100, 100];
    let xPos = 50;

    doc.fontSize(12).font('Helvetica-Bold');
    ['Ad Name', 'Category', 'Subcategory', 'Amount Paid'].forEach((text, i) => {
        doc.text(text, xPos, startY, { width: colWidths[i], align: 'left' });
        xPos += colWidths[i];
    });
    doc.moveTo(50, startY + 15).lineTo(550, startY + 15).stroke();

    // Single Order Item
    let yPos = startY + 25;
    doc.fontSize(10).font('Helvetica');
    xPos = 50;
    [invoice.adName, invoice.adCategory, invoice.adSubcategory, invoice.amountPaid].forEach((text, i) => {
        doc.text(text.toString(), xPos, yPos, { width: colWidths[i], align: 'left' });
        xPos += colWidths[i];
    });

    // Total Section
    doc.fontSize(12).font('Helvetica-Bold')
        .text(`Total Amount Paid: ${invoice.amountPaid}`, 400, yPos + 40);

    generateFooter(doc);
    doc.end();
    doc.pipe(fs.createWriteStream(path));
};
