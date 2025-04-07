import { z } from 'zod';
import validator from "validator";

export const signUpValidation = z.object({
    name: z.string({ required_error: "Name is required" }).trim().min(3, "Name should have minimum 3 characters"),
    email: z.string({ required_error: "Email is required" }).email("Email is of invalid format"),
    phoneNumber: z.string().min(10, "number must have 10 digit").refine((validator.isMobilePhone), { message: "invalid number" }),
    password: z.string().min(6, "Password should be atleat 6 characters long")
        .refine((password) => /[A-Z]/.test(password), { message: "Password should contain upper case" })
        .refine((password) => /[a-z]/.test(password), { message: "Password should contain lower case" })
        .refine((password) => /[0-9]/.test(password), { message: "Password should contain number" })
        .refine((password) => /[-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|]+/.test(password), { message: "Password should contain special character" }),

    confirmPassword: z.string(),
}).strict();