import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { UploadWidget } from "@/components/cloudinary/upload-widget";
import { UploadImage } from "./_components/upload-image";
import { Images } from "./_components/images";
import { currentUser } from "@/helpers/auth.helpers";

export default async function ImagesPage() {
    const user = await currentUser();

    const res = await fetch(
        `http://localhost:3000/api/images?userId=${user?.id}`
    );
    // const images = await res.json();
    console.log("Res: ", res.json());
    return (
        <ContentLayout title="Images">
            <div className="flex w-full justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Images</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {/* <UploadWidget /> */}
                <UploadImage />
            </div>
            <Images />
            <PlaceholderContent />
        </ContentLayout>
    );
}
