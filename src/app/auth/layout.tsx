import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-full w-full flex justify-center items-center">
            {children}
        </main>
    );
};

export default AuthLayout;
