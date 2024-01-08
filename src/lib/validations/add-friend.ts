import {z} from 'zod';

//zod define schemas that are validating the user input

export const addFriendValidator = z.object({
    email: z.string().email()
})
