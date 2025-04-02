import { INTERNAL_SERVER_ERROR_CODE } from "../config/constant.js";

export const typeChange = async (req, res, next) => {
    try {
        req.body.price = Number(req.body.price)
        if (req.body.address) {
            req.body.address = JSON.parse(req.body.address)

        }
        if (req.body.details) {
            req.body.details = JSON.parse(req.body.details)
        }

        next();

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            error: error.message
        });
    }
}