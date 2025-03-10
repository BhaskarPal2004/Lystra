import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Buyer from "../../models/buyerModel.js"
import Seller from "../../models/sellerModel.js"


export const callRequest = async (req, res) => {
    try {
        const userId = req.userId
        const calleeId = req.params.calleeId

        const user = await Buyer.findById(userId) || await Seller.findById(userId)

        const callee = await Seller.findById(calleeId)

        /**
         send mail function will be called with below parameters
            caller => [name ,email, phone number, address ]
            callee => [name, email]
        */

        return res.status(SUCCESS_CODE).json({
            success: false,
            message: "Call request send to seller successfully",
            caller: user,
            callee: callee
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}