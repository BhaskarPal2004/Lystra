import {
  BAD_REQUEST_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  SUCCESS_CODE,
} from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import Buyer from "../../models/buyerModel.js";

export const browseAds = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Buyer.findById(userId);
    const filterAds = []

    if (user.interests.length === 0) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "No interest found",
      });
    }

    const allAds = await Ad.find({})

    user.interests.forEach((interest) => {
        allAds.forEach((ad)=>{
            console.log(ad.category);
            if(ad.category === interest || ad.subCategory === interest) {
                filterAds.push(ad)
            }
        })
    })

    return res.status(SUCCESS_CODE).json({
      success: true,
      totalAds:filterAds.length,
      data: filterAds,
      message: "Ads featching successfully",
    });

  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};
