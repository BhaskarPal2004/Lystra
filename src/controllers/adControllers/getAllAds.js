import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAllAds = async (req, res) => {

  try {
    const { searchKeyword = "", searchCategory = ""}  = req.query;  //default value is empty string

   

        const filteredAds = await Ad.find({
          $and: [
            { category: new RegExp(searchCategory.trim(), 'i') },
            {
              $or: [
                { name: new RegExp(searchKeyword.trim(), 'i') },
                { listingType: new RegExp(searchKeyword.trim(), 'i') },
                { category: new RegExp(searchKeyword.trim(), 'i') },
                { subCategory: new RegExp(searchKeyword.trim(), 'i') },
                { description: new RegExp(searchKeyword.trim(), 'i') }
              ]
            }

          ]

        })

        const filteredAdsOnDetails = await Ad.aggregate([
          {
            $match: {
              category: new RegExp(searchCategory.trim(), 'i') 
            }
          },
          {
            $addFields: {
              detailsArray: { $objectToArray: "$details" }
            }
          },
          { $unwind: "$detailsArray" },
          {
            $match: {
              "detailsArray.v": new RegExp(searchKeyword.trim(), 'i')
            }
          },
          {
            $replaceRoot: { newRoot: "$$ROOT" }
          }
        ]);

      
        const combinedResult = [...filteredAds];

        const filteredAdsIds = new Set(filteredAds.map(ad => ad._id.toString()));

        filteredAdsOnDetails.forEach(ad => {
          if (!filteredAdsIds.has(ad._id.toString())) {
            combinedResult.push(ad);
          }
        });


        res.status(SUCCESS_CODE).send({
          success: true,
          total:combinedResult.length,
          ads: combinedResult
        });
      }

  catch (error) {
    res.status(INTERNAL_SERVER_ERROR_CODE).send({
      message: error.message,
      success: false,
    });
  }
}



