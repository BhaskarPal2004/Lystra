import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
const verifyUser=async (req,res,next)=>{
    try{
        const email=req.userId;
        const User = (req.role === 'buyer') ? Buyer : Seller;
        await User.findOneAndUpdate({email},{isVerified: true});
        res.status(SUCCESS_CODE).send({
            success:true,
            message: "user verified successfully"
        });
        next();
    }catch(err){
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success:false,
            message: "unable to verify user"
        });
    }
    
}
export default verifyUser;