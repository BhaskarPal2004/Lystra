import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
    required: true,
  },
  paymentId: {
    type: String,
    default: null,
    required: true,
  },
  subscriptionStartDate: {
    type: Date,
    default: new Date(),
  },
  subscriptionEndDate: {
    type: Date,
    default: () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 30);
      return startDate;
    }
  },
  renewDate: {
    type: Date,
    default: null
  },
  planId: {
    type: mongoose.Types.ObjectId,
    ref: 'plan',
    required: true
  }

}, { timestamps: true });

const Subscription = mongoose.model("subscription", subscriptionSchema);
export default Subscription;
