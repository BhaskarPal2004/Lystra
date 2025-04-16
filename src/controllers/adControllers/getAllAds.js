import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import { setAdsViews } from "../../helper/setAdsViews.js";
import { findLocalAddresses } from "../../helper/findLocalAddresses.js";
import { getLocationCoords } from "../../helper/getLocationCoords.js";
import findAdsOfThisCategory from "../../helper/findAdsOfThisCategory.js";
import BlockUser from "../../models/blockUserModel.js";
import { updateAdAnalytics } from "../../helper/updateAdAnalytics.js";


export const getAllAds = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;
    const blockedMe = [];
    const blockedUsers = [];

    const {
      searchKeyword = "",
      searchCategory = [],
      sortBy = "createdAt",
      sortOrder = "asc",
      minPrice = 0,
      maxPrice = Infinity,
      condition = "",
      city = "",
      pageNum = 1,
      lat = 22.5726459,
      lng = 88.3638953
    } = req.query;

    const limit = 9;
    let maxDistance = 10000;
    let latitude = lat
    let longitude = lng

    if (city !== "") {
      const cityCoordinates = await getLocationCoords(city);
      latitude = cityCoordinates.lat;
      longitude = cityCoordinates.lng;
    }

    let localAddresses = [];
    let localAds = [];
    let finalAds = [];

    const conditionArray = ["new", "used", "refurbished"];
    const isValidCondition = conditionArray.includes(condition.trim().toLowerCase());

    let priceFilter = { $gte: 0, $lte: Infinity };
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      priceFilter = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }

    const matchConditions = {
      price: priceFilter
    };

    if (role === 'buyer') {
      matchConditions.isExpire = false;
    }

    if (isValidCondition) {
      matchConditions.condition = condition.trim().toLowerCase();
    }

    if (longitude && latitude && maxDistance) {
      localAddresses = await findLocalAddresses(longitude, latitude, maxDistance, role);
    }

    let categorizedAds = []

    console.log('searchCategory', searchCategory)
    if (searchCategory.length !== 0) {
      categorizedAds = await findAdsOfThisCategory(searchCategory);

      if (categorizedAds.length === 0) {
        return res.status(NOT_FOUND_CODE).json({
          success: false,
          message: "Ad not found"
        })
      }
    }

    let temp = await BlockUser.find({ blockerId: userId }, { blockedId: 1 });
    temp.forEach((obj) => blockedUsers.push(obj.blockedId));

    temp = await BlockUser.find({ blockedId: userId }, { blockerId: 1 });
    temp.forEach((obj) => blockedMe.push(obj.blockerId));

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
        $lookup: {
          from: 'addresses',
          localField: 'address',
          foreignField: '_id',
          as: "adLocation"
        }
      },
      {
        $addFields: {
          adLocation: { $arrayElemAt: ["$adLocation", 0] }
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
      }
    ]);

    if (longitude && latitude && maxDistance) {
      filteredAds.forEach((element) => {
        if (localAddresses.includes(element.address.toString())) {
          localAds.push(element);
        }
      });
    } else {
      localAds = filteredAds;
    }

    if (categorizedAds.length !== 0) {
      localAds.forEach((element) => {
        if (categorizedAds.includes(element._id.toString())) {
          finalAds.push(element);
        }
      });
    } else {
      finalAds = localAds;
    }

    finalAds.sort((a, b) => b.boost?.isBoosted - a.boost?.isBoosted);

    if (role === "seller") {
      finalAds = finalAds.filter(ad => ad.sellerId.toString() === userId.toString());
    }

    const totalCount = finalAds.length;

    const paginatedAds = finalAds.slice((pageNum - 1) * limit, pageNum * limit);

    if (paginatedAds.length === 0) {
      return res.status(NOT_FOUND_CODE).json({
        success: false,
        message: "No ads found",
      });
    }

    setAdsViews(paginatedAds[0]?._id);

    await updateAdAnalytics(paginatedAds[0]?._id, 1, 0);

    return res.status(SUCCESS_CODE).json({
      success: true,
      totalPageAds: paginatedAds.length,
      totalCount,
      isLastPage: pageNum * limit >= totalCount,
      currentPage: pageNum,
      ads: paginatedAds,
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message
    });
  }
};
