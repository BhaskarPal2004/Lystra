import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import { setAdsViews } from "../../helper/setAdsViews.js";
import Address from "../../models/addressModel.js"

export const getAllAds = async (req, res) => {
  try {
    const {
      searchKeyword = "",
      searchCategory = "",
      sortBy = "createdAt",
      sortOrder = "asc",
      searchSubCategory = "",
      minPrice = 0,
      maxPrice = Infinity,
      condition = "",
      city = ""
    } = req.query;
    


    //validation
    const categoryArray = ['electronics', 'vehicles', 'real estate', 'home and furniture', 'jobs and services', 'fashion and beauty']
    const isValidCategory = categoryArray.includes(searchCategory.trim().toLowerCase())

    const conditionArray = ["new", "used", "refurbished"]
    const isValidCondition = conditionArray.includes(condition.trim().toLowerCase())



    //match conditions

    let priceFilter = { $gte: 0, $lte: Infinity }
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      priceFilter = { $gte: 0, $lte: Infinity }
    }
    else if (Number(minPrice) !== 0 || Number(maxPrice) !== Infinity) {
      priceFilter = { $gte: Number(minPrice), $lte: Number(maxPrice) }
    }

    const matchConditions = {
      subCategory: new RegExp(searchSubCategory.trim(), 'i'),
      price: priceFilter,
      $expr: {
        $regexMatch: {
          input: "$addressDetails.city",
          regex: new RegExp(city.trim(), 'i')
        }
      },
      expiryDate: { $gte: new Date() }
    }

    if (isValidCondition) {
      matchConditions.condition = condition.trim().toLowerCase()
    }
    if (isValidCategory) {
      matchConditions.category = searchCategory.trim().toLowerCase()
    }


    //database query

    const filteredAds = await Ad.aggregate([
      
      {
        $lookup: {
          from: "addresses",
          localField: "address",
          foreignField: "_id",
          as: "addressDetailsArray"
        }
      },
      {
        $addFields: {
          addressDetails: "$addressDetailsArray"
        }
      },
      { $match: matchConditions },
      {
        $addFields: {
          detailsArray: {
            $objectToArray: "$details"
          }
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
          [sortBy]: sortOrder === "asc" ? -1 : 1
        }
      }
    ]);



    // const filteredAds = await Address.aggregate([
    //   {
    //     $geoNear: {
    //       near: { type: 'Point', coordinates: [22.5726459,88.3638953] },
    //       key:"location",
    //       distanceField: 'distance',
    //       maxDistance: 5000000,
    //       spherical: true,
    //     }
    //   }])

    //  const filteredAds = Ad.aggregate([ 
    //     { $lookup: 
    //       { from: "temp_nearby_addresses", localField: "addressId", foreignField: "_id", as: "address" } 
    //     }
    //     ]);

    //  const filteredAds = await Address.find({location:{$near:{$geometry:{type:"Point",coordinates:[
    //     22.9749730,
    //     88.4345920
    //   ]}}}})

    // console.log("hi", filteredAds)


    // filteredAds.sort((a, b) => b.isFeatured - a.isFeatured)


    if (filteredAds.length === 0) {
      return res.status(NOT_FOUND_CODE).json({
        message: "Ad not found",
        success: false,
      });
    }

    // filteredAds.forEach((element) => {
    //   setAdsViews(element._id);
    // })

    return res.status(SUCCESS_CODE).json({
      success: true,
      total: filteredAds.length,
      ads: filteredAds
    });
  }

  catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error
    });
  }
}



