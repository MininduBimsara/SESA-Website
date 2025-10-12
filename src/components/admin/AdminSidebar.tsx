"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    Newspaper,
    Users,
    FileText,
    Settings,
    LogOut,
    X,
    Shield,
} from "lucide-react";
import { useAuth } from "@/lib/useAuth";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Events",
        href: "/admin/events",
        icon: Calendar,
    },
    {
        title: "News",
        href: "/admin/news",
        icon: Newspaper,
    },
    {
        title: "Team",
        href: "/admin/team",
        icon: Users,
    },
    {
        title: "Blogs",
        href: "/admin/blogs",
        icon: FileText,
    },
    {
        title: "Admins",
        href: "/admin/admins",
        icon: Shield,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export const AdminSidebar = ({ isOpen, onClose }: SidebarProps) => {
    const pathname = usePathname();
    const { adminInfo, logout } = useAuth();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white w-64 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Header */}
                    <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold">SESA Admin</h1>
                            <p className="text-xs text-gray-400 mt-1">Control Panel</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* User Info */}
                    {adminInfo && (
                        <div className="p-4 border-b border-gray-800 bg-gray-800/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
                                    {adminInfo.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {adminInfo.name}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate capitalize">
                                        {adminInfo.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Menu */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-3">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className={`
                        flex items-center space-x-3 px-3 py-2.5 rounded-lg
                        transition-colors duration-200
                        ${isActive
                                                    ? "bg-blue-600 text-white"
                                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                                }
                      `}
                                        >
                                            <Icon size={20} />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-800">
                        <button
                            onClick={logout}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                text-red-400 hover:bg-red-500/10 hover:text-red-300
                transition-colors duration-200"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
