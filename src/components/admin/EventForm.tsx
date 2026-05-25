"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Upload } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Event } from "@/types/event";

// Custom styles for DatePicker
const datePickerCustomStyles = `
  .react-datepicker-wrapper { width: 100%; }
  .react-datepicker__input-container { width: 100%; }
  .react-datepicker { font-family: inherit; border: 1px solid #e5e7eb; border-radius: 0.5rem; }
  .react-datepicker__header { background-color: #3b82f6; border-bottom: none; padding-top: 0.5rem; }
  .react-datepicker__current-month, .react-datepicker__day-name { color: white; }
  .react-datepicker__day--selected, .react-datepicker__day--in-range { background-color: #3b82f6; }
  .react-datepicker__day:hover { background-color: #dbeafe; }
`;

interface EventFormProps {
    event?: Event | null;
    onClose: () => void;
    onSubmit: (event: Event) => void;
}

export const EventForm = ({ event, onClose, onSubmit }: EventFormProps) => {
    type FormData = Omit<Event, "id" | "createdAt" | "updatedAt"> & {
        startDate?: Date | null;
        endDate?: Date | null;
        startTime?: Date | null;
        endTime?: Date | null;
    };

    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        longDescription: "",
        date: "",
        time: "",
        location: "",
        image: "",
        status: "upcoming",
        category: "workshop",
        participants: undefined,
        registrationLink: "",
        featured: false,
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imagePreview, setImagePreview] = useState<string>("");
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        if (event) {
            // Parse date if it exists
            let startDate = null;
            let endDate = null;
            if (event.date) {
                const dates = event.date.split(" - ");
                if (dates[0]) startDate = new Date(dates[0]);
                if (dates[1]) endDate = new Date(dates[1]);
            }

            // Parse time if it exists
            let startTime = null;
            let endTime = null;
            if (event.time) {
                const times = event.time.split(" - ");
                if (times[0]) {
                    const today = new Date();
                    const [hours, minutes] = times[0].trim().split(":");
                    startTime = new Date(today.setHours(parseInt(hours), parseInt(minutes)));
                }
                if (times[1]) {
                    const today = new Date();
                    const [hours, minutes] = times[1].trim().split(":");
                    endTime = new Date(today.setHours(parseInt(hours), parseInt(minutes)));
                }
            }

            setFormData({
                ...event,
                longDescription: event.longDescription || "",
                time: event.time || "",
                location: event.location || "",
                image: event.image || "",
                participants: event.participants,
                registrationLink: event.registrationLink || "",
                startDate,
                endDate,
                startTime,
                endTime,
            });

            if (event.image) {
                setImagePreview(event.image);
            }
        }
    }, [event]);

    // Calculate status based on dates
    const calculateStatus = (startDate: Date | null, endDate: Date | null): "upcoming" | "ongoing" | "past" => {
        if (!startDate) return "upcoming";

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = endDate ? new Date(endDate) : new Date(startDate);
        end.setHours(23, 59, 59, 999);

        if (now < start) return "upcoming";
        if (now > end) return "past";
        return "ongoing";
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }
        if (!formData.startDate) {
            newErrors.date = "Start date is required";
        }
        if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
            newErrors.endDate = "End date must be after start date";
        }
        if (formData.registrationLink && !isValidUrl(formData.registrationLink)) {
            newErrors.registrationLink = "Please enter a valid URL";
        }
        if (!formData.location?.trim()) {
            newErrors.location = "Location is required";
        }
        if (!formData.startTime) {
            newErrors.time = "Start time is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const formatDate = (start: Date | null, end: Date | null): string => {
        if (!start) return "";

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const startStr = start.toLocaleDateString('en-US', options);
        if (end && end.getTime() !== start.getTime()) {
            const endStr = end.toLocaleDateString('en-US', options);
            return `${startStr} - ${endStr}`;
        }
        return startStr;
    };

    const formatTime = (start: Date | null, end: Date | null): string => {
        if (!start) return "";

        const options: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };

        const startStr = start.toLocaleTimeString('en-US', options);
        if (end) {
            const endStr = end.toLocaleTimeString('en-US', options);
            return `${startStr} - ${endStr}`;
        }
        return startStr;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            // Format dates and times
            const dateStr = formatDate(formData.startDate || null, formData.endDate || null);
            const timeStr = formatTime(formData.startTime || null, formData.endTime || null);

            // Calculate automatic status based on dates
            const autoStatus = calculateStatus(formData.startDate || null, formData.endDate || null);

            const submitData = {
                ...formData,
                date: dateStr,
                time: timeStr,
                status: autoStatus, // Override with auto-calculated status
            };

            // Remove temporary date/time fields
            delete submitData.startDate;
            delete submitData.endDate;
            delete submitData.startTime;
            delete submitData.endTime;

            const url = event ? `/api/events/${event.id}` : "/api/events";
            const method = event ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                const data = await response.json();
                onSubmit(data);
                onClose();
            } else {
                const error = await response.json();
                alert(error.error || "Failed to save event");
            }
        } catch (error) {
            console.error("Error saving event:", error);
            alert("An error occurred while saving the event");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (name === "participants") {
            setFormData((prev) => ({
                ...prev,
                [name]: value ? parseInt(value) : undefined,
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploadingImage(true);

        try {
            // Convert to base64 for preview and storage
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setFormData((prev) => ({ ...prev, image: base64String }));
                setUploadingImage(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
            setUploadingImage(false);
        }
    };

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setFormData((prev) => ({
            ...prev,
            startDate: start,
            endDate: end
        }));
        if (errors.date) {
            setErrors((prev) => ({ ...prev, date: "" }));
        }
    };

    const handleTimeChange = (time: Date | null, field: 'startTime' | 'endTime') => {
        setFormData((prev) => ({ ...prev, [field]: time }));
        if (errors.time) {
            setErrors((prev) => ({ ...prev, time: "" }));
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: datePickerCustomStyles }} />
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <Card className="w-full max-w-4xl p-6 my-8 max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {event ? "Edit Event" : "Add New Event"}
                            </h3>
                            <p className="text-gray-600 mt-1">
                                {event ? "Update event information" : "Create a new campus event"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Event Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="e.g., RealHack 5.0"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Short Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Brief description for event cards"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Long Description */}
                        <div>
                            <label
                                htmlFor="longDescription"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Long Description
                            </label>
                            <textarea
                                id="longDescription"
                                name="longDescription"
                                value={formData.longDescription}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Detailed description for event page"
                            />
                        </div>

                        {/* Date Picker - Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Date *
                                </label>
                                <div className="relative">
                                    <DatePicker
                                        selected={formData.startDate}
                                        onChange={handleDateChange}
                                        startDate={formData.startDate}
                                        endDate={formData.endDate}
                                        selectsRange
                                        minDate={new Date()}
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText="Select date range"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.date ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                </div>
                                {errors.date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                                )}
                                {errors.endDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Time *
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <DatePicker
                                            selected={formData.startTime}
                                            onChange={(time: Date | null) => handleTimeChange(time, 'startTime')}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Start"
                                            dateFormat="h:mm aa"
                                            placeholderText="Start time"
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.time ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                    </div>
                                    <div>
                                        <DatePicker
                                            selected={formData.endTime}
                                            onChange={(time: Date | null) => handleTimeChange(time, 'endTime')}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="End"
                                            dateFormat="h:mm aa"
                                            placeholderText="End time"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                {errors.time && (
                                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                                )}
                            </div>
                        </div>

                        {/* Location - Full Width */}
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Location *
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.location ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="e.g., Faculty of Science, University of Ruhuna"
                            />
                            {errors.location && (
                                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Image
                            </label>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <label
                                        htmlFor="imageUpload"
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors border border-gray-300"
                                    >
                                        <Upload size={20} />
                                        <span>{uploadingImage ? "Uploading..." : "Choose Image"}</span>
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={uploadingImage}
                                    />
                                    {imagePreview && (
                                        <span className="text-sm text-gray-600">Image selected</span>
                                    )}
                                </div>
                                {imagePreview && (
                                    <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview("");
                                                setFormData((prev) => ({ ...prev, image: "" }));
                                            }}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                <p className="text-sm text-gray-500">
                                    Upload an image for the event (max 5MB). Recommended size: 1200x675px
                                </p>
                            </div>
                        </div>

                        {/* Status (Auto-calculated), Category, Participants - Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status (Auto-calculated)
                                </label>
                                <div className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 ${formData.startDate ? 'text-gray-900' : 'text-gray-400'
                                    }`}>
                                    {formData.startDate
                                        ? calculateStatus(formData.startDate, formData.endDate || null).charAt(0).toUpperCase() +
                                        calculateStatus(formData.startDate, formData.endDate || null).slice(1)
                                        : 'Select date first'}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Based on event date
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="hackathon">Hackathon</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="competition">Competition</option>
                                    <option value="social">Social Event</option>
                                    <option value="csr">CSR Activity</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="participants"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Participants
                                </label>
                                <input
                                    type="number"
                                    id="participants"
                                    name="participants"
                                    value={formData.participants || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 150"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Registration Link */}
                        <div>
                            <label
                                htmlFor="registrationLink"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Registration Link
                            </label>
                            <input
                                type="url"
                                id="registrationLink"
                                name="registrationLink"
                                value={formData.registrationLink}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://..."
                            />
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="featured"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                Featured Event (will appear prominently on events page)
                            </label>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : event
                                        ? "Update Event"
                                        : "Create Event"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};
