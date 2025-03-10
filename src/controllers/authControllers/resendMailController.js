import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import sendEmail from "../../email/sendEmail.js"
import generateToken from "../../helper/generateToken.js"
import Buyer from "../../models/buyerModel.js"
import Seller from "../../models/sellerModel.js"

export const resendMail = async (req, res) => {
    try {
        const { email } = req.body

        const buyer = await Buyer.findOne({ email: email }, { name: 1 }).exec()
        const seller = await Seller.findOne({ email: email }, { name: 1 }).exec()

        const user = buyer || seller || null
        const role = buyer ? 'buyer' : 'seller'

        if (user === null) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Please register first"
            })
        }

        if (user.isVerified) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "User is already verified. Please log in"
            })
        }
        else {
            const registrationToken = generateToken('registrationToken', email, '30m', role)
            try {
                const contextData = {
                    port: process.env.PORT,
                    token: registrationToken,
                    name: user.name
                };
                const subject = "Verify your email address"
                await sendEmail(email, 'emailVerificationTemplate', contextData, subject);
            } catch (error) {
                return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                    success: false,
                    message: error.message
                })
            }
            return res.status(SUCCESS_CODE).json({
                success: true,
                message: "Email send successfully",
                registrationToken
            })
        }

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}