import bcrypt from 'bcryptjs'

import { BAD_REQUEST_CODE, CREATED_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js"
import sendEmail from '../../email/sendEmail.js'
import Buyer from '../../models/buyerModel.js'
import Seller from '../../models/sellerModel.js'
import generateToken from '../../helper/generateToken.js'


export const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body
    const { role } = req.params

    if (!role) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "Role required"
      })
    }

    const oldBuyer = await Buyer.findOne({
      $or: [
        { email: email },
        { phoneNumber: phoneNumber }
      ]
    })
    const oldSeller = await Seller.findOne({
      $or: [
        { email: email },
        { phoneNumber: phoneNumber }
      ]
    })

    if (oldBuyer || oldSeller) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "Email id or phone number is already exists. Try another"
      })
    }

    if (password !== confirmPassword) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "Password is not matching"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.replace(/\s/g, '').trim(), salt);

    const registrationToken = generateToken('registrationToken', email, '30m', role)

    try {
      const contextData = {
        port: process.env.FRONTEND_PORT,
        token: registrationToken,
        name: name,
        role: role
      };
      const subject = "Verify your email address"
      await sendEmail(email, 'emailVerificationTemplate', contextData, subject);

    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        message: error.message
      })
    }

    const user = {
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber
    }

    if (role === 'buyer') {
      await Buyer.create(user)

      return res.status(CREATED_CODE).json({
        success: true,
        message: 'Account created successfully',
        advice: 'Please verify your email at earliest, you have 30 minutes to verify yourself',
        registrationToken,
        data: user
      })
    }

    else if (role === 'seller') {
      await Seller.create(user)

      return res.status(CREATED_CODE).json({
        success: true,
        message: 'Account created successfully',
        advice: 'Please verify your email at earliest, you have 10 minutes to verify yourself',
        registrationToken,
        data: user
      })
    }

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: error.message
    })
  }
}