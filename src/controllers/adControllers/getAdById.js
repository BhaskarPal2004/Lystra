import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAdById = async (req, res) => {
  const { id } = req.params;

  try {
      const ad = await Ad.findById(id).populate('sellerId', 'name email');

      if (!ad) {
          return res.status(NOT_FOUND_CODE).send({
              success: false,
              message: "Ad not found"
          });
      }

      res.status(SUCCESS_CODE).send({
          success: true,
          message: "Ad fetched successfully",
          data: ad
      });

  } catch (error) {
      res.status(INTERNAL_SERVER_ERROR_CODE).send({
          success: false,
          message: error.message,
      });
  }
};