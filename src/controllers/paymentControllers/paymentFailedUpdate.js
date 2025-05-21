import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Order from "../../models/orderModel.js"
import Payment from "../../models/paymentModel.js"

export const paymentFailedUpdate = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId } = req.params

        const order = await Order.findOne({ razorpayOrderId })


        if (!order)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Order not found"
            })

        order.status = 'failure'
        order.paymentStatus = 'failed'
        await order.save()

        const existingPayment = await Payment.findOne({ razorpayOrderId })

        if (!existingPayment) {
            const payment = await Payment.create({
                adId: order.adId,
                razorpayOrderId: order.razorpayOrderId,
                amount: order.amount,
                paymentType: 'online',
                razorpayPaymentId: razorpayPaymentId,
                razorpayPaymentSignature: null,
                status: 'failed'
            })

            order.paymentId = payment._id
        }
        else {
            existingPayment.status = 'failed'
            await existingPayment.save()
            order.paymentId = existingPayment._id
        }

        return res.status(SUCCESS_CODE).json({
            success: false,
            message: "Status updated for failed payment",
            existingPayment
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}