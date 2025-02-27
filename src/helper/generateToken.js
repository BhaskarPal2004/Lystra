import jwt from 'jsonwebtoken';
function generateToken(type, id, time) {
    const payload = { type, id };//type to identify token type, id to identify token owner
    const secret = process.env.SECRET_KEY;
    const options = { expiresIn: `${time}` };
    return jwt.sign(payload, secret, options);
}
export default generateToken;