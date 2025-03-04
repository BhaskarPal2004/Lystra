import Ad from "../../models/adModel.js";

export const getFeaturedAds = async(query) => {
    let emptyStringQueryFlag = true
    const tempArray = Object.values(query)

    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i] !== "") {
            emptyStringQueryFlag = false
        }
    }


    if (Object.keys(query).length === 0 || emptyStringQueryFlag) {
        const featuredAds = await Ad.find({ isFeatured: true }).sort({ createdAt:1 })
        return featuredAds
    }
    return null
   

}
