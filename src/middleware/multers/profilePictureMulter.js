import multer from "multer";
import path from "path";
import fs from "fs";
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
import validateFile from "../../helper/validateFileType.js";

const profilePictureExtensions = ["image/jpeg", "image/jpg", "image/png"];

const uploadDir = "./uploads/profilePictures";

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const profilePictureStorage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const profilePictureUpload = multer({
    storage: profilePictureStorage,
    limits: {
        fileSize: 1024 * 1024 * 10,
        files: 1,
    },
    fileFilter: validateFile(profilePictureExtensions),
});

export const uploadProfilePicture = (req, res, next) => {
    try {
        profilePictureUpload.single("profilePicture")(req, res, (error) => {
            if (error) {
                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: error.message,
                });
            } else {
                next();
            }
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        });
    }
};
