import { INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Message from "../../models/messagesModel.js";

export const getMessages = async (req, res) => {
    try {
        const receiverId = req.params.receiverId;
        const senderId = req.userId

        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        });

        if (!messages.length) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "No messages to display"
            })
        }

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Messages fetched successfully",
            totalMessages: messages.length,
            data: messages
        });

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        });
    }
};