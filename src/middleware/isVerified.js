import Seller from "../models/sellerModel.js";
import Buyer from "../models/buyerModel.js";
import { BAD_REQUEST_CODE, NOT_FOUND_CODE, UNAUTHORIZED_CODE } from "../config/constant.js";
import sessionsModel from "../models/sessionModel.js";


const isVerified = async (req, res, next) => {
    const userId = req.userId;

    const User = (req.role === 'buyer') ? Buyer : Seller;
    const user = await User.findById(userId);

    if (!user)
        return res.status(NOT_FOUND_CODE).json({
            success: false,
            message: "User not found"
        })


    if (!user.isVerified)
        return res.status(BAD_REQUEST_CODE).json({
            success: false,
            message: "User is not verified"
        })

    const session = await sessionsModel.findOne({ userId })

    if (!session)
        return res.status(UNAUTHORIZED_CODE).json({
            success: false,
            message: "Unauthorized Access, Please Login first"
        })

    else next()
}

export default isVerified;