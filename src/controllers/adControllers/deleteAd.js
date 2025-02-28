import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESS_CODE,
} from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const deleteAd = async (req, res) => {
  const { id } = req.params;
  const {userId} = req;
  try {
    const findAd = await Ad.find({ _id: id , sellerId: userId});
    if (findAd.length > 0) {
      await Ad.deleteOne(findAd[0]);
      res.status(SUCCESS_CODE).send({
        success: true,
        message: "Ad deleted successfully",
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
