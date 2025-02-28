import { INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
import sessionsModel from "../../models/sessionModel.js";
const logout = async (req, res) => {
    const userId = req.userId;
    try {
        await sessionsModel.deleteMany({ userId });
        res.send({
            success: true,
            message: "successfully logged out"
        })
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message
        })
    }
}

export default logout;