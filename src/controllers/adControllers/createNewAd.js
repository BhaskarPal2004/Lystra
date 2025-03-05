import Ad from "../../models/adModel.js"
import { SUCCESS_CODE, NOT_FOUND_CODE } from "../../config/constant.js"
import Seller from "../../models/sellerModel.js";
import createAddress from "../../helper/createAddress.js";
import { getLocationCoords } from "../../helper/getLocationCoords.js";

export const createNewAd = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, listingType, category, subCategory, description, details, images, address, condition, price, expireInDays } = req.body;

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + expireInDays);

        const coordinates = await getLocationCoords(`${address.city},${address.state}`)
        address.coordinates = [coordinates.lat, coordinates.lng]
        const adAddress = await createAddress(address)

        console.log(adAddress)

        const newAd = await Ad.create({ sellerId: userId, name, listingType, category, subCategory, description, details, images, price, condition, address: adAddress, expiryDate })

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
