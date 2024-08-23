import { uploadOnCloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/helpers/auth.helpers";

type responseProps = {
    public_id: string,
    secure_url: string,
    resource_type: string
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const fileName = formData.get('fileName') as string;
    const file = formData.get('file') as File;
    const folderId = formData.get('folderId') as string;

    const user = await currentUser();

    if (!user?.id) {
        return NextResponse.json({
            success: false,
            message: "You are not authenticated"
        });
    }
    const result = await uploadOnCloudinary(file, "videos");

    if (user?.id && result?.success) {
        // @ts-ignore
        const { public_id, secure_url, format }: responseProps = result?.data;

        try {
            const newImage = await db.video.create({
                data: {
                    userId: user.id,
                    publicId: public_id,
                    folderName: "/",
                    format: format,
                    originalName: fileName || file.name,
                    url: secure_url,
                    size: file.size,
                    folderId: folderId,
                }
            });

            if (!newImage) {
                return NextResponse.json({
                    success: false,
                    message: "Failed to upload video",
                    data: null
                });
            }

            return NextResponse.json({
                success: true,
                message: "Video uploaded successfully",
                data: newImage
            });


        } catch (error) {
            return NextResponse.json({
                success: false,
                message: "Error uploading video",
                data: null
            });
        }

    }

}