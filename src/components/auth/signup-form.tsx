"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const signUpSchema = z.object({
    fullName: z
        .string()
        .min(3, { message: "Minimum 3 characters is required." }),
    username: z
        .string()
        .min(3, { message: "Minimum 3 characters is required." }),
    email: z.string().email({ message: "Invalid email." }),
    password: z
        .string()
        .min(5, { message: "Minimum 5 characters is required." })
});
type FormData = z.infer<typeof signUpSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: ""
        }
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onSubmit(_data: FormData) {
        setIsLoading(true);

        // TODO: Add signin using preferred provider
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(_data)
            }
        );

        console.log(await res.json());

        const signInResult = { ok: true };
        setIsLoading(false);

        if (!signInResult?.ok) {
            return toast.error("Something went wrong.", {
                description: "Your sign in request failed. Please try again."
            });
        }

        return toast.success("Check your email", {
            description:
                "We sent you a login link. Be sure to check your spam too."
        });
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="name@example.com"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="name"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="username"
                                            placeholder="Username@123"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="username"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            placeholder="name@example.com"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="password"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isLoading}>
                            {isLoading && (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                            )}
                            Sign Up with Email
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
