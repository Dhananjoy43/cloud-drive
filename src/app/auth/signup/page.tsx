import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
    title: "Sign Up | Nyxb UI",
    description: "Sign Up for Nyxb UI"
};

export default function SignUpPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Button
                asChild
                variant={"ghost"}
                size={"sm"}
                className="absolute left-4 top-4 md:left-8 md:top-8"
            >
                <Link href="/">
                    <>
                        <ChevronLeft className="mr-1 size-4" />
                        Back
                    </>
                </Link>
            </Button>
            <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
                <div className="flex flex-col gap-2 text-center">
                    {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome to Nyxb UI
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Sign up for an account
                    </p>
                </div>
                <SignupForm />
                <Button asChild variant={"link"} size={"sm"}>
                    <Link href="/auth/signin">
                        Already have an account? Sign In
                    </Link>
                </Button>
            </div>
        </div>
    );
}
