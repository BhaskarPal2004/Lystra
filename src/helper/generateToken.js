import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

function generateToken(type, id, time, role) {
    const payload = { type, id, role };
    const secret = process.env.SECRET_KEY;
    const options = { expiresIn: `${time}` };
    return jwt.sign(payload, secret, options);
}
export default generateToken;

