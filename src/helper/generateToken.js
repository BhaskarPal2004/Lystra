import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


dotenv.config()



function generateToken(type, id, time) {
    const payload = { type, id };//type to identify token type, id to identify token owner
    const secret = process.env.SECRET_KEY;
    const options = { expiresIn: `${time}` };
    return jwt.sign(payload, secret, options);
}
export default generateToken;



const token = generateToken( "accessToken", "67c01726d044c9a91c53a1f7", "30d")
console.log(token)