import Analytics from "../models/analyticsModel.js";
import { setAnalytics } from "./setAnalytics.js";


export const setAdsViews = async (adId) => {
  const analytics = await Analytics.findOne({adId});
  analytics.performance.views = analytics.performance.views + 1;
  await analytics.save();
  setAnalytics(adId)
};


