import { z } from 'zod';
import validator from "validator";

export const logInValidation = z.object({
    email: z.string().email("Email is of invalid format"),
    password: z.string().min(6, "Password should be atleat 6 characters long")
        .refine((password) => /[A-Z]/.test(password), { message: "Password should contain upper case" })
        .refine((password) => /[a-z]/.test(password), { message: "Password should contain lower case" })
        .refine((password) => /[0-9]/.test(password), { message: "Password should contain number" })
        .refine((password) => /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(password), { message: "Password should contain special character" }),

    phoneNumber: z.string().min(10, "number must have 10 digit").refine((validator.isMobilePhone), { message: "invalid number" }),
});