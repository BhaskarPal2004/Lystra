import bcrypt from "bcryptjs"

import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import generateToken from "../../helper/generateToken.js"
import Buyer from "../../models/buyerModel.js"
import sessionsModel from "../../models/sessionModel.js"
import Seller from "../../models/sellerModel.js"

export const login = async (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body
        const role = req.params.role

        if (!role) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Role required"
            })
        }

        const buyer = await Buyer.findOne({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        }, { name: 1, email: 1, password: 1, isVerified: 1 }).exec()

        const seller = await Seller.findOne({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        }, { name: 1, email: 1, password: 1, isVerified: 1 }).exec()

        const user = role === 'buyer' ? buyer : seller

        if (!user) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        if (!user.isVerified) {
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "Please verify your email first"
            })
        }

        const accessToken = generateToken('accessToken', user._id, '1h', role)
        const refreshToken = generateToken('refreshToken', user._id, '1d', role)

        await sessionsModel.create({ userId: user._id })

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Logged in successfully",
            user,
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