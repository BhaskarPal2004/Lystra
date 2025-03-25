import Ad from "../../models/adModel.js"
import { SUCCESS_CODE, NOT_FOUND_CODE } from "../../config/constant.js"
import createAddress from "../../helper/createAddress.js";
import { getLocationCoords } from "../../helper/getLocationCoords.js";
import { createNewCategory } from "../../helper/createNewCategory.js";
import Seller from "../../models/sellerModel.js";
import Analytics from "../../models/analyticsModel.js";



export const createNewAd = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, category, description, address = null, condition, price } = req.body;
        const reqFiles = req.files
        console.log('reqFiles', reqFiles)
        const files = []

        const expiryDate = new Date();
        const expireInDays = 30
        expiryDate.setDate(expiryDate.getDate() + expireInDays);

        //address given at time of ad creation 

        let adAddress = null
        if (address) {
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

        // reqFiles?.forEach((file) => {
        //     console.log(file)
        //     const fileUrl = `http://localhost:3000/${file.path}`
        //     files.push({ fileUrl, fileType: file.mimetype })
        // })

        reqFiles.forEach((file) => {
            console.log(file)
        })

        const newAd = await Ad.create({
            sellerId: userId,
            name,
            category: categoryId,
            description,
            files,
            price,
            condition,
            address: adAddress,
            expiryDate
        })

        //create analytics
        await Analytics.create({ adId: newAd._id })


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
