import multer from 'multer'
import path from 'path'
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from '../../config/constant.js'
import validateFile from '../../helper/validateFileType.js'

const chatImageExtensions = ['image/jpeg', 'image/jpg', 'image/png']

const chatImageStorage = multer.diskStorage({
    destination: './uploads/chatImages',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const chatImageUpload = multer({
    storage: chatImageStorage,
    limits: {
        fileSize: 1024 * 1024 * 10,
        files: 1
    },
    fileFilter: validateFile(chatImageExtensions)
})

export const uploadChatImage = (req, res, next) => {
    try {
        chatImageUpload.single('image')(req, res, (error) => {
            if (error) return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: error.message
            })
            else next()
        })
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}