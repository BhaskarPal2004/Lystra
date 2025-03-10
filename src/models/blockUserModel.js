import mongoose from "mongoose";

const blockUserSchema = new mongoose.Schema({
    blockerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    blockedId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

}, { timestamps: true })

const BlockUser = mongoose.model('blockUser', blockUserSchema)
export default BlockUser