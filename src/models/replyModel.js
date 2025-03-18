import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    reviewerId: {
        type: mongoose.Types.ObjectId,
        required:true
    },
    replierId: {
        type: mongoose.Types.ObjectId,
        required:true
    },
    content: {
        type:String,
        required:true
    }
})

const Reply = mongoose.model("reply", replySchema);
export default Reply