import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js"
import { instance } from "../../config/razorpay.js"
import Ad from "../../models/adModel.js"

export const boostedPaymentCheckout = async (req, res) => {
    try {
        const sellerId = req.userId
        const adId = req.params.adId
        const { days, amount } = req.body
        const ad = await Ad.findById(adId)


        if (ad.sellerId.toHexString() !== sellerId) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: "Unauthorized access"
            })
        }

        if (ad.boost.isBoosted) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Ad is already boosted"
            })
        }

        const options = {
            amount: Number(amount * 100),
            notes: { days, adId },
            // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
        };

        const order = await instance.orders.create(options)

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: 'Order created',
            data: order
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error
        })
    }
}