import Analytics from "../models/analyticsModel.js"
import Order from "../models/orderModel.js"
import { setConversionRate } from "./setConversionRate.js"
import { setCTR } from "./setCTR.js"

export const setAnalytics = async (adId) => {
    const analytics = await Analytics.findOne({ adId: adId })
    const successfulOrders = await Order.find({ adId, paymentStatus: "paid" })
    const CTR = setCTR(analytics.performance.views, analytics.performance.clicks)
    const conversionRate = setConversionRate(successfulOrders.length, analytics.performance.clicks)

    analytics.CTR = CTR
    analytics.conversionRate = conversionRate
    await analytics.save()


}


// Click-Through Rate (CTR):
// Formula: (Total Ad Clicks / Total Ad Impressions) x 100
// Conversion Rate:
// Formula: (Number of Conversions / Number of Ad Clicks) x 100
