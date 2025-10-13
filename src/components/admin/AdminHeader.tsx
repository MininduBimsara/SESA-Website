"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, Search, User, Settings, LogOut, X, TrendingUp, Users } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

interface Notification {
    id: string;
    title: string;
    message: string;
    type: "info" | "warning" | "success" | "error";
    time: string;
    read: boolean;
}

// Mock notifications - Replace with real data later
const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "New Event Created",
        message: "Hackathon 2025 has been published",
        type: "success",
        time: "2 minutes ago",
        read: false,
    },
    {
        id: "2",
        title: "New Blog Post",
        message: "React Best Practices is awaiting review",
        type: "info",
        time: "1 hour ago",
        read: false,
    },
    {
        id: "3",
        title: "Team Update",
        message: "New member added to 2025 team",
        type: "info",
        time: "3 hours ago",
        read: true,
    },
];

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
    const { adminInfo, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
            // Implement global search here
        }
    };

    const handleNotificationClick = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case "success": return "text-green-600 bg-green-50";
            case "warning": return "text-yellow-600 bg-yellow-50";
            case "error": return "text-red-600 bg-red-50";
            default: return "text-blue-600 bg-blue-50";
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left Side - Menu Button & Search */}
                <div className="flex items-center space-x-4 flex-1">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-md">
                        <form onSubmit={handleSearch} className="relative w-full">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search dashboard..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </form>
                    </div>
                </div>

                {/* Right Side - Notifications & Profile */}
                <div className="flex items-center space-x-3">
                    {/* Mobile Search Icon */}
                    <button
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Toggle search"
                    >
                        {showMobileSearch ? <X size={20} /> : <Search size={20} />}
                    </button>

                    {/* Quick Actions */}
                    <div className="hidden lg:flex items-center space-x-2">
                        <Link
                            href="/admin/dashboard"
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                            title="Dashboard"
                        >
                            <TrendingUp size={20} />
                        </Link>
                    </div>

                    {/* Notifications */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Notifications"
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {unreadCount > 9 ? "9+" : unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Notifications
                                    </h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Mark all read
                                        </button>
                                    )}
                                </div>

                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            <Bell size={48} className="mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No notifications</p>
                                        </div>
                                    ) : (
                                        notifications.map((notification) => (
                                            <button
                                                key={notification.id}
                                                onClick={() => handleNotificationClick(notification.id)}
                                                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                                                    !notification.read ? "bg-blue-50/50" : ""
                                                }`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                                                        <Bell size={16} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                    {!notification.read && (
                                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                                                    )}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>

                                <div className="px-4 py-3 border-t border-gray-200 text-center">
                                    <Link
                                        href="/admin/notifications"
                                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        View all notifications
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="User menu"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                {adminInfo?.name?.charAt(0).toUpperCase() || "A"}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-gray-900">
                                    {adminInfo?.name || "Admin"}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {adminInfo?.role || "admin"}
                                </p>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {adminInfo?.name || "Admin User"}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {adminInfo?.email || "admin@sesa.com"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 capitalize">
                                        Role: <span className="font-medium">{adminInfo?.role || "admin"}</span>
                                    </p>
                                </div>

                                <div className="py-2">
                                    <Link
                                        href="/admin/profile"
                                        onClick={() => setShowDropdown(false)}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <User size={16} />
                                        <span>My Profile</span>
                                    </Link>
                                    <Link
                                        href="/admin/settings"
                                        onClick={() => setShowDropdown(false)}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <Settings size={16} />
                                        <span>Settings</span>
                                    </Link>
                                    <Link
                                        href="/admin/admins"
                                        onClick={() => setShowDropdown(false)}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <Users size={16} />
                                        <span>Admin Management</span>
                                    </Link>
                                </div>

                                <div className="border-t border-gray-100 pt-2">
                                    <button
                                        onClick={() => {
                                            setShowDropdown(false);
                                            logout();
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            {showMobileSearch && (
                <div className="md:hidden px-4 pb-3">
                    <form onSubmit={handleSearch} className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search dashboard..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                        />
                    </form>
                </div>
            )}
        </header>
    );
};
