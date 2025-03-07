import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import bcrypt from "bcryptjs";
const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const User = (req.role === 'buyer') ? Buyer : Seller;
        const user = await User.findOne({ email: req.userId }, { password: 1 });
        if (!user) return res.status(NOT_FOUND_CODE).send({
            success: false,
            message: "User not found"
        })
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(BAD_REQUEST_CODE).send({
                success: false,
                message: "New password cannot be the same as the old password. Please set a different password."
            });
        }
        if (password === confirmPassword) {
            user.password = bcrypt.hashSync(password, 10);
            await user.save();
            return res.status(SUCCESS_CODE).send({
                success: true,
                message: "Password updated successfully"
            })
        } else res.status(BAD_REQUEST_CODE).send({
            success: false,
            message: "Confirm Password doesn't match with the password"
        })
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }

}
export default resetPassword;