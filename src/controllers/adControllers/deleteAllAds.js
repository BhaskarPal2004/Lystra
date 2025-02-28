import {
    INTERNAL_SERVER_ERROR_CODE,
    NOT_FOUND_CODE,
    SUCCESS_CODE,
  } from "../../config/constant.js";
  import Ad from "../../models/adModel.js";
  
  export const deleteAllAds = async (req, res) => {
    const {userId} = req.body;
    try {
      const findAd = await Ad.findOne({sellerId: userId});
      if (findAd) {
        await Ad.deleteMany({sellerId: userId});
        res.status(SUCCESS_CODE).send({
          success: true,
          message: "All ad deleted successfully",
        });
      } else {
        return res.status(NOT_FOUND_CODE).send({
          success: false,
          message: "Ad not found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR_CODE).send({
        success: false,
        message: error.message,
      });
    }
  };