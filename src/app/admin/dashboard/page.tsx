"use client";

import React from "react";
import { useAuth } from "@/lib/useAuth";
import { Card } from "@/components/ui/card";
import {
    Calendar,
    Newspaper,
    Users,
    TrendingUp,
    Activity,
    Clock,
} from "lucide-react";

const AdminDashboard = () => {
    const { isLoading, adminInfo } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Welcome back, {adminInfo?.name}! 👋
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Events */}
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    Total Events
                                </p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                                <p className="text-xs text-green-600 mt-2 flex items-center">
                                    <TrendingUp size={12} className="mr-1" />
                                    0% from last month
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Calendar className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </Card>

                    {/* News Articles */}
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    News Articles
                                </p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                                <p className="text-xs text-green-600 mt-2 flex items-center">
                                    <TrendingUp size={12} className="mr-1" />
                                    0% from last month
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Newspaper className="text-green-600" size={24} />
                            </div>
                        </div>
                    </Card>

                    {/* Team Members */}
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    Team Members
                                </p>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                                <p className="text-xs text-gray-500 mt-2 flex items-center">
                                    <Activity size={12} className="mr-1" />
                                    Active members
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <Users className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </Card>

                    {/* Your Role */}
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    Your Role
                                </p>
                                <p className="text-2xl font-bold text-gray-900 capitalize">
                                    {adminInfo?.role}
                                </p>
                                <p className="text-xs text-gray-500 mt-2 flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    Full access
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                                🛡️
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <Card className="lg:col-span-2 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {/* Empty State */}
                            <div className="text-center py-12 text-gray-500">
                                <Activity size={48} className="mx-auto mb-4 opacity-50" />
                                <p>No recent activity to display</p>
                                <p className="text-sm mt-2">
                                    Your latest actions will appear here
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Info */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Quick Info
                        </h2>
                        <div className="space-y-4">
                            <div className="pb-4 border-b border-gray-100">
                                <p className="text-sm text-gray-600 mb-1">Name</p>
                                <p className="font-semibold text-gray-900">{adminInfo?.name}</p>
                            </div>
                            <div className="pb-4 border-b border-gray-100">
                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                <p className="font-semibold text-gray-900 text-sm break-all">
                                    {adminInfo?.email}
                                </p>
                            </div>
                            <div className="pb-4 border-b border-gray-100">
                                <p className="text-sm text-gray-600 mb-1">Role</p>
                                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full capitalize">
                                    {adminInfo?.role}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Admin ID</p>
                                <p className="font-mono text-xs text-gray-700 break-all">
                                    {adminInfo?.id}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* System Status */}
                <Card className="p-6 mt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        System Status
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Database
                                </p>
                                <p className="text-xs text-gray-500">Connected</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">API</p>
                                <p className="text-xs text-gray-500">Operational</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Authentication
                                </p>
                                <p className="text-xs text-gray-500">Active</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
