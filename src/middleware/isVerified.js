import Seller from "../models/sellerModel.js";
import Buyer from "../models/buyerModel.js";
import { UNAUTHORIZED_CODE } from "../config/constant.js";
const isVerified = async (req, res, next) => {
    const userId = req.userId;
    const User = (req.role === 'buyer') ? Buyer : Seller;
    const user = await User.findById(userId);
    if (user) {
        if (user.isVerified) next();
        else {
            res.status(UNAUTHORIZED_CODE).send({
                success: false,
                message: "user is not verified"
            })
        }
    } else res.status(UNAUTHORIZED_CODE).send({
        success: false,
        message: "user not found"
    })

}
export default isVerified;