import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, hashPassword } from "@/helpers/auth.helpers";
import { db } from "@/lib/db";
import { signUpSchema } from "@/schema/auth.schema";

export async function POST(request: NextRequest, response: NextResponse) {
    const reqBody = await request.json();
    const validatedFields = signUpSchema.safeParse(reqBody);

    if (!validatedFields.success) {
        return NextResponse.json({
            success: false,
            message: "Invalid fields",
            data: null
        });
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return NextResponse.json({
            success: false,
            message: "Email already exists",
            data: null
        }, {
            status: 400
        })
    }

    try {
        const user = await db.user.create({
            data: {
                name,
                email,
                password: await hashPassword(password),
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Failed to create user",
                data: null
            }, {
                status: 501
            })
        }

        return NextResponse.json({
            success: true,
            message: "Registration successful",
            data: user
        }, {
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error registering user",
            data: null
        }, {
            status: error?.status || 500
        })
    }
}