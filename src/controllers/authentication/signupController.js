import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { BAD_REQUEST_CODE, CREATED_CODE, INTERNAL_SERVER_ERROR_CODE } from "../../config/constant.js"
import Buyer from '../../Models/buyerModel.js'
import sendEmail from '../../email/sendEmail.js'
import Seller from '../../Models/sellerModel.js'


export const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword } = req.body
    const { role } = req.params
    console.log(role)

    if (!role) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "Role required"
      })
    }

    const oldBuyer = await Buyer.findOne({ email: email })
    const oldSeller = await Seller.findOne({ email: email })

    if (oldBuyer || oldSeller) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: "Email id is already exists. Try another"
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

    const token = jwt.sign({ data: email }, process.env.SECRET_KEY, { expiresIn: '30m' })

    try {
      await sendEmail(email, token)
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
        advice: 'Please verify your email at earliest, you have 10 minuets to verify yourself',
        token,
        data: user
      })
    }

    else if (role === 'seller') {
      await Seller.create(user)

      return res.status(CREATED_CODE).json({
        success: true,
        message: 'Account created successfully',
        advice: 'Please verify your email at earliest, you have 10 minuets to verify yourself',
        token,
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