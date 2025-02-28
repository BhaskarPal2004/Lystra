import generateToken from "./src/helper/generateToken.js";
import 'dotenv/config'
console.log('object :>> ', generateToken('refreshToken','67c158fbb37ed5173346628c','30m','buyer'));
