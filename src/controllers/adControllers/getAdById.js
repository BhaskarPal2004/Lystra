import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import { updateAdAnalytics } from "../../helper/updateAdAnalytics.js";
import { setAdsPerformance } from "../../helper/setAdsPerformance.js";

export const getAdById = async (req, res) => {
    try {
        const adId = req.params.adId;
        const role = req.role;

        const ad = await Ad.findById(adId).populate('sellerId address');

        if (!ad)
            return res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "Ad not found"
            });


        //increment clicks of the ad 

        if (role !== "seller") {
            await setAdsPerformance(adId, 0, 1);
            await updateAdAnalytics(adId, 0, 1);
        }

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
