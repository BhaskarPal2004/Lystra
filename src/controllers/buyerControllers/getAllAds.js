import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import { setAdsViews } from "../../helper/setAdsViews.js";
import { findLocalAddressess } from "../../helper/findLocalAddresses.js";
import { getLocationCoords } from "../../helper/getLocationCoords.js";
import findAdsOfThisCategory from "../../helper/findAdsOfThisCategory.js";
import BlockUser from "../../models/blockUserModel.js";


export const getAllAds = async (req, res) => {
  try {
    const userId = req.userId
    const blockedMe = []
    const blockedUsers = []


    const {
      searchKeyword = "",
      searchCategory = "",
      sortBy = "createdAt",
      sortOrder = "asc",
      minPrice = 0,
      maxPrice = Infinity,
      condition = "",
      city = "",
      pageNum = 1
    } = req.query;


    const limit = 9 * 1;

    let longitude = null
    let latitude = null
    let maxDistance = null
    if (city === "") {
      latitude = 22.5726459
      longitude = 88.3638953
      maxDistance = 1000 //(in m)
    }



    else {
      const cityCoordinates = await getLocationCoords(city)
      latitude = cityCoordinates.lat
      longitude = cityCoordinates.lng
      maxDistance = 1000
    }


    let localAddresses = []
    let localAds = []
    let finalAds = []

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
      price: priceFilter,
      isExpire: false
    }

    if (isValidCondition) {
      matchConditions.condition = condition.trim().toLowerCase()
    }




    // function to get localAds
    if (longitude && latitude && maxDistance) {
      localAddresses = await findLocalAddressess(longitude, latitude, maxDistance)
    }


    //function to get ads that match the category 

    const categorizedAds = await findAdsOfThisCategory(searchCategory)

    //block functions
    let temp = await BlockUser.find({ blockerId: userId }, { blockedId: 1 })
    temp.forEach((obj) => {
      blockedUsers.push(obj.blockedId)
    })

    temp = await BlockUser.find({ blockedId: userId }, { blockerId: 1 })
    temp.forEach((obj) => {
      blockedMe.push(obj.blockerId)
    })


    //database query

    const filteredAds = await Ad.aggregate([
      { $match: matchConditions },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: "categoryName"
        }
      },
      {
        $addFields: {
          categoryName: { $arrayElemAt: ["$categoryName.name", 0] }
        }
      },
      {
        $match: {
          $or: [
            { name: new RegExp(searchKeyword.trim(), 'i') },
            { description: new RegExp(searchKeyword.trim(), 'i') },
            { categoryName: new RegExp(searchKeyword.trim(), 'i') }

          ]
        }
      },
      {
        $match: {
          sellerId: { $nin: [...blockedUsers, ...blockedMe] }
        }
      },
      {
        $sort: {
          [sortBy]: sortOrder === "asc" ? -1 : 1
        }
      },
      {
        $skip: (Math.max(1, pageNum) - 1) * limit
      },
      {
        $limit: limit * 1
      }
    ]);




    if (longitude && latitude && maxDistance) {
      filteredAds.map((element) => {
        if (localAddresses.includes(element.address.toString())) {
          localAds.push(element)
        }
      })
    }
    else {
      localAds = filteredAds
    }


    if (categorizedAds.length !== 0) {
      localAds.map((element) => {
        if (categorizedAds.includes(element._id.toString())) {
          finalAds.push(element)
        }
      })
    }

    //sorting based on boost
    finalAds.sort((a, b) => b.boost?.isBoosted - a.boost?.isBoosted)



    if (finalAds.length === 0) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "No ads found"
      })
    }

    setAdsViews(finalAds[0]._id)


    return res.status(SUCCESS_CODE).json({
      success: true,
      total: finalAds.length,
      ads: finalAds,

    });
  }

  catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message
    });
  }
}

