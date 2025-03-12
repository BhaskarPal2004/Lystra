import otpGenerator from 'otp-generator'
import Otp from '../models/otpModel.js';


export const generateOtp = async (userId) => {
    try {
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        let sameOtp = await Otp.findOne({ otp })

        while (sameOtp) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
            sameOtp = await Otp.findOne({ otp })
        }

        await Otp.create({ userId, otp })

        return otp

    } catch (error) {
        throw new Error(error.message);
    }
}