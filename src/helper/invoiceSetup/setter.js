export function generateHeader(doc) {
    doc.fillColor('#444444')
        .fontSize(20)
        .text('LYSTRA', 110, 57)
        .fontSize(10)
        .text('123 Main Street', 200, 65, { align: 'right' })
        .text('New York, NY, 10025', 200, 80, { align: 'right' })
        .moveDown();
}

export function generateFooter(doc) {
    doc.fontSize(
        10,
    ).text(
        `Payment is due within 15 days. Thank you for your business.${doc}`,
        50,
        775,
        { align: 'center', width: 500 },
    );
}