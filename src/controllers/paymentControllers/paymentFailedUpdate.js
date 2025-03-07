import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Order from "../../models/orderModel.js"
import Payment from "../../models/paymentModel.js"

export const paymentFailedUpdate = async (req, res) => {
    try {
        const razorpayOrderId = req.params.razorpayOrderId
        const order = await Order.findOne({ razorpayOrderId })
        const payment = await Payment.findOne({ razorpayOrderId })

        if (!order)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Order not found"
            })

        if (!payment)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Payment not found"
            })

        order.status = 'failure'
        order.paymentStatus = 'failed'
        await order.save()

        payment.status = 'failed'
        await payment.save()

        return res.status(SUCCESS_CODE).json({
            success: false,
            message: "Status updated for failed payment"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}