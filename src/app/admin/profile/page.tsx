"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, Calendar, Edit2, Save, X } from "lucide-react";
import { useAuth } from "@/lib/useAuth";

const AdminProfile = () => {
    const { adminInfo } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: adminInfo?.name || "",
        email: adminInfo?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleSave = async () => {
        // Implement profile update logic here
        console.log("Saving profile:", formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: adminInfo?.name || "",
            email: adminInfo?.email || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setIsEditing(false);
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <User className="text-blue-600" size={32} />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                                <p className="text-gray-600 mt-1">Manage your account information</p>
                            </div>
                        </div>
                        {!isEditing && (
                            <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
                                <Edit2 size={16} />
                                <span>Edit Profile</span>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Profile Info Card */}
                <Card className="p-6 mb-6">
                    <div className="flex items-start space-x-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {adminInfo?.name?.charAt(0).toUpperCase() || "A"}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {adminInfo?.name || "Admin User"}
                                        </h2>
                                        <p className="text-gray-600 mt-1">{adminInfo?.email || "admin@sesa.com"}</p>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <Shield size={16} className="text-blue-600" />
                                            <span className="capitalize font-medium">{adminInfo?.role || "admin"}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={16} className="text-gray-400" />
                                            <span>Joined {new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Change Password Card */}
                {isEditing && (
                    <Card className="p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={(e) =>
                                        setFormData({ ...formData, currentPassword: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) =>
                                            setFormData({ ...formData, newPassword: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">
                                Leave password fields empty if you don&apos;t want to change your password.
                            </p>
                        </div>
                    </Card>
                )}

                {/* Action Buttons */}
                {isEditing && (
                    <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                            <X size={16} />
                            <span>Cancel</span>
                        </Button>
                        <Button onClick={handleSave} className="flex items-center space-x-2">
                            <Save size={16} />
                            <span>Save Changes</span>
                        </Button>
                    </div>
                )}

                {/* Account Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Account Status</p>
                                <p className="text-2xl font-bold text-green-600">Active</p>
                            </div>
                            <Shield className="text-green-400" size={32} />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Last Login</p>
                                <p className="text-lg font-bold text-gray-900">Today</p>
                            </div>
                            <Calendar className="text-blue-400" size={32} />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Role</p>
                                <p className="text-lg font-bold text-gray-900 capitalize">
                                    {adminInfo?.role || "admin"}
                                </p>
                            </div>
                            <User className="text-purple-400" size={32} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
