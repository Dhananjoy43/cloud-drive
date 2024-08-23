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
import { signUpSchema } from "@/schema/auth.schema";

type FormData = z.infer<typeof signUpSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onSubmit(_data: FormData) {
        setIsLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(_data)
        });

        const signInResult = await res.json();
        setIsLoading(false);

        if (!signInResult?.ok) {
            return toast.error(
                signInResult?.message || "Something went wrong.",
                {
                    description:
                        "Your sign in request failed. Please try again."
                }
            );
        }

        return toast.success(
            signInResult?.message || "Registration successful",
            {
                description:
                    "You have successfully registered to Cloud Drive. Login to access your dashboard."
            }
        );
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
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
