"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

const AdminSettings = () => {
    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3">
                        <Settings className="text-gray-600" size={32} />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-600 mt-1">Configure site settings and preferences</p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <Card className="p-12 text-center">
                    <Settings size={64} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Settings Coming Soon
                    </h3>
                    <p className="text-gray-600">
                        This section will allow you to configure various site settings.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default AdminSettings;
