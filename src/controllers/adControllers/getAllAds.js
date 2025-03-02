import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAllAds = async (req, res) => {

  try {
    const { searchKeyword = "", searchCategory = "", sortBy } = req.query; //either "" or some value


    //sorting
    let sortCriteria = null
    if (sortBy === "asc") {
      sortCriteria = { createdAt: "asc" }
    }
    else {
      sortCriteria = { createdAt: "desc" }
    }

    //searching

    if (searchCategory && searchKeyword === "") {
      const filteredAds = await Ad.find({
        category: new RegExp(searchCategory.trim(), 'i')
      }).sort(sortCriteria).limit(3);

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

      const filteredAdsOnDetails = await Ad.aggregate([{
        $project: {
          name: 1,
          sellerId: 1,
          isFeatured: 1,
          listingType: 1,
          category: 1,
          subCategory: 1,
          description: 1,
          images: 1,
          price: 1,
          details: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          address: 1,
          performance: 1, detailsArray: { $objectToArray: "$details" }
        }
      }, { $unwind: "$detailsArray" }, {
        $match: {
          "detailsArray.v": new RegExp(searchKeyword.trim(), 'i')
        }
      },
      {
        $replaceRoot: { newRoot: "$$ROOT" }
      }])
      // Log the IDs for debugging
      console.log("Filtered Ads IDs:", filteredAds.map(ad => ad._id));
      console.log("Filtered Ads On Details IDs:", filteredAdsOnDetails.map(ad => ad._id));

      // Create a Set of IDs from filteredAds for quick lookup
      const filteredAdsIds = new Set(filteredAds.map(ad => ad._id.toString())); // Ensure IDs are strings
      console.log("jo")
      console.log("set",filteredAdsIds)

      // Combine results, keeping only unique ads from filteredAds and ignoring duplicates from filteredAdsOnDetails
      let combinedResult = [...filteredAds];

      filteredAdsOnDetails.forEach(ad => {
        if (!filteredAdsIds.has(ad._id.toString())) { // Ensure IDs are strings
          combinedResult.push(ad);
        }
      });

      combinedResult.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (sortCriteria.createdAt === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      })

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

        }).sort(sortCriteria).limit(3);
        res.status(SUCCESS_CODE).send({
          success: true,
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



