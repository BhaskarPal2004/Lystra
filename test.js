import generateToken from "./src/helper/generateToken.js";
import 'dotenv/config'
console.log('object :>> ', generateToken('refreshToken','123456','30m'));