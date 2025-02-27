import generateToken from "./src/helper/generateToken.js";
import 'dotenv/config'
console.log('object :>> ', generateToken('registrationToken','buyer0@itobuz.com','30m','buyer'));
