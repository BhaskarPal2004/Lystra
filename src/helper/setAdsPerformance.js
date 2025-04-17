import Analytics from "../models/analyticsModel.js";
import { setAnalytics } from "./setAnalytics.js";


export const setAdsPerformance = async (adId, views, clicks) => {

  await Analytics.findOneAndUpdate(
    { adId },
    { $inc: { "performance.views": views, "performance.clicks": clicks } },
    { upsert: true, new: true }
  )
  setAnalytics(adId)
};


