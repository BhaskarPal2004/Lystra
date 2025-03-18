import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import { setAnalytics } from "../../helper/setAnalytics.js";
import Ad from "../../models/adModel.js";
import Analytics from "../../models/analyticsModel.js";

export const getAdById = async (req, res) => {
    try {
        const adId = req.params.adId;
        const ad = await Ad.findById(adId).populate('sellerId', 'name email');
        console.log(ad)

        if (!ad)
            return res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "Ad not found"
            });


        //increment clicks of the ad 

        const analytics = await Analytics.findOne({adId})
        analytics.performance.clicks =  analytics.performance.clicks + 1
        await analytics.save()

        setAnalytics(adId)

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
