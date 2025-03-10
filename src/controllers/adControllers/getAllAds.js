import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";
import { setAdsViews } from "../../helper/setAdsViews.js";
import { findLocalAddressess } from "../../helper/findLocalAddresses.js";
import { setAnalytics } from "../../helper/setAnalytics.js";

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


    const longitude = 22.5726459
    const latitude = 88.3638953
    const maxDistance = 5000000

    let localAddresses = []
    let localAds = []





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
      expiryDate: { $gte: new Date() }
    }

    if (isValidCondition) {
      matchConditions.condition = condition.trim().toLowerCase()
    }
    if(isValidCategory){
      matchConditions.category = searchCategory.trim().toLowerCase()
    }
    

    // function to get localAds

    
    if(longitude && latitude && maxDistance){
     localAddresses = await findLocalAddressess(longitude,latitude,maxDistance)
    }
  

    //database query

    const filteredAds = await Ad.aggregate([
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


    filteredAds.sort((a, b) => b.isFeatured - a.isFeatured)
    
   
    
    if(longitude && latitude && maxDistance){
    filteredAds.map((element)=>{
      if(localAddresses.includes(element.address.toString())){
        localAds.push(element)
      }
      })
    }
    else{
      localAds = filteredAds
    }


    if (localAds.length === 0) {
      return res.status(NOT_FOUND_CODE).json({
        message: "Ad not found",
        success: false,
      });
    }

    localAds.forEach( (element) =>{
      setAdsViews(element._id);
    })

    
    localAds.map((element)=>{
      setAnalytics(element._id)
    })
    return res.status(SUCCESS_CODE).json({
      success: true,
      total: localAds.length,
      ads: localAds
    });
  }

  catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message
    });
  }
}



