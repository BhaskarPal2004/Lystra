import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import AdAnalytics from "../../models/adAnalytics.js";

export const getAdAnalytics = async (req, res) => {
  try {
    const { adId, days } = req.params;

    if (!adId || !days) {
      return res.status(400).send({
        success: false,
        message: "adId and days are required in the query"
      });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days) + 1);

    const formattedStartDate = startDate.toISOString().split('T')[0];


    const analyticsData = await AdAnalytics.find({
      adId,
      date: { $gte: formattedStartDate }
    }).sort({ date: 1 });

    if (!analyticsData || analyticsData.length === 0) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "No analytics data found for this ad"
      });
    }

    const formattedData = analyticsData.map((data) => ({
      date: data.date,
      views: data.views,
      clicks: data.clicks
    }));


    return res.status(SUCCESS_CODE).send({
      success: true,
      message: 'Ad analytics fetched successfully',
      data: formattedData
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message
    });
  }
};
