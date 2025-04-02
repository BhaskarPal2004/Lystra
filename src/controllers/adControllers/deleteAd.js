import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import fs from "fs"


export const deleteAd = async (req, res) => {
  try {
    const adId = req.params.adId;
    const userId = req.userId;

    const ad = await Ad.findOne({ _id: adId, sellerId: userId });

    if (!ad)
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "Ad not found",
      });
    try {
      if (ad.files.length > 0) {
        ad.files.forEach((file) => {
          const existingFile = file.fileUrl.split('/').slice(-3).join('/')
          fs.unlink(existingFile, async (error) => {
            if (error) {
              return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: error.message
              })
            }
          })
        })
      }
    }
    catch (error) {
      return res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        message: error.message,
      });
    }
    await Ad.deleteOne({ _id: adId });


    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Ad deleted successfully",
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message,
    });
  }
};

