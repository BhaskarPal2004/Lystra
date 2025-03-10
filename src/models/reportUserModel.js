import mongoose from "mongoose";

const reportUserSchema = new mongoose.Schema({
    reporterId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reportedId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        default: ''
    }
})

const ReportUser = mongoose.model('reportUser', reportUserSchema)
export default ReportUser