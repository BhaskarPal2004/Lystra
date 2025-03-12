import Category from "../models/categoryModel.js"

export const createNewCategory = async(category) => {
    const existingAd = await Category.findOne({name:category})
    if(existingAd){
        return existingAd._id
    }
    const newCategory = await Category.create({name:category})
    return newCategory._id
}