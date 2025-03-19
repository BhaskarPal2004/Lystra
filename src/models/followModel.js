import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  following: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Follow = mongoose.model("follow", followSchema);
export default Follow;
