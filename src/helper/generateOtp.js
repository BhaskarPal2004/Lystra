import otpGenerator from 'otp-generator'
import Otp from '../models/otpModel.js';


export const generateOtp = async (email) => {
    try {
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        await Otp.create({ email, otp })

    } catch (error) {
        throw new Error(error.message);
    }
}