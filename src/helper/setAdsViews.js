import Analytics from "../models/analyticsModel.js";
import { setAnalytics } from "./setAnalytics.js";


export const setAdsViews = async (adId) => {
  const ad = await Analytics.findOne({adId});
  ad.performance.views = ad.performance.views + 1;
  await ad.save();
  setAnalytics(adId)
};


