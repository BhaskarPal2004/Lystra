import { z } from 'zod';

export const addressSchemaValidation = z.object({
    line1: z.string({ required_error: "address is required" }).trim().min(6, "address should contain 6 character"),
    line2: z.optional(z.string().trim().min(3, "address should contain 3 character")),
    state: z.string().trim().min(3, "state name have three character"),
    city: z.string().trim().min(3, "city name have three character"),
    landMark: z.optional(z.string().trim().min(5, "land mark must have 5 character")),
    country: z.string().trim().min(3, "country name must have three character"),
    pinCode: z.number().int().gte(100000).lte(999999)
});

export const updateAddressSchemaValidation = z.object({
    line1: z.optional(z.string().trim().min(6, "address should contain 6 character")),
    line2: z.optional(z.string().trim().min(3, "address should contain 3 character")),
    state: z.optional(z.string().trim().min(3, "state name have three character")),
    city: z.optional(z.string().trim().min(3, "city name have three character")),
    landMark: z.optional(z.string().trim().min(5, "land mark must have 5 character")),
    country: z.optional(z.string().trim().min(3, "country name must have three character")),
    pinCode: z.optional(z.number().int().gte(100000).lte(999999))
})