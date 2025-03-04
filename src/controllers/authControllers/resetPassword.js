import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import {BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE} from "../../config/constant.js"
import bcrypt from "bcryptjs";
const resetPassword =async (req, res) => {
    try{
        const { password, confirmPassword } = req.body;
        const User = (req.role === 'buyer') ? Buyer : Seller;
        const user =await User.findOne({ email: req.userId });
        if(!user) return res.status(NOT_FOUND_CODE).send({
            success: false,
            message: "user not found"
        })
        if(password===confirmPassword){
            console.log('user :>> ', user);
            user.password=bcrypt.hashSync(password,10);
            await user.save();
            res.status(SUCCESS_CODE).send({
                success: true,
                message: "password updated successfully"
            })
        }else res.status(BAD_REQUEST_CODE).send({
            success: false,
            message: "password mismatch"
        })
    }catch(error){
        console.log('error :>> ', error);
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success:false,
            message:error.message
        })
    }
        
}
export default resetPassword;