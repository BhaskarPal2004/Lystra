import generateToken from "../../helper/generateToken.js";
import { SUCCESS_CODE,INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js";
//validity of refresh token was checked in middleware
const regenerateTokens = (req, res) => {
    try {
        res.status(SUCCESS_CODE).send({
            success: true,
            message: "access token generated successfully",
            accessToken: generateToken('accessToken', req.body.userId, '1h'),
            refreshToken: generateToken('refreshToken',req.body.userId, '1d')
        })
    } catch (err) {
        console.log('err :>> ', err);
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: "can't create access token",
        })
    }
}
export default regenerateTokens;