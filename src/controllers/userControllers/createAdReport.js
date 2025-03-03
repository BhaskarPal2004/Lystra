import Ad from "../../models/adModel.js";
import { SUCCESS_CODE, NOT_FOUND_CODE, INTERNAL_SERVER_ERROR_CODE, BAD_REQUEST_CODE } from "../../config/constant.js";

export const createAdReport = async (req, res) => {
  try {
    const userId = req.userId
    const adId = req.params.adId;
    const { message, isFake, isFraudulent } = req.body;
    let isReported = false

    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "Ad not found"
      })
    }

    if (ad.sellerId.toHexString() === userId) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "You can't report to your own ad"
      })
    }

    ad.reports.forEach((report) => {
      if (report.reporterId.toHexString() === userId)
        isReported = true
    })

    if (isReported) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "You already reported to this ad"
      })
    }

    const report = { reporterId: userId, message, isFake, isFraudulent }

    ad.reports.push(report)
    await ad.save()

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Report send successfully",
    });

  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message,
    });
  }
};
