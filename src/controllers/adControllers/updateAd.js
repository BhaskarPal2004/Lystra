import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js"
import createAddress from "../../helper/createAddress.js"
import { getLocationCoords } from "../../helper/getLocationCoords.js"
import Address from "../../models/addressModel.js"
import Ad from "../../models/adModel.js"
import Category from "../../models/categoryModel.js"
import fs from 'fs'


export const updateAd = async (req, res) => {
    try {
        const adId = req.params.adId
        let updatedFields = req.body
        const reqFiles = req.files
        const files = []

        //address gets updated
        if (updatedFields.address) {
            const ad = await Ad.findById(adId).populate('address')
            if (!ad) {
                return res.status(NOT_FOUND_CODE).json({
                    success: false,
                    message: "Ad not found"
                });
            }
            const existingAddress = await Address.findById(ad.address._id)


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

        //category field updated
        if (updatedFields.category) {
            const existingCategory = await Category.findOne({ name: updatedFields.category })
            if (existingCategory) {
                delete updatedFields.category
                updatedFields.category = existingCategory._id
            }
            else {
                const newCategory = await Category.create({ name: updatedFields.category })
                delete updatedFields.category
                updatedFields.category = newCategory._id
            }
        }

        //delete all files

        const previousAd = await Ad.findById(adId)
        try {
            if (previousAd.files.length > 0) {
                previousAd.files.forEach((file) => {
                    const existingFile = file.fileUrl.split('/').slice(-3).join('/')
                    fs.unlink(existingFile, async (error) => {
                        if (error) {
                            return res.status(NOT_FOUND_CODE).json({
                                success: false,
                                message: error.message
                            })
                        }
                    })
                })

                await Ad.updateOne(
                    { _id: adId },
                    { $set: { files: [] } }
                );
            }
        }
        catch (error) {
            return res.status(INTERNAL_SERVER_ERROR_CODE).json({
                success: false,
                message: error.message
            })
        }


        //files get updated
        reqFiles.forEach((file) => {
            const fileUrl = `http://localhost:3000/${file.path}`
            files.push({ fileUrl, fileType: file.mimetype })
        })

        const ad = await Ad.findOneAndUpdate({ _id: adId }, { $set: updatedFields, files })
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

