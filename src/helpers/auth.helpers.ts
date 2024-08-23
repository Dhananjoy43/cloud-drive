import { auth } from "@/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        return user;
    } catch { return null };
}
export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id },
        });

        return user;
    } catch { return null };
}


export const currentUser = async () => {
    const session = await auth();

    return session?.user;
};

export const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}