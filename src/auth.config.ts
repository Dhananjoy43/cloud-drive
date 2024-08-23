import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail, verifyPassword } from "./helpers/auth.helpers"
import { signInSchema } from "./schema/auth.schema"


export default {
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    providers: [Credentials({
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
            const validatedFields = signInSchema.safeParse(credentials);

            if (validatedFields.success) {
                const { email, password } = validatedFields.data;

                const user = await getUserByEmail(email);

                if (!user || !user.password) return null;

                const isValidPassword = await verifyPassword(password, user.password);

                if (isValidPassword) return user;
            }

            return null;
        },
    })]
} satisfies NextAuthConfig