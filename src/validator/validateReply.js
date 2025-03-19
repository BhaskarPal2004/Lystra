import { z } from 'zod';

export const replyValidation = z.object({
    content: z.string().trim().min(5,"content must have 5 character"), 
});