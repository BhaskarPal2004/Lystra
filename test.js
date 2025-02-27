import generateToken from "./src/helper/generateToken.js";
import 'dotenv/config'
console.log('object :>> ', generateToken('refreshToken','12345678','30m','buyer'));