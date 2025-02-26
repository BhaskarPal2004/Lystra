import { z } from 'zod';

export const buyerSchemaValidation = z.object({
    name: z.string().trim().min(3,"Name should have minimum 3 characters"),
    email: z.string().email("Email is of invalid format"),
    password: z.string().min(6, "Password should be atleat 6 characters long")
        .refine((password) => /[A-Z]/.test(password), { message: "Password should contain upper case" })
        .refine((password) => /[a-z]/.test(password), { message: "Password should contain lower case" })
        .refine((password) => /[0-9]/.test(password), { message: "Password should contain number" })
        .refine((password) => /[!@#$%^&*]/.test(password), { message: "Password should contain special character", }),
    
    phoneNumber: z.number().int() 
    .gte(1000000000) 
    .lte(9999999999),
    isVerified: z.optional(z.boolean()),
    profilePicture: z.optional(z.string()),
    interests:  z.optional(z.array(z.string().trim().min(3,"interese must have three character"))),
});