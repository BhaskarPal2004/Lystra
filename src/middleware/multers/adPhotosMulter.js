import multer from 'multer'
import path from 'path'
import validateFile from '../../helper/validateFileType'
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from '../../config/constant'

const adPhotoExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const adPhotoStorage = multer.diskStorage({
    destination: './upload/adPhotos',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const adPhotosUpload = multer({
    storage: adPhotoStorage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: validateFile(adPhotoExtensions)
})

export const uploadAdPhotos = (req, res, next) => {
    try {
        adPhotosUpload.array('adPhoto', 6)(req, res, (error) => {
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