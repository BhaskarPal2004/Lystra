import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import sessionsModel from "../../models/sessionModel.js";


const logout = async (req, res) => {
    try {
        const userId = req.userId;

        await sessionsModel.deleteMany({ userId });

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "successfully logged out"
        })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}

export default logout;