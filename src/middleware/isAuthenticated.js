import jwt from "jsonwebtoken"
//function to verify token and add userId to req
const verifyToken = (req, res, next, token, type) => {//this isn't a middleware
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log('err :>> ', err);
            res.status(401).send({
                message: "Token verification failed, possibly the link is invalid or expired",
                success: false
            });
        }
        else {
            if (decoded.type === type) {
                req.body.userId = decoded.id;
                req.body.role = decoded.role;
                next();
            } else {
                res.send({
                    success: false,
                    message: "Invalid Token Type"
                })
            }

        }
    });
}

const extractToken = (req) => { //function to extract token from header
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

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

export { verifyRegistrationToken, verifyAccessToken, verifyRefreshToken };