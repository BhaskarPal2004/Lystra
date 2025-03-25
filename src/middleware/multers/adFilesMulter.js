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

export const uploadAdFiles = (req, res, next) => {
    try {
        adFilesUpload.array('adFiles', 6)(req, res, (error) => {
            if (error) {
                let errorMessage = ''
                errorMessage = error.code === 'LIMIT_UNEXPECTED_FILE' ? "Only 6 files can be uploaded at a time" : ''

                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: error,
                    msg: errorMessage
                })
            }
            else next()
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}