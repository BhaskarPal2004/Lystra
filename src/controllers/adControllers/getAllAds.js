import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAllAds = async (req, res) => {

  try {
    const { searchKeyword = "", searchCategory = "", sortBy = "createdAt", sortOrder = "asc", searchSubCategory = "", minPrice = 0, maxPrice = Infinity } = req.query;

    let priceFilter = { $gte: 0, $lte: Infinity }

    if (Number(minPrice) !== 0 || Number(maxPrice) !== Infinity) {
      priceFilter = { $gte: Number(minPriceRange), $lte: Number(maxPriceRange) }
    }



    const filteredAds = await Ad.aggregate([
      {
        $match: {
          category: new RegExp(searchCategory.trim(), 'i'),
        }
      },
      {
        $match: {
          subCategory: new RegExp(searchSubCategory.trim(), 'i'),
        }
      },
      {
        $match: {
          price: priceFilter
        }
      },
      {
        $addFields: {
          detailsArray: { $objectToArray: "$details" }
        }
      },
      {
        $match: {
          $or: [
            { name: new RegExp(searchKeyword.trim(), 'i') },
            { listingType: new RegExp(searchKeyword.trim(), 'i') },
            { category: new RegExp(searchKeyword.trim(), 'i') },
            { subCategory: new RegExp(searchKeyword.trim(), 'i') },
            { description: new RegExp(searchKeyword.trim(), 'i') },
            { "detailsArray.v": new RegExp(searchKeyword.trim(), 'i') }

          ]
        }
      },
      {
        $sort: {
          [sortBy]: sortOrder === "asc" ? 1 : -1
        }
      }
    ]);
    res.status(SUCCESS_CODE).send({
      success: true,
      total: filteredAds.length,
      ads: filteredAds
    });
  }

  catch (error) {
    res.status(INTERNAL_SERVER_ERROR_CODE).send({
      message: error.message,
      success: false,
    });
  }
}


