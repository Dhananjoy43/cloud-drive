import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/schema/auth.schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const validatedFields = signInSchema.safeParse(reqBody);

    if (!validatedFields.success) {
        return NextResponse.json({
            success: false,
            message: "Invalid fields",
            data: null
        },
            {
                status: 400
            });
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,

            redirect: false
        });

        return NextResponse.json({
            success: true,
            message: "Signin successful",
            data: null
        },
            {
                status: 200
            })
    } catch (error: any) {
        if (error instanceof AuthError) {
            // Handle auth errors
            switch (error.type) {
                case "CredentialsSignin": return NextResponse.json({
                    success: false,
                    message: "Invalid credentials",
                    data: null
                },
                    {
                        status: 500
                    })

                default:
                    return NextResponse.json({
                        success: false,
                        message: "Something went wrong",
                        data: null
                    },
                        {
                            status: 500
                        })
            }
        }
        throw error;
    }
}