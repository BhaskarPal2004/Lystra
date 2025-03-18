import Ad from "../models/adModel.js";
import Category from "../models/categoryModel.js";

const findAdsOfThisCategory = async (searchCategory) => {
    if (searchCategory != "") {
        const category = await Category.findOne({ name: searchCategory })
        if(category === null){
            return []
        }
        const categoryId = category._id
        const ads = await Ad.find({ category: categoryId })
        const categorisedAds = ads.map(element => element._id.toString())
        return categorisedAds
    }
    else {
        const ads = await Ad.find({})
        const categorisedAds = ads.map(element => element._id.toString())
        return categorisedAds
    }
}
export default findAdsOfThisCategory;
