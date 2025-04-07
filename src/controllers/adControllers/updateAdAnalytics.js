// import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import AdAnalytics from "../../models/adAnalytics.js";

export const updateAdAnalytics = async (adId, views, clicks) => {

  try {
    // const { adId, views, clicks } = req.body;

    const today = new Date().toISOString().split('T')[0];

    let analytics = await AdAnalytics.findOneAndUpdate(
      { adId, date: today },
      { $inc: { views, clicks } },
      { upsert: true, new: true }
    )

    await analytics.save();

    // return res.status(SUCCESS_CODE).send({
    //   success: true,
    //   message: 'Ad analytics updated successfully',
    //   data: analytics
    // })
  }
  catch (error) {
    throw new Error(error.message);
  }

}