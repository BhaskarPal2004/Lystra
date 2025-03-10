export function generateFooter(doc, invoice) {
  doc
    .fontSize(10)
    .text("Make all Checks payable to Lystra & co. ", 50, 700, {
      align: "center",
      width: 500,
    });
  doc
    .fontSize(10)
    .text(
      `If you have any questions concerning this invoice,contact: ${invoice.contact.sellerName} at ${invoice.contact.contactInformation}.`,
      { align: "center", width: 500 }
    )
    .moveDown(1);
  doc
    .fontSize(15)
    .text("Thank You for your Business", { align: "center", width: 500 });
}