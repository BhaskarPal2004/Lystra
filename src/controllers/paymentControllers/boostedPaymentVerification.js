import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
import crypto from 'crypto';
import Ad from "../../models/adModel.js";
import Payment from "../../models/paymentModel.js";


export const boostedPaymentVerification = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const adId = req.params.adId
        const amount = req.params.amount
        const days = req.params.days

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex')

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            return res.status(BAD_REQUEST_CODE).json({
                success: true,
                message: "Payment is not authenticated"
            })
        }

        const ad = await Ad.findById(adId)

        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + Number(days.trim()));

        ad.boost.isBoosted = true
        ad.boost.expiryDate = expiryDate
        ad.boost.boostOrderId = razorpay_order_id
        ad.boost.price = amount / 100
        await ad.save()

        const payment = await Payment.create({
            adId: adId,
            razorpayOrderId: razorpay_order_id,
            amount: amount / 100,
            paymentType: 'online',
            razorpayPaymentId: razorpay_payment_id,
            razorpayPaymentSignature: razorpay_signature,
            status: 'paid'
        })

        console.log(payment)
        res.redirect(`http://localhost:5173`)


    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
}