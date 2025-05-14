import { BAD_REQUEST_CODE, CREATED_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE } from "../../config/constant.js";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";
import fs from 'fs';
import path from 'path';

export const uploadProfilePictureController = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.userId;
        const role = req.role;

        if (!file) {
            console.log("file not found");
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "No files uploaded",
            });
        }

        const user = role === 'buyer'
            ? await Buyer.findById(userId)
            : await Seller.findById(userId);

        if (!user) {
            return res.status(NOT_FOUND_CODE).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete existing profile picture if it exists and is not a default image
        if (user.profilePicture && user.profilePicture.includes("/uploads/profilePictures/")) {
            const filePath = path.join(
                process.cwd(),
                "uploads",
                "profilePictures",
                path.basename(user.profilePicture)
            );

            fs.unlink(filePath, (error) => {
                if (error && error.code !== "ENOENT") {
                    console.error("Error deleting old profile picture:", error);
                }
            });
        }

        user.profilePicture = `http://localhost:3000/uploads/profilePictures/${file.filename}`;
        await user.save();

        return res.status(CREATED_CODE).json({
            success: true,
            message: "Profile picture updated successfully",
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.error("Error in uploadProfilePictureController:", error);
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
};
