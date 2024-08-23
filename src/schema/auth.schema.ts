import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, { message: "Minimum 3 characters is required." }),
    email: z.string().email({ message: "Invalid email." }),
    password: z
        .string()
        .min(5, { message: "Minimum 5 characters is required." })
});

export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email." }),
    password: z.string().min(1, { message: "Password is required." })
});