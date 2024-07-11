import { z } from "zod"

export const UserFormValidation = z.object({
    name: z.string()
        .min(4, "Name must be at least 4 characters.")
        .max(10, "Name must be at most 10 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().refine((phone) => /^\+\d[1-9]{10,15}$/.test(phone), 'Invalid phone number')
  })