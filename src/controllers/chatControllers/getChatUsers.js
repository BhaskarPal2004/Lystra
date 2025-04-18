
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js"
import Buyer from "../../models/buyerModel.js";
import Message from "../../models/messagesModel.js"
import Seller from "../../models/sellerModel.js";

export const getChatUsers = async (req, res) => {
    try {
        const userId = req.userId;
        const userSet = new Set();


        const messages = await Message.find({
            $or: [
                { senderId: userId },
                { receiverId: userId },
            ],
        });


        messages.forEach((message) => {
            if (message.senderId.toString() === userId) {
                userSet.add(message.receiverId.toString());
            } else {
                userSet.add(message.senderId.toString());
            }
        });

        const uniqueIds = [...userSet];
        const infoObject = { name: 1, email: 1, profilePicture: 1 };


        const [buyerDetails, sellerDetails] = await Promise.all([
            Buyer.find({ _id: { $in: uniqueIds } }, infoObject).lean(),
            Seller.find({ _id: { $in: uniqueIds } }, infoObject).lean(),
        ]);

        const userDetails = [...buyerDetails, ...sellerDetails];

        const usersWithLastMessages = await Promise.all(userDetails.map(async (user) => {
            const lastMessage = await Message.findOne({
                $or: [
                    { senderId: userId, receiverId: user._id },
                    { senderId: user._id, receiverId: userId }
                ]
            }).sort({ createdAt: -1 }).lean();

            return {
                ...user,
                lastMessage: lastMessage?.text || null,
                lastMessageTime: lastMessage?.createdAt || null
            };
        }));

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: 'Users fetched successfully',
            totalChatUsers: usersWithLastMessages.length,
            data: usersWithLastMessages
        });

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        });
    }
};
