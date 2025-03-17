import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Order from "../../models/orderModel.js"
import Payment from "../../models/paymentModel.js"

export const paymentFailedUpdate = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId } = req.params

        console.log('params :>> ', razorpayOrderId, razorpayPaymentId);
        const order = await Order.findOne({ razorpayOrderId })

        console.log('order :>> ', order);
        if (!order)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Order not found"
            })

        order.status = 'failure'
        order.paymentStatus = 'failed'
        await order.save()

        const existingPayment = await Payment.findOne({ razorpayOrderId })

        console.log('this is failure', existingPayment)

        const payment = await Payment.create({
            adId: order.adId,
            razorpayOrderId: order.razorpayOrderId,
            amount: order.amount,
            paymentType: 'online',
            razorpayPaymentId: razorpayPaymentId,
            razorpayPaymentSignature: null,
            status: 'failed'
        })
        return res.status(SUCCESS_CODE).json({
            success: false,
            message: "Status updated for failed payment",
            payment
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}