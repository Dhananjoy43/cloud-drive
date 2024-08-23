import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/helpers/auth.helpers";

export async function GET(req: NextRequest) {
    // const user = await currentUser();
    // if (!user?.id) {
    //     return NextResponse.json({
    //         success: false,
    //         data: null,
    //         message: "You are not authenticated"
    //     });
    // }
    const url = req.nextUrl;
    const userId = url.searchParams.get("userId");

    try {
        const images = await db.image.findFirst({
            where: {
                userId: userId!
            }
        });
        console.log(images);


        return NextResponse.json({
            success: true,
            data: images,
            message: "Images fetched successfully"
        }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            data: null,
            message: "Failed to fetch images"
        }, {
            status: 500
        })
    }
}