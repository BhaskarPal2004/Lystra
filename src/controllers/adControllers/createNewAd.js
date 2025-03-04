import Ad from "../../models/adModel.js"
import { SUCCESS_CODE, NOT_FOUND_CODE } from "../../config/constant.js"
import Seller from "../../models/sellerModel.js";
import createAddress from "../../helper/createAddress.js";

export const createNewAd = async (req, res) => {
    try {
        const { name, listingType, category, subCategory, description, details, images, address, price, expireInDays } = req.body;
        const userId = req.userId;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + expireInDays);
        const adAddress = createAddress(address)

        const newAd = await Ad.create({ sellerId: userId, name, listingType, category, subCategory, description, details, images, price, address, adAddress, expiryDate })

        const seller = await Seller.findById(userId)
        seller.ads.push(newAd)

        await seller.save()

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "New Ad created",
            data: newAd
        })

    } catch (error) {
        return res.status(NOT_FOUND_CODE).json({
            success: false,
            message: error.message,
        })
    }
}
