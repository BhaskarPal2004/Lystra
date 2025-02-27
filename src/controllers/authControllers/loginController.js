import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import generateToken from "../../helper/generateToken.js"
import Buyer from "../../models/buyerModel.js"
import bcrypt from "bcryptjs"
import sessionsModel from "../../models/sessionModel.js"
import Seller from "../../models/sellerModel.js"

export const login = async (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body
        let accessToken = null
        let refreshToken = null

        const buyer = await Buyer.findOne({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        }, { email: 1, password: 1, isVerified: 1 }).exec()

        console.log(buyer)
        const seller = await Seller.findOne({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        }, { email: 1, password: 1, isVerified: 1 }).exec()

        if (!buyer && !seller) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        if (buyer) {
            const compareBuyerPassword = bcrypt.compareSync(password, buyer.password)

            if (!compareBuyerPassword) {
                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }

            if (!buyer.isVerified) {
                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: "Please verify your email first"
                })
            }

            accessToken = generateToken('accessToken', buyer._id, '1h')
            refreshToken = generateToken('refreshToken', buyer._id, '1d')

            await sessionsModel.create({ userId: seller._id })
        }
        else if (seller) {
            const compareSellerPassword = bcrypt.compareSync(password, seller.password)

            if (!compareSellerPassword) {
                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }

            if (!seller.isVerified) {
                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: "Please verify your email first"
                })
            }

            accessToken = generateToken('accessToken', seller._id, '1h')
            refreshToken = generateToken('refreshToken', seller._id, '1d')

            await sessionsModel.create({ userId: seller._id })
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
            refreshToken
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}