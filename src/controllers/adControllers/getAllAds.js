import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAllAds = async (req, res) => {

  try {
    const { searchKeyword = "", searchCategory = "", sortBy = "createdAt", sortOrder = "asc", searchSubCategory = "", minPrice = 0, maxPrice = Infinity , condition = ""} = req.query;

    const conditionArray = ["new", "used", "refurbished"]

    const isValidCondition = conditionArray.includes(condition) 
   
    
    
    let priceFilter = { $gte: 0, $lte: Infinity }

    if(isNaN(minPrice) || isNaN(maxPrice)){
      priceFilter = { $gte: 0, $lte: Infinity }
    }
    else if (Number(minPrice) !== 0 || Number(maxPrice) !== Infinity) {
     
      priceFilter = { $gte: Number(minPrice), $lte: Number(maxPrice) }
    }



    const matchConditions = {
      category: new RegExp(searchCategory.trim(), 'i'),
      subCategory: new RegExp(searchSubCategory.trim(), 'i'),
      price: priceFilter
    }

    if(isValidCondition){
      matchConditions.condition = condition
    }


    console.log(matchConditions)


    const filteredAds = await Ad.aggregate([
      {
        $match: 
         matchConditions
        
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

    const total = filteredAds.length
    if (total === 0){
      throw new Error("No ads exist")
    }
    res.status(SUCCESS_CODE).send({
      success: true,
      total: total,
      ads: filteredAds
    });
  }

  catch (error) {
    if (error.message === "No ads exist"){
      return res.status(NOT_FOUND_CODE).send({
        message: error.message,
        success: false,
      });
    }
    res.status(INTERNAL_SERVER_ERROR_CODE).send({
      message: error.message,
      success: false,
    });
  }
}

