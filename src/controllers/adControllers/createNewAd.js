import Ad from "../../models/adModel.js"
import { SUCCESS_CODE, NOT_FOUND_CODE } from "../../config/constant.js"
import createAddress from "../../helper/createAddress.js";
import { getLocationCoords } from "../../helper/getLocationCoords.js";
import { createNewCategory } from "../../helper/createNewCategory.js";


export const createNewAd = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, category, description, images, address = null, condition, price } = req.body;

        const expiryDate = new Date();
        const expireInDays = 30
        expiryDate.setDate(expiryDate.getDate() + expireInDays);

        //address given at time of ad creation 

        let adAddress = null
        if(address){
        const coordinates = await getLocationCoords(`${address.city},${address.state}`)
        address.location = { type: "Point", coordinates: [coordinates.lat, coordinates.lng] }
        adAddress = await createAddress(address)
        }
        //address not given at time of ad creation => seller address is set as ad address
        
        else {
            const sellerDetails = await Seller.findById(userId)
            adAddress = sellerDetails.address
        }
        
        const categoryId = await createNewCategory(category)

        const newAd = await Ad.create({ sellerId: userId, name, category: categoryId, description, images, price, condition, address: adAddress, expiryDate })

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
