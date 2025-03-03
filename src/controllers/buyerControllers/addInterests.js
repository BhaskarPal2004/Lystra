import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESS_CODE,
} from "../../config/constant.js";
import Buyer from "../../models/buyerModel.js";

const addInterests = async (req, res) => {
  try {
    const userId = req.userId;
    const { interests = [], others = "" } = req.body;
    const buyer = await Buyer.findById(userId);
    
    if (!buyer) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: "user not found",
      });
    }
    
    if (others?.trim().length > 0) {
      const items = others.split(",");
      for (let i = 0; i < items.length; i++) {
        interests.push(items[i]);
      }
    }

    buyer.interests = interests;

    await buyer.save()

    return res.status(SUCCESS_CODE).send({
      success: true,
      message: "add interest successfully",
    });

  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message,
    });
  }
};

export default addInterests;
