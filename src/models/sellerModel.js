import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    phoneNumber: {
      type: String,
      unique: true,
      default: null,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
      default: null,
    },
    averageRating: {
      type: Number,
      default: null,
    },
    blockedList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blockUser",
        required: true,
      },
    ],
    reports: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "reportUser",
      },
    ],
    isSubscribed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model("seller", sellerSchema);
export default Seller;
