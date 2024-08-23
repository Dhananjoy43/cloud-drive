import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (file: File, folder: string) => {
    try {
        if (!file) return null

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        //upload the file on cloudinary
        const results = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: `CloudDrive/${folder}`,
                resource_type: "auto",
            }, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            })
                .end(buffer);
        });

        return {
            success: true,
            data: results
        };

    } catch (error) {
        return { error: "Error uploading to cloudinary" }
    }
}

const deleteFromCloudinary = async (publicId: string[], fileType: any) => {
    try {
        if (!publicId) return null;
        const response = await cloudinary.api.delete_resources(publicId, { type: 'upload', resource_type: fileType });
        if (response.deleted)
            return true
        else return false

    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        return null;
    }
};

const extractPublicId = (cloudinaryUrl: string) => {
    // Check if the provided URL is a Cloudinary URL
    const cloudinaryPattern = /^https?:\/\/res\.cloudinary\.com\/[^/]+\/(?:video|image)\/upload\/v\d+\/(.+?)\.\w+$/;
    const match = cloudinaryUrl.match(cloudinaryPattern);

    if (match && match.length === 2) {
        return match[1]; // Return the extracted public ID
    } else {
        console.error("Invalid Cloudinary URL:", cloudinaryUrl);
        return null; // Return null if the URL doesn't match the expected pattern
    }
}

export { uploadOnCloudinary, deleteFromCloudinary, extractPublicId }