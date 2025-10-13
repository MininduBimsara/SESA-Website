"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Shield,
    Plus,
    Pencil,
    Trash2,
    Search,
    UserCog,
    Mail,
    Calendar,
    Crown,
} from "lucide-react";

interface Admin {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const AdminAdmins = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch("/api/admin");
            if (response.ok) {
                const data = await response.json();
                setAdmins(data);
            }
        } catch (error) {
            console.error("Error fetching admins:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const url = editingAdmin ? `/api/admin` : "/api/admin";
            const method = editingAdmin ? "PATCH" : "POST";
            const body = editingAdmin
                ? { ...formData, id: editingAdmin.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchAdmins();
                resetForm();
                setShowForm(false);
            } else {
                const error = await response.json();
                alert(error.error || "Failed to save admin");
            }
        } catch (error) {
            console.error("Error saving admin:", error);
            alert("Failed to save admin");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this admin?")) return;

        try {
            const response = await fetch(`/api/admin?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchAdmins();
            } else {
                alert("Failed to delete admin");
            }
        } catch (error) {
            console.error("Error deleting admin:", error);
            alert("Failed to delete admin");
        }
    };

    const handleEdit = (admin: Admin) => {
        setEditingAdmin(admin);
        setFormData({
            name: admin.name,
            email: admin.email,
            password: "",
            role: admin.role,
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingAdmin(null);
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "admin",
        });
    };

    const filteredAdmins = admins.filter(
        (admin) =>
            admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleBadgeColor = (role: string) => {
        switch (role.toLowerCase()) {
            case "superadmin":
                return "bg-purple-100 text-purple-700 border-purple-300";
            case "editor":
                return "bg-blue-100 text-blue-700 border-blue-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
            case "superadmin":
                return <Crown className="w-4 h-4" />;
            case "editor":
                return <Pencil className="w-4 h-4" />;
            default:
                return <UserCog className="w-4 h-4" />;
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Shield className="text-red-600" size={32} />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Admin Management
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Manage admin users and permissions
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                resetForm();
                                setShowForm(!showForm);
                            }}
                            className="flex items-center space-x-2"
                        >
                            <Plus size={20} />
                            <span>Add Admin</span>
                        </Button>
                    </div>
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <Card className="p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {editingAdmin ? "Edit Admin" : "Add New Admin"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="admin@sesa.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password {editingAdmin && "(Leave blank to keep current)"}
                                    </label>
                                    <input
                                        type="password"
                                        required={!editingAdmin}
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role *
                                    </label>
                                    <select
                                        required
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                role: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="editor">Editor</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setShowForm(false);
                                        resetForm();
                                    }}
                                    disabled={submitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting
                                        ? "Saving..."
                                        : editingAdmin
                                        ? "Update Admin"
                                        : "Create Admin"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search admins by name, email, or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Admins List */}
                {loading ? (
                    <Card className="p-12 text-center">
                        <p className="text-gray-600">Loading admins...</p>
                    </Card>
                ) : filteredAdmins.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Shield size={64} className="mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchTerm ? "No admins found" : "No admins yet"}
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm
                                ? "Try adjusting your search terms"
                                : "Create your first admin to get started"}
                        </p>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {filteredAdmins.map((admin) => (
                            <Card key={admin.id} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {admin.name}
                                            </h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getRoleBadgeColor(
                                                    admin.role
                                                )}`}
                                            >
                                                {getRoleIcon(admin.role)}
                                                <span className="capitalize">{admin.role}</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <Mail size={16} />
                                                <span>{admin.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar size={16} />
                                                <span>
                                                    Joined{" "}
                                                    {new Date(admin.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(admin)}
                                        >
                                            <Pencil size={16} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(admin.id)}
                                            className="text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Stats */}
                {!loading && admins.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Admins</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {admins.length}
                                    </p>
                                </div>
                                <Shield className="text-gray-400" size={32} />
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Super Admins</p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {
                                            admins.filter(
                                                (a) => a.role.toLowerCase() === "superadmin"
                                            ).length
                                        }
                                    </p>
                                </div>
                                <Crown className="text-purple-400" size={32} />
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Editors</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {
                                            admins.filter(
                                                (a) => a.role.toLowerCase() === "editor"
                                            ).length
                                        }
                                    </p>
                                </div>
                                <Pencil className="text-blue-400" size={32} />
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAdmins;
