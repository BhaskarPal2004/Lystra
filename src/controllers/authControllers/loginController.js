import bcrypt from "bcryptjs"

import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Buyer from "../../models/buyerModel.js"
import Seller from "../../models/sellerModel.js"
import { generateOtp } from "../../helper/generateOtp.js"
import generateToken from "../../helper/generateToken.js"
import Otp from "../../models/otpModel.js"
import sendEmail from "../../email/sendEmail.js"


export const login = async (req, res) => {
    let otp = null;
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
        await Otp.deleteMany({ email: email })

        try {
            otp = await generateOtp(email)
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                success: false,
                message: error.message
            })
        }


        // sendMail function 
        const otpContextData = {
            otp: otp,
            name: user.name
        };
        const subject = `Verify your Lystra account - Your One-Time Password (OTP) is ${otp}`

        try {
            await sendEmail(email, "emailOtpTemplate", otpContextData, subject)
        }
        catch (error) {
            return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                success: false,
                message: error.message
            })
        }

        const role = buyer ? 'buyer' : 'seller'
        const otpPayload = { userId: user._id, email }

        const otpToken = generateToken('otpToken', otpPayload, '20min', role)

        //for now in backend this api will give a response
        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "An otp is sent to your email",
            otpToken
        })

        //frontend otp page will be linked here for a redirection after successful credential matches
        //we will send the otp token to the frontend url so that in verification api we can check the existence of otp
        // res.redirect('http://localhost:5173/veirfy/otp/otpToken') 

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}