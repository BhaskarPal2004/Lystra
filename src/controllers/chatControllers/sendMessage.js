import { CREATED_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
import { getReceiverSocketId, io } from "../../config/socket.js";
import Message from "../../models/messagesModel.js";

export const sendMessage = async (req, res) => {
    try {
        const text = req.body.text
        const image = req.file

        const receiverId = req.params.receiverId;
        const senderId = req.userId;

        let imageUrl;
        if (image) imageUrl = `http://localhost:3000/uploads/chatImages/${image.filename}`

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(CREATED_CODE).json({
            success: true,
            message: "Message send successfully",
            data: newMessage
        });

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        });
    }
};