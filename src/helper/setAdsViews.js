import Ad from "../models/adModel.js";

export const setAdsViews = async (adId) => {
  const ad = await Ad.findById(adId);
  ad.performance.views = ad.performance.views + 1;
  await ad.save();
};
