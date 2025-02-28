import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import createAddress from "../../helper/createAddress.js";
import Address from "../../models/addressModel.js";

const updateProfile = async (req, res) => {
    try {
        const {name, phoneNumber, address } = req.body;
        const {userId,role}=req;
        const User = (role === 'buyer') ? Buyer : Seller;
        const user = await User.findById(userId);
        if(name) user.name = name
        user.phoneNumber = (phoneNumber) ?? phoneNumber;
        if (address) {
            await Address.findByIdAndDelete(user.address);
            user.address = await createAddress(address);
        }
        await user.save();
        res.status(SUCCESS_CODE).send({
            success: true,
            message: "Profile updated successfully"
        })
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}
export default updateProfile;