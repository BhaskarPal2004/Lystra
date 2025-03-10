import fs from "fs";
import PDFDocument from "pdfkit";
import { generateFooter } from "./setter.js";

export const createInvoice = (invoice, path) => {
  const doc = new PDFDocument({
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    size: "A4",
    layout: "portrait",
  });

  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("INVOICE", { align: "center" })
    .moveDown();

  doc
    .fontSize(8)
    .text(`Invoice #: ${invoice.invoiceNumber}`, 50, 100)
    .text(`Date: ${new Date().toLocaleDateString()}`, 400, 100);

  const pageWidth = doc.page.width; // Get full page width
  const margin = 50; // Left & right margin
  const maxWidth = pageWidth - margin * 2;

  // Billing and Seller Information
  doc.rect(50, 130, 500, 220).stroke();
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Bill to:", 55, 135)
    .font("Helvetica")
    .text(invoice.buyerName, 55, 155)
    .text(`Address: ${invoice.sippingAddress.line1}`, {
      width: maxWidth / 2,
      align: "left",
    })

    .text(
      `${invoice.sippingAddress.state}, ${invoice.sippingAddress.city},${invoice.sippingAddress.country},${invoice.sippingAddress.pinCode}`
    )
    .text(`Landmark: ${invoice.sippingAddress.landMark}`)
    .moveDown(1)
    .text(`Email: ${invoice.buyerEmail}`)
    .text(`Mobile: ${invoice.buyerPhoneNo}`);

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Seller Info:", 300, 135)
    .font("Helvetica")
    .text(invoice.contact.sellerName, 300, 155)
    .text(
      `Address: ${
        invoice.contact.address ? invoice.contact.address.line1 : ""
      }`,
      {
        width: maxWidth / 2, // Half-page width for address
        align: "left",
      }
    )
    .text(
      `${invoice.contact.address ? invoice.contact.address.state : ""} ${
        invoice.contact.address ? invoice.contact.address.city : ""
      } ${invoice.contact.address ? invoice.contact.address.country : ""} ${
        invoice.contact.address ? invoice.contact.address.pinCode : ""
      }`
    )
    .moveDown(1)
    .text(`Email: ${invoice.sellerEmail}`)
    .text(`Mobile: ${invoice.contact.contactInformation}`)
    .moveDown(3);

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Billing Adress:", 200)
    .font("Helvetica")
    .text(`Address: ${invoice.billingAddress.line1}`, {
      width: maxWidth / 2,
      align: "left",
    })

    .text(
      `${invoice.billingAddress.state}, ${invoice.billingAddress.city},${invoice.billingAddress.country},${invoice.billingAddress.pinCode}`
    );

  // Order Details Table
  doc
    .fontSize(15)
    .text(`Payment Mode:  ${invoice.paymentType}`, 50, 450)
    .moveDown(2);

  const startY = 500;
  const colWidths = [110, 100, 100, 100, 100]; // Updated column widths
  let xPos = 50;

  doc.fontSize(10).font("Helvetica-Bold");

  //Add table headers (with "Payment Status")
  [
    "Ad Name",
    "Category",
    "Subcategory",
    "Amount Paid(INR)",
    "Payment Status",
  ].forEach((text, i) => {
    doc.text(text, xPos, startY, { width: colWidths[i], align: "left" });
    xPos += colWidths[i];
  });

  // Draw horizontal line under headers
  doc
    .moveTo(50, startY + 15)
    .lineTo(550, startY + 15)
    .stroke();

  //Insert Order Item
  let yPos = startY + 25;
  doc.fontSize(10).font("Helvetica");
  xPos = 50;

  [
    invoice.adName,
    invoice.adCategory,
    invoice.adSubcategory,
    invoice.amountPaid,
    invoice.paymentStatus, // Payment status logic
  ].forEach((text, i) => {
    doc.text(text.toString(), xPos, yPos, {
      width: colWidths[i],
      align: "left",
    });
    xPos += colWidths[i];
  });

  // Total Section
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(`Total Amount Paid: INR ${invoice.amountPaid}`, 350, yPos + 40);

  generateFooter(doc, invoice);
  doc.end();
  doc.pipe(fs.createWriteStream(path));
};