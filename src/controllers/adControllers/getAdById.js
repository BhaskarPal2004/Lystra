import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAdById = async (req, res) => {
    try {
        const adId = req.params.adId;
        const ad = await Ad.findById(adId).populate('sellerId', 'name email');

        if (!ad)
            return res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "Ad not found"
            });

        ad.performance.clicks += 1;
        await ad.save();

        return res.status(SUCCESS_CODE).send({
            success: true,
            message: "Ad fetched successfully",
            data: ad
        });

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message,
        });
    }
};