import Ad from "../models/adModel.js";
import Category from "../models/categoryModel.js";

const findAdsOfThisCategory = async (searchCategory) => {
    if (!searchCategory.length) {
        const ads = await Ad.find({})
        const categorizedAds = ads.map(element => element._id.toString())
        return categorizedAds
    }

    const categories = await Category.find({ name: { $in: searchCategory } })
    if (!categories.length) return []

    console.log(categories)
    const categoryIds = categories.map(category => category._id.toHexString())
    const ads = await Ad.find({ category: { $in: categoryIds } })

    const categorizedAds = ads.map(element => element._id.toString())
    return categorizedAds
}

export default findAdsOfThisCategory;