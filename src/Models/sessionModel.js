import mongoose from "mongoose";

const sessionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

}, { timestamps: true })

const sessionsModel = mongoose.model('sessions', sessionsSchema)
export default sessionsModel