import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/helpers/auth.helpers"

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async signIn({ user }) {
            if (!user.id) {
                return false;
            }
            const existingUser = await getUserById(user.id);

            if (!existingUser) {
                return false;
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.name = token.name;
            }

            return session;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})