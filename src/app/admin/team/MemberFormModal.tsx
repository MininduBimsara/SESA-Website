"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import type { Member } from "@/types/team";

interface MemberFormModalProps {
    member: Member | null;
    teamId: string;
    onClose: () => void;
    onSubmit: (data: Partial<Member>) => void;
}

const MemberFormModal: React.FC<MemberFormModalProps> = ({ member, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: member?.name || "",
        position: member?.position || "",
        image: member?.image || "",
        email: member?.email || "",
        linkedin: member?.linkedin || "",
        github: member?.github || "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imagePreview, setImagePreview] = useState(member?.image || "");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Member name is required";
        }

        if (!formData.position.trim()) {
            newErrors.position = "Position is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // If there's a selected file, upload it first
            if (selectedFile) {
                setUploadingImage(true);
                try {
                    const uploadedUrl = await uploadImage(selectedFile);
                    onSubmit({ ...formData, image: uploadedUrl });
                } catch (error) {
                    console.error("Error uploading image:", error);
                    setErrors({ ...errors, image: "Failed to upload image" });
                } finally {
                    setUploadingImage(false);
                }
            } else {
                onSubmit(formData);
            }
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.url;
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                setErrors({ ...errors, image: "Please select an image file" });
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, image: "Image size must be less than 5MB" });
                return;
            }

            setSelectedFile(file);
            setErrors({ ...errors, image: "" });

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setFormData({ ...formData, image: url });
        setImagePreview(url);
        setSelectedFile(null); // Clear selected file if URL is entered
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, image: "" });
        setImagePreview("");
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {member ? "Edit Member" : "Add New Member"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Member Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., John Doe"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Position *
                            </label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) =>
                                    setFormData({ ...formData, position: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., President, Vice President, Secretary"
                            />
                            {errors.position && (
                                <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email (Optional)
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., member@example.com"
                            />
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                LinkedIn URL (Optional)
                            </label>
                            <input
                                type="url"
                                value={formData.linkedin}
                                onChange={(e) =>
                                    setFormData({ ...formData, linkedin: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>

                        {/* GitHub */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                GitHub URL (Optional)
                            </label>
                            <input
                                type="url"
                                value={formData.github}
                                onChange={(e) =>
                                    setFormData({ ...formData, github: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="https://github.com/username"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Image (Optional)
                            </label>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mb-4">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mx-auto">
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                            onError={() => setImagePreview("")}
                                        />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={handleRemoveImage}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Remove Image
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Upload Button */}
                            <div className="space-y-3">
                                <div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors"
                                    >
                                        <Upload className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {selectedFile ? selectedFile.name : "Click to upload image"}
                                        </span>
                                    </label>
                                    <p className="mt-1 text-xs text-gray-500 text-center">
                                        PNG, JPG, GIF up to 5MB
                                    </p>
                                </div>

                                {/* OR Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">OR</span>
                                    </div>
                                </div>

                                {/* URL Input */}
                                <div>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={handleImageUrlChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Or paste image URL"
                                    />
                                </div>
                            </div>

                            {errors.image && (
                                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-end pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={uploadingImage}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700"
                                disabled={uploadingImage}
                            >
                                {uploadingImage ? (
                                    <>
                                        <span className="animate-spin mr-2">⏳</span>
                                        Uploading...
                                    </>
                                ) : (
                                    member ? "Update Member" : "Add Member"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default MemberFormModal;
