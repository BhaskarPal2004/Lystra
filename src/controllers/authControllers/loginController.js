import bcrypt from "bcryptjs"

import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import generateToken from "../../helper/generateToken.js"
import Buyer from "../../models/buyerModel.js"
import sessionsModel from "../../models/sessionModel.js"
import Seller from "../../models/sellerModel.js"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const buyer = await Buyer.findOne({ email: email }, { name: 1, password: 1, isVerified: 1 }).exec()
        const seller = await Seller.findOne({ email: email }, { name: 1, password: 1, isVerified: 1 }).exec()

        if (!buyer && !seller) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const user = buyer || seller

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

        const role = buyer ? 'buyer' : 'seller'

        const accessToken = generateToken('accessToken', user._id, '9h', role)
        const refreshToken = generateToken('refreshToken', user._id, '1d', role)

        await sessionsModel.create({ userId: user._id })

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Logged in successfully",
            greet: `Welcome ${user.name}`,
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