import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import createAddress from "../../helper/createAddress.js";
import Address from "../../models/addressModel.js";
import { getLocationCoords } from "../../helper/getLocationCoords.js";

const updateProfile = async (req, res) => {
    try {
        const { name, phoneNumber, address } = req.body;
        const { userId, role } = req;


        const User = (role === 'buyer') ? Buyer : Seller;
        const user = await User.findById(userId);

        if (name) user.name = name
        if (phoneNumber) {
            const phoneNumberExists = await Buyer.findOne({ phoneNumber: phoneNumber }) || await Seller.findOne({ phoneNumber: phoneNumber })
            if (phoneNumber !== user.phoneNumber) {
                if (phoneNumberExists) {
                    return res.status(BAD_REQUEST_CODE).send({
                        success: false,
                        message: "Phone Number is already registered."
                    })
                }
            }
            user.phoneNumber = phoneNumber;
        }

        const existingAddress = await Address.findById(user.address);
        const updatedAddress = {
            line1: address?.line1 || existingAddress?.line1,
            line2: address?.line2 || existingAddress?.line2,
            state: address?.state || existingAddress?.state,
            city: address?.city || existingAddress?.city,
            country: address?.country || existingAddress?.country,
            landMark: address?.landMark || existingAddress?.landMark,
            pinCode: address?.pinCode || existingAddress?.pinCode
        }
        const addressDoesNotExist = Object.values(updatedAddress).every((value) => value === undefined)

        if (!addressDoesNotExist) {
            const coordinates = await getLocationCoords(updatedAddress.city, updatedAddress.state)
            updatedAddress.location = { type: "Point", coordinates: [coordinates.lat, coordinates.lng] }

            await Address.deleteOne(existingAddress?._id)
            user.address = await createAddress(updatedAddress);

        }

        await user.save();
        return res.status(SUCCESS_CODE).send({
            success: true,
            message: "Profile updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}

export default updateProfile;