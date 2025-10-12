"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const AdminBlogs = () => {
    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3">
                        <FileText className="text-indigo-600" size={32} />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                            <p className="text-gray-600 mt-1">Write and publish blog posts</p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <Card className="p-12 text-center">
                    <FileText size={64} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Blog Management Coming Soon
                    </h3>
                    <p className="text-gray-600">
                        This section will allow you to create and manage blog content.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default AdminBlogs;
