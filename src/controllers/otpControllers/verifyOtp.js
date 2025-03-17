import jwt from "jsonwebtoken"

import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE } from "../../config/constant.js"
import Otp from "../../models/otpModel.js"
import generateToken from "../../helper/generateToken.js"
import sessionsModel from "../../models/sessionModel.js"


export const verifyOtp = async (req, res) => {
    try {
        const otpInput = req.body.otp
        const otpToken = req.params.otpToken

        jwt.verify(otpToken, process.env.SECRET_KEY, async (error, decoded) => {
            if (error) {
                return res.status(UNAUTHORIZED_CODE).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                if (decoded.type !== 'otpToken') {
                    return res.status(BAD_REQUEST_CODE).json({
                        success: false,
                        message: "Invalid Token Type"
                    })
                }

                const { userId } = decoded.id
                const role = decoded.role

                const currentOtp = await Otp.findOne({ userId: userId, otp: otpInput })

                if (!currentOtp) {
                    return res.status(BAD_REQUEST_CODE).json({
                        success: false,
                        message: "Otp verification failed"
                    })
                }

                await Otp.deleteOne(currentOtp)

                const accessToken = generateToken('accessToken', userId, '9h', role)
                const refreshToken = generateToken('refreshToken', userId, '1d', role)

                await sessionsModel.deleteMany({ userId: userId })
                await sessionsModel.create({ userId: userId })

                return res.status(SUCCESS_CODE).json({
                    success: true,
                    message: "Logged in Successfully",
                    accessToken,
                    refreshToken
                })
            }
        });

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}