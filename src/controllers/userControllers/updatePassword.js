import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, BAD_REQUEST_CODE } from "../../config/constant.js";
import bcrypt from "bcryptjs";
import Buyer from "../../models/buyerModel.js";
import Seller from "../../models/sellerModel.js";


export const updatePassword = async (req, res) => {
    try {
      const userId = req.userId

      const { oldPassword, newPassword, confirmNewPassword } = req.body
  
      if (Object.keys(req.body).length > 3)
        throw new Error("Extra fields");
  
      const user = await Buyer.findById(userId, { password: 1, name: 1, email: 1 }) || await Seller.findById(userId, { password: 1, name: 1, email: 1 })
  
      const compareOldPassword = bcrypt.compareSync(oldPassword, user.password);
  
      if (!compareOldPassword) {
        return res.status(BAD_REQUEST_CODE).json({
          success: false,
          message: "Old Password is not matching"
        })
      }
  
      const compareNewPassword = await bcrypt.compare(newPassword, user.password);
  
      if (compareNewPassword) {
        return res.status(BAD_REQUEST_CODE).json({
          success: false,
          message: "New password must be different from Old password"
        })
      }
  
    //   const userDetails = {
    //     userName: user.userName,
    //     email: user.email,
    //     password: newPassword?.replace(/\s/g, '').trim(),
    //     confirmPassword: confirmNewPassword
    //   }
  
    //   const validUser = userSchemaValidation.safeParse(userDetails)
  
    //   if (!validUser.success) {
    //     return res.status(BAD_REQUEST_CODE).json({
    //       success: false,
    //       message: `${validUser.error.issues[0].message} --> ${validUser.error.issues[0].path}`
    //     })
    //   }
  
    //   passwordRegexValidation(newPassword?.replace(/\s/g, '').trim())
  
      if (newPassword.trim() !== confirmNewPassword.trim()) {
        return res.status(BAD_REQUEST_CODE).json({
          success: false,
          message: "New password is not matching with confirm password"
        })
      }
      console.log("new password",newPassword)
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword.trim(), salt);
  
      user.password = newHashedPassword
      await user.save()
  
      return res.status(SUCCESS_CODE).json({
        success: true,
        message: "Password updated successfully"
      })

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
          success: false,
          message: error.message
        })
      }
    }
