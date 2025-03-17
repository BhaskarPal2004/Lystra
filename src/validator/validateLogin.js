import { z } from 'zod';

export const logInValidation = z.object({
    email: z.string()
        .email("Invalid Email format"),
        
    password: z.string()
        .min(6, "Password should be at least 6 characters long")
        .refine((password) => /[A-Z]/.test(password), { message: "Password should contain upper case" })
        .refine((password) => /[a-z]/.test(password), { message: "Password should contain lower case" })
        .refine((password) => /[0-9]/.test(password), { message: "Password should contain number" })
        .refine((password) => /[-._!"`'#%&,:;<>=@{}~$()*+/?[\]^|]+/.test(password), { message: "Password should contain special character" }),
});