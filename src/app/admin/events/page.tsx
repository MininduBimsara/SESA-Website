"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const AdminEvents = () => {
    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3">
                        <Calendar className="text-blue-600" size={32} />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
                            <p className="text-gray-600 mt-1">Create and manage campus events</p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <Card className="p-12 text-center">
                    <Calendar size={64} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Events Management Coming Soon
                    </h3>
                    <p className="text-gray-600">
                        This section will allow you to create, edit, and manage campus events.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default AdminEvents;
