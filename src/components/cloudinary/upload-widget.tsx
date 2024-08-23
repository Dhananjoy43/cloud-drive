"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const UploadWidget = () => {
    const [resource, setResource] = useState();
    return (
        <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(result, { widget }) => {
                console.log(result.info);

                setResource(result?.info); // { public_id, secure_url, etc }
            }}
            onQueuesEnd={(result, { widget }) => {
                widget.close();
            }}
        >
            {({ open }) => {
                return (
                    <Button size={"sm"} onClick={() => open()}>
                        Upload
                    </Button>
                );
            }}
        </CldUploadWidget>
    );
};
