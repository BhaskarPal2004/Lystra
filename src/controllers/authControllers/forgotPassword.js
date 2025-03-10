import generateToken from "../../helper/generateToken.js";
import sendEmail from "../../email/sendEmail.js";
import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
const forgotPassword = async (req, res) => {
    try {
        const { email, role } = req.body;
        const forgotPasswordToken = generateToken("forgotPasswordToken", email, '30m', role);
        const User = (role === 'buyer') ? Buyer : Seller;
        const user = await User.findOne({ email },{name:1}).exec();
        if (!user) return res.status(NOT_FOUND_CODE).send({
            success: false,
            message: "User not found"
        })
        try {
            const contextData = {
                port: process.env.PORT,
                token: forgotPasswordToken,
                name:user.name
            };
            const subject = "Click here to set new password"
            await sendEmail(email, 'emailForgotPasswordTemplate', contextData,subject);
            return res.status(SUCCESS_CODE).send({
                success: true,
                message: "An email has been sent to you"
            })
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                success: false,
                message: error.message
            })
        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}
export default forgotPassword;