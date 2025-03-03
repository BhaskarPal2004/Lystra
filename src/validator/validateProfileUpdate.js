import { z } from 'zod';
import validator from "validator";
import { addressSchemaValidation } from './validateAddress.js';

export const profileUpdateValidation = z.object({
    name: z.optional(z.string().trim().min(3, "Name should have minimum 3 characters")),
    phoneNumber: z.optional(z.string().min(10, "number must have 10 digit").refine((validator.isMobilePhone), { message: "invalid number" })),
    address: z.optional(addressSchemaValidation)
});