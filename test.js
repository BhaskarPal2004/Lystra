import generateToken from "./src/helper/generateToken.js";
import 'dotenv/config'
console.log('object :>> ', generateToken('refreshToken','67c13be11fc7b4ab741d12dc','30m','buyer'));
