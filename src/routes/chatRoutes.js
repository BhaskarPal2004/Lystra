import express from "express";
import { getMessages } from "../controllers/chatControllers/getMessages.js";
import { verifyAccessToken } from "../middleware/isAuthenticated.js";
import isVerified from "../middleware/isVerified.js";
import { sendMessage } from "../controllers/chatControllers/sendMessage.js";
import { uploadChatImage } from "../middleware/multers/chatImageMulter.js";
import { getChatUsers } from "../controllers/chatControllers/getChatUsers.js";

const chatRoute = express.Router()

chatRoute.get('/get/messages/:receiverId', verifyAccessToken, isVerified, getMessages)
chatRoute.post('/send/message/:receiverId', verifyAccessToken, isVerified, uploadChatImage, sendMessage)
chatRoute.get('/get/users', verifyAccessToken, isVerified, getChatUsers)

export default chatRoute