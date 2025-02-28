import { SUCCESS_CODE } from "../../config/constant.js"

const updateProfile=(req,res)=>{
    res.status(SUCCESS_CODE).send("UPDATE PROFILE");
}
export default updateProfile;