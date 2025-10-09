"use client";

import { usePathname } from "next/navigation";
import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    // Disable Layout for Admin Login
    const pathname = usePathname();
    const hideGlobalLayout = pathname.startsWith("/admin/login");

    return (
        <div>
            {!hideGlobalLayout && <nav>Admin Nav</nav>}
            {children}
            {!hideGlobalLayout && <footer>Admin Footer</footer>}
        </div>
    )
}

export default AdminLayout