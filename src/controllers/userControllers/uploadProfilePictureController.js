import { BAD_REQUEST_CODE, CREATED_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE } from "../../config/constant.js"
import Buyer from "../../models/buyerModel.js"
import Seller from "../../models/sellerModel.js"
import fs from 'fs'

export const uploadProfilePictureController = async (req, res) => {
    try {
        const file = req.file
        const userId = req.userId
        const role = req.role
        console.log("file", file)
        if (!file) {
            console.log("file not found")
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "No files uploaded"
            })
        }

        const user = role === 'buyer' ? await Buyer.findById(userId) : await Seller.findById(userId)

        const existingProfilePicture = user.profilePicture.split('/').slice(-3).join('/')

        if (existingProfilePicture !== "") {
            fs.unlink(existingProfilePicture, async (error) => {
                if (error) {
                    return res.status(NOT_FOUND_CODE).json({
                        success: false,
                        message: error.message
                    })
                }
            })
        }

        user.profilePicture = `http://localhost:3000/uploads/profilePictures/${file.filename}`

        await user.save()

        return res.status(CREATED_CODE).json({
            success: true,
            message: 'Profile picture updated successfully',
            profilePicture: user.profilePicture
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}