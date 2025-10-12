"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Plus,
    Edit,
    Trash2,
    Search,
    Star,
    Clock,
} from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { EventForm } from "@/components/admin/EventForm";
import type { Event } from "@/types/event";

const statusColors = {
    upcoming: "bg-blue-100 text-blue-700",
    ongoing: "bg-green-100 text-green-700",
    past: "bg-gray-100 text-gray-700",
};

const categoryColors = {
    hackathon: "bg-purple-100 text-purple-700",
    workshop: "bg-blue-100 text-blue-700",
    social: "bg-pink-100 text-pink-700",
    csr: "bg-green-100 text-green-700",
    competition: "bg-orange-100 text-orange-700",
};

const AdminEvents = () => {
    const { isLoading: authLoading } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<string | null>(null);

    // Fetch events
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("/api/events");
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setEvents(events.filter((event) => event.id !== id));
                setShowDeleteModal(false);
                setEventToDelete(null);
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleEventSubmit = (updatedEvent: Event) => {
        if (selectedEvent) {
            // Update existing event
            setEvents(
                events.map((event) =>
                    event.id === updatedEvent.id ? updatedEvent : event
                )
            );
        } else {
            // Add new event
            setEvents([updatedEvent, ...events]);
        }
        setShowEventModal(false);
        setSelectedEvent(null);
    };

    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || event.status === statusFilter;
        const matchesCategory =
            categoryFilter === "all" || event.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <Calendar className="text-blue-600" size={32} />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Events Management
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Create and manage campus events
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            setSelectedEvent(null);
                            setShowEventModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Event
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Events</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {events.length}
                                </p>
                            </div>
                            <Calendar className="text-blue-600" size={32} />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                                <p className="text-3xl font-bold text-blue-600">
                                    {events.filter((e) => e.status === "upcoming").length}
                                </p>
                            </div>
                            <Clock className="text-blue-600" size={32} />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Ongoing</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {events.filter((e) => e.status === "ongoing").length}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Featured</p>
                                <p className="text-3xl font-bold text-orange-600">
                                    {events.filter((e) => e.featured).length}
                                </p>
                            </div>
                            <Star className="text-orange-600 fill-orange-600" size={32} />
                        </div>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="past">Past</option>
                        </select>

                        {/* Category Filter */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            <option value="hackathon">Hackathons</option>
                            <option value="workshop">Workshops</option>
                            <option value="competition">Competitions</option>
                            <option value="social">Social Events</option>
                            <option value="csr">CSR Activities</option>
                        </select>
                    </div>
                </Card>

                {/* Events List */}
                <Card>
                    {filteredEvents.length === 0 ? (
                        <div className="p-12 text-center">
                            <Calendar size={64} className="mx-auto mb-4 text-gray-400" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No events found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                                    ? "Try adjusting your filters"
                                    : "Get started by creating your first event"}
                            </p>
                            {!searchQuery && statusFilter === "all" && categoryFilter === "all" && (
                                <Button
                                    onClick={() => {
                                        setSelectedEvent(null);
                                        setShowEventModal(true);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Your First Event
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Event
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Participants
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredEvents.map((event) => (
                                        <tr
                                            key={event.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                                    {event.image ? (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img
                                                            src={event.image}
                                                            alt={event.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <Calendar className="w-8 h-8 text-gray-400" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    {event.featured && (
                                                        <Star className="w-4 h-4 text-orange-500 fill-orange-500 flex-shrink-0" />
                                                    )}
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {event.title}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {event.location || "No location"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{event.date}</div>
                                                {event.time && (
                                                    <div className="text-sm text-gray-500">{event.time}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${categoryColors[event.category]
                                                        }`}
                                                >
                                                    {event.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${statusColors[event.status]
                                                        }`}
                                                >
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {event.participants || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedEvent(event);
                                                            setShowEventModal(true);
                                                        }}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setEventToDelete(event.id);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="text-red-600 hover:text-red-700 hover:border-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Delete Event
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this event? This action cannot be
                                undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setEventToDelete(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => eventToDelete && handleDelete(eventToDelete)}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Event Form Modal */}
                {showEventModal && (
                    <EventForm
                        event={selectedEvent}
                        onClose={() => {
                            setShowEventModal(false);
                            setSelectedEvent(null);
                        }}
                        onSubmit={handleEventSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminEvents;
