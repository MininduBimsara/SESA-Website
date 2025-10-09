"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPageRedirector = () => {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = typeof window !== "undefined" && !!localStorage.getItem("authToken");

        if (isAuthenticated) {
            router.replace("/admin/dashboard");
        } else {
            router.replace("/admin/login");
        }
    }, [router]);

    return null;
};

export default AdminPageRedirector;