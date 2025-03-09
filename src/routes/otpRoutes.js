import express from "express";
import { verifyOtp } from "../controllers/otpControllers/verifyOtp.js";
import { resendOtp } from "../controllers/otpControllers/resendOtp.js";

const otpRouter = express.Router()

otpRouter.post('/verify/otp/:otpToken', verifyOtp)
otpRouter.post('/resend/otp/:otpToken', resendOtp)


export default otpRouter