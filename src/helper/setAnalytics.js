import Ad from "../models/adModel.js"
import { setConversionRate } from "./setConversionRate.js"
import { setCTR } from "./setCTR.js"

export const setAnalytics = async(adId) => {
    const ad = await Ad.findOne({_id:adId})
    const numberOfOrders = ad.orders.length
    const CTR = setCTR(ad.performance.views,ad.performance.clicks)
    const conversionRate = setConversionRate(numberOfOrders,ad.performance.clicks)
    
    ad.analytics.CTR = CTR
    ad.analytics.conversionRate = conversionRate
    await ad.save()

    

    
}


// Click-Through Rate (CTR):
// Formula: (Total Ad Clicks / Total Ad Impressions) x 100
// Conversion Rate:
// Formula: (Number of Conversions / Number of Ad Clicks) x 100
