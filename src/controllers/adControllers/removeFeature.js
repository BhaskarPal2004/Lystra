import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESS_CODE,
  BAD_REQUEST_CODE,
} from "../../config/constant.js";
import Ad from "../../models/adModel.js";
// import Subscription from "../../models/subscriptionModel.js";

export const removeFeature = async (req, res) => {
  try {
    const sellerId = req.userId;
    const adId = req.params.adId;
    const ad = await Ad.findOne({_id:adId,sellerId:sellerId})

    if(!ad){
        return res.status(NOT_FOUND_CODE).json({
            success: false,
            message: "Ad not found",
        });
    }

    // const subscribe = await Subscription.findOne({sellerId:sellerId});
    // const currentDate = new Date(Date.now());

    // if(subscribe ){
    //     return res.status(BAD_REQUEST_CODE).json({
    //         success: false,
    //         message: "subscribed first to change feature",
    //       });
    // }

    // if( subscribe.subscriptionEndDate < currentDate){
    //     return res.status(BAD_REQUEST_CODE).json({
    //         success: false,
    //         message: "Your Subscription expired renew subscription to change feature",
    //       });
    // }
     
    if(!ad.isFeatured){
        return res.status(BAD_REQUEST_CODE).json({
            success: false,
            message: "this is not a featured Ad",
          });
    }

    ad.isFeatured = false;
    await ad.save();
    // subscribe.subscriptionAds.remove(ad);
    // await subscribe.save();


    return res.status(SUCCESS_CODE).json({
        success: true,
        message: "feature removed successfully",
      });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        message: error.message,
    });
  }
};
