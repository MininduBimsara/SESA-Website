"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import type { Team } from "@/types/team";

interface TeamFormModalProps {
    team: Team | null;
    onClose: () => void;
    onSubmit: (data: Partial<Team>) => void;
}

const TeamFormModal: React.FC<TeamFormModalProps> = ({ team, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        year: team?.year || new Date().getFullYear(),
        name: team?.name || "",
        position: team?.position || "",
        image: team?.image || "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imagePreview, setImagePreview] = useState(team?.image || "");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Team name is required";
        }

        if (!formData.year || formData.year < 2000 || formData.year > 2100) {
            newErrors.year = "Please enter a valid year";
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
        const fileInput = document.getElementById("team-file-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {team ? "Edit Team" : "Create New Team"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Team Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Team Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., SESA Committee"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Year */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year *
                            </label>
                            <input
                                type="number"
                                value={formData.year}
                                onChange={(e) =>
                                    setFormData({ ...formData, year: parseInt(e.target.value) || 0 })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="2025"
                                min="2000"
                                max="2100"
                            />
                            {errors.year && (
                                <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-600">
                                The current year&apos;s team will be shown as &quot;Current Team&quot;
                            </p>
                        </div>

                        {/* Position (Optional) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) =>
                                    setFormData({ ...formData, position: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="e.g., Annual Committee"
                            />
                        </div>

                        {/* Image Upload (Optional) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Team Image (Optional)
                            </label>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mb-4">
                                    <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-200 mx-auto">
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
                                        id="team-file-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="team-file-upload"
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
                                    team ? "Update Team" : "Create Team"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default TeamFormModal;
