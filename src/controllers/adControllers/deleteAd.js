import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const deleteAd = async (req, res) => {
  const { id } = req.params;
  try {
      const deletedAd = await Ad.findByIdAndDelete(id);

      console.log(deleteAd);
      
      if (!deletedAd) {
          return res.status(NOT_FOUND_CODE).send({
              success: false,
              message: "Ad not found"
          });
      }

      res.status(SUCCESS_CODE).send({
          success: true,
          message: "Ad deleted successfully"
      });

  } catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR_CODE).send({
          success: false,
          message: error.message,
      });
  }
};