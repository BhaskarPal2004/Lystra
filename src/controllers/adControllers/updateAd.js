import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import createAddress from "../../helper/createAddress.js"
import { getLocationCoords } from "../../helper/getLocationCoords.js"
import Address from "../../models/addressModel.js"
import Ad from "../../models/adModel.js"
import Category from "../../models/categoryModel.js"

export const updateAd = async (req, res) => {
    try {
        const adId = req.params.adId
        const updatedFields = req.body

        if (updatedFields.address) {
            const ad = await Ad.findById(adId, { address: 1 }).populate('address')
            const existingAddress = await Address.findById(ad.address._id.toHexString())

            const updatedAddress = {
                line1: updatedFields.address.line1 || existingAddress.line1,
                line2: updatedFields.address.line2 || existingAddress.line2,
                state: updatedFields.address.state || existingAddress.state,
                city: updatedFields.address.city || existingAddress.city,
                country: updatedFields.address.country || existingAddress.country,
                pinCode: updatedFields.address.pinCode || existingAddress.pinCode
            }

            const coordinates = await getLocationCoords(updatedAddress.city, updatedAddress.state)

            updatedAddress.location = { type: "Point", coordinates: [coordinates.lat, coordinates.lng] }

            const newAddressId = await createAddress(updatedAddress)
            await Address.findByIdAndDelete(ad.address._id.toHexString())
            updatedFields.address = newAddressId
        }

        
        if(updatedFields.category){
           const existingCategory = await Category.findOne({name:updatedFields.category})
           if(existingCategory){
            delete updatedFields.category 
            updatedFields.category = existingCategory._id
           }
           else {
           const newCategory = await Category.create({name:updatedFields.category})
           delete updatedFields.category 
           updatedFields.category = newCategory._id
           }
        }

        const ad = await Ad.findOneAndUpdate({ _id: adId }, { $set: updatedFields })
        if (!ad)
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "Ad not found"
            })

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Ad is updated successfully",
            data: await Ad.findById(adId),
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}
