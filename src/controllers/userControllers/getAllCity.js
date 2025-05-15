import Address from "../../models/addressModel.js";
import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";

export const getAllCities = async (req, res) => {
    try {
        const allCities = await Address.find({}, { city: 1, _id: 0 });

        if (!allCities.length) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "No cities found",
            });
        }

        // Normalize city names to lowercase and deduplicate
        const normalizedCitiesSet = new Set(
            allCities.map((entry) => entry.city?.toLowerCase().trim()).filter(Boolean)
        );

        const normalizedCities = [...normalizedCitiesSet];

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "All unique cities retrieved successfully",
            totalCities: normalizedCities.length,
            data: normalizedCities,
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
};

export default getAllCities;
