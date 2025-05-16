import Ad from "../../models/adModel.js";
import {
    INTERNAL_SERVER_ERROR_CODE,
    NOT_FOUND_CODE,
    SUCCESS_CODE
} from "../../config/constant.js";

export const getHighestAdPrice = async (req, res) => {
    try {
        const result = await Ad.aggregate([
            {
                $group: {
                    _id: null,
                    highestPrice: { $max: "$price" },
                },
            },
        ]);

        if (!result.length || result[0].highestPrice == null) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "No ads found or prices are missing",
            });
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Highest ad price fetched successfully",
            data: {
                highestPrice: result[0].highestPrice,
            },
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
};
