import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, userLocationCoordinates } from "../../config/constant.js"


export const getUserCoordinates = async (req, res) => {
    try {
        const lat = req.params.lat
        const lng = req.params.lng

        userLocationCoordinates.lat = Number(lat)
        userLocationCoordinates.lng = Number(lng)

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Coordinates stored successfully",
            coordinates: [userLocationCoordinates.lat, userLocationCoordinates.lng]
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}