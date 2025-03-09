import jwt from "jsonwebtoken"
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"
import { generateOtp } from "../../helper/generateOtp.js"
import Otp from "../../models/otpModel.js"

export const resendOtp = async (req, res) => {
    try {
        const otpToken = req.params.otpToken
        jwt.verify(otpToken, process.env.SECRET_KEY, async (error, decoded) => {
            if (error) {
                return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                    success: false,
                    message: error.message
                })

            } else {
                if (decoded.type !== 'otpToken') {
                    return res.status(BAD_REQUEST_CODE).json({
                        success: false,
                        message: "OTP verification failed"
                    })
                }

                const { email } = decoded.id
                await Otp.deleteMany({ email: email })

                try {
                    await generateOtp(email)
                } catch (error) {
                    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                        success: false,
                        message: error.message
                    })
                }

                return res.status(SUCCESS_CODE).json({
                    success: true,
                    message: "OTP send to your Email"
                })
            }
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}