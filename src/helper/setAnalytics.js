import Analytics from "../models/analyticsModel.js"
// import { setConversionRate } from "./setConversionRate.js"
import { setCTR } from "./setCTR.js"

export const setAnalytics = async(adId) => {
    const analytics = await Analytics.findOne({adId:adId})
    // const numberOfOrders = ad.orders.length
    const CTR = setCTR(analytics.performance.views,analytics.performance.clicks)
    // const conversionRate = setConversionRate(numberOfOrders,ad.performance.clicks)
    
    analytics.CTR = CTR
    // analytics.conversionRate = conversionRate
    await analytics.save()

console.log("hello from analytics",adId)
    
}


// Click-Through Rate (CTR):
// Formula: (Total Ad Clicks / Total Ad Impressions) x 100
// Conversion Rate:
// Formula: (Number of Conversions / Number of Ad Clicks) x 100
