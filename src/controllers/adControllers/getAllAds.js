import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAllAds = async (req, res) => {

  try {
    const { searchKeyword = "", searchCategory = "" } = req.query; //either "" or some value



    //sorting
    // let sortCriteria = null
    // if (sortBy === "asc") {
    //   sortCriteria = { createdAt: "asc" }
    // }
    // else {
    //   sortCriteria = { createdAt: "desc" }
    // }

    //searching

    if (searchCategory && searchKeyword === "") {

      const filteredAds = await Ad.find({
        category: new RegExp(searchCategory.trim(), 'i')
      })

      // .sort(sortCriteria).limit(3);

      return res.status(SUCCESS_CODE).send({
        success: true,
        ads: filteredAds
      });

    } else if (searchKeyword && searchCategory === "") {
      const filteredAds = await Ad.find({
        $or: [
          { name: new RegExp(searchKeyword.trim(), 'i') },
          { listingType: new RegExp(searchKeyword.trim(), 'i') },
          { category: new RegExp(searchKeyword.trim(), 'i') },
          { subCategory: new RegExp(searchKeyword.trim(), 'i') },
          { description: new RegExp(searchKeyword.trim(), 'i') },
        ]
      });

      const filteredAdsOnDetails = await Ad.aggregate([
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
      ])

      const filteredAdsIds = new Set(filteredAds.map(ad => ad._id.toString()));

      let combinedResult = [...filteredAds];

      filteredAdsOnDetails.forEach(ad => {
        if (!filteredAdsIds.has(ad._id.toString())) {
          combinedResult.push(ad);
        }
      });

      // combinedResult.sort((a, b) => {
      //   const dateA = new Date(a.createdAt);
      //   const dateB = new Date(b.createdAt);
      //   if (sortCriteria.createdAt === "asc") {
      //     return dateA - dateB;
      //   } else {
      //     return dateB - dateA;
      //   }
      // })

      return res.status(SUCCESS_CODE).send({
        success: true,
        ads: combinedResult
      });

    } else if (searchKeyword && searchCategory) {

      try {

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


        // .sort(sortCriteria).limit(3);

        res.status(SUCCESS_CODE).send({
          success: true,
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

    else {
      try {
        const ads = await Ad.find().populate('sellerId', 'name email').sort(sortCriteria).limit(3);
        res.status(SUCCESS_CODE).send({
          success: true,
          ads: ads
        });
      }
      catch (error) {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: error.message,
          success: false,
        });
      }
    }
  }

  catch (error) {
    res.status(INTERNAL_SERVER_ERROR_CODE).send({
      message: error.message,
      success: false,
    });
  }
}



