import AdAnalytics from "../models/adAnalytics.js";

export const updateAdAnalytics = async (adId, views, clicks) => {

  try {
    const today = new Date().toISOString().split('T')[0];

    // const time = new Date

    console.log();


    await AdAnalytics.findOneAndUpdate(
      { adId, date: today },
      { $inc: { views, clicks } },
      { upsert: true, new: true }
    )
  }
  catch (error) {
    throw new Error(error.message);
  }
}