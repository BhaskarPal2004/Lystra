import jwt from "jsonwebtoken"
import { BAD_REQUEST_CODE, UNAUTHORIZED_CODE } from "../config/constant.js";


const verifyToken = (req, res, next, token, type) => {
    jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
        if (error) {
            return res.status(UNAUTHORIZED_CODE).json({
                success: false,
                message: error.message,
            });
        }
        else {
            if (decoded.type === type) {
                req.userId = decoded.id;
                req.role = decoded.role;
                next();
            } else {
                return res.status(BAD_REQUEST_CODE).json({
                    success: false,
                    message: "Invalid Token Type"
                })
            }
        }
    });
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        return req.headers.authorization.split(' ')[1];
    else
        return null;
}

//middleware functions 
const verifyRegistrationToken = (req, res, next) => {
    const { registrationToken } = req.params;
    verifyToken(req, res, next, registrationToken, 'registrationToken');
}

const verifyAccessToken = (req, res, next) => {
    const token = extractToken(req);
    verifyToken(req, res, next, token, "accessToken");
}

const verifyRefreshToken = (req, res, next) => {
    const token = extractToken(req);
    verifyToken(req, res, next, token, 'refreshToken');
}
const verifyForgotPasswordToken = (req, res, next) => {
    const { forgotPasswordToken } = req.params;
    verifyToken(req, res, next, forgotPasswordToken, 'forgotPasswordToken');
}

export { verifyRegistrationToken, verifyAccessToken, verifyRefreshToken, verifyForgotPasswordToken };