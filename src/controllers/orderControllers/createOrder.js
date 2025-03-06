import { CREATED_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js"
import Ad from "../../models/adModel.js"
import Buyer from "../../models/buyerModel.js"
import Order from "../../models/orderModel.js"

export const createOrder = async (req, res) => {
    try {
        const adId = req.params.adId
        const buyerId = req.userId
        const ad = await Ad.findById(adId).populate('address')
        const buyer = await Buyer.findById(buyerId).populate('address')

        const billingAddress = ad.address
        const shippingAddress = buyer.address
        const { paymentType } = req.body

        const order = await Order.create({ adId, buyerId, billingAddress, shippingAddress, paymentType })

        const successMessage = paymentType === 'cod' ? "Order created successfully" : 'Redirecting to payments page'

        return res.status(CREATED_CODE).json({
            success: true,
            message: successMessage,
            data: order
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}