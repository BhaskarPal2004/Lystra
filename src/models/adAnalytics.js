import mongoose from "mongoose";

const adAnalyticsSchema = new mongoose.Schema({
  adId: {
    type: mongoose.Types.ObjectId,
    ref: 'ad',
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  }
}, { timestamps: true }
);

const AdAnalytics = mongoose.model("adAnalytics", adAnalyticsSchema);

export default AdAnalytics;
