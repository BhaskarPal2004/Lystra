import multer from 'multer'
import path from 'path'
import validateFile from '../../helper/validateFileType.js'
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from '../../config/constant.js'

const adFilesExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4']

const adFileStorage = multer.diskStorage({
    destination: './uploads/adFiles',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const adFilesUpload = multer({
    storage: adFileStorage,
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
    fileFilter: validateFile(adFilesExtensions)
})

export const uploadAdFilesOnUpdate = (req, res, next) => {
    try {
        adFilesUpload.array('adFiles', 4)(req, res, (error) => {
            if (error) {
                const errorMessage = error.code === 'LIMIT_UNEXPECTED_FILE'
                    ? "Only 4 files can be uploaded at a time"
                    : error.message;

                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: errorMessage,
                });
            }

            const newFiles = req.files || [];
            const retainedFiles = req.body.retainedFiles ? JSON.parse(req.body.retainedFiles) : [];

            if (newFiles.length === 0 && retainedFiles.length === 0) {
                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: "At least 1 file must be uploaded.",
                });
            }

            next();
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        });
    }
}
