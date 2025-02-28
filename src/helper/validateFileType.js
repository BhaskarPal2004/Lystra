const validateFile = (extensions) => {
    return (req, file, cb) => {
        extensions.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false)
    }
}

export default validateFile