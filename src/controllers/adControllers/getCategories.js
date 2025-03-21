import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Category from "../../models/categoryModel.js"

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('name');

    if (!categories.length) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "No category found",
      })
    }

    return res.status(SUCCESS_CODE).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    })

  }
  catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message
    })
  }
}