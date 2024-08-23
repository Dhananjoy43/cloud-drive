"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
];

const formSchema = z.object({
    fileName: z.string().min(2, {
        message: "File name must be at least 2 characters."
    }),
    file: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message:
                "The image is too large. Please choose an image smaller than 5 MB."
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message:
                "Please upload a valid image file (JPEG, JPG, PNG, or WebP)."
        })
});

export const UploadImage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileName: "",
            file: undefined
        }
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("fileName", values.fileName);
        try {
            const response = await fetch("/api/images/upload", {
                method: "POST",
                body: formData
            });

            const file = await response.json();

            if (file) {
                toast.success("Image uploaded successfully.");
            }
        } catch (error) {
            toast.error("Error uploading image.");
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"}>Upload</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                    <DialogDescription>
                        Upload an image to Cloud Drive to access it from
                        anywhere.
                    </DialogDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="fileName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="shadcn"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={({
                                    field: { value, onChange, ...fieldProps }
                                }) => (
                                    <FormItem>
                                        <FormLabel>Select Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...fieldProps}
                                                placeholder="Picture"
                                                type="file"
                                                accept="image/*,"
                                                onChange={(event) =>
                                                    onChange(
                                                        event.target.files &&
                                                            event.target
                                                                .files[0]
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
