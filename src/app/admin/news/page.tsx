"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Plus, Search, Edit, Trash2, Eye, CheckCircle, XCircle, Star } from "lucide-react";
import { News } from "@/types/news";
import NewsForm from "@/components/admin/NewsForm";
import NewsContent from "@/components/NewsContent";

const AdminNews = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
    const [previewNews, setPreviewNews] = useState<News | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/news');
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (newsItem: News) => {
        setEditingNews(newsItem);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!deletingId) return;

        try {
            const response = await fetch(`/api/news/${deletingId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setNews(news.filter(item => item.id !== deletingId));
                setShowDeleteDialog(false);
                setDeletingId(null);
            }
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingNews(null);
    };

    const handleFormSuccess = () => {
        fetchNews();
    };

    const filteredNews = news.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus =
            filterStatus === 'all' ? true :
                filterStatus === 'published' ? item.published :
                    !item.published;

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: news.length,
        published: news.filter(item => item.published).length,
        draft: news.filter(item => !item.published).length,
        featured: news.filter(item => item.featured).length,
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Newspaper className="text-green-600" size={32} />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
                                <p className="text-gray-600 mt-1">Create and manage news articles</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowForm(true)}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Plus className="mr-2" size={20} />
                            Create Article
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Articles</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <Newspaper className="text-blue-600" size={32} />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Published</p>
                                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                            </div>
                            <CheckCircle className="text-green-600" size={32} />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Drafts</p>
                                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
                            </div>
                            <XCircle className="text-gray-600" size={32} />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Featured</p>
                                <p className="text-2xl font-bold text-amber-600">{stats.featured}</p>
                            </div>
                            <Star className="text-amber-600" size={32} />
                        </div>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card className="p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title, author, or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={filterStatus === 'all' ? 'default' : 'outline'}
                                onClick={() => setFilterStatus('all')}
                                className={filterStatus === 'all' ? 'bg-green-600 hover:bg-green-700' : ''}
                            >
                                All
                            </Button>
                            <Button
                                variant={filterStatus === 'published' ? 'default' : 'outline'}
                                onClick={() => setFilterStatus('published')}
                                className={filterStatus === 'published' ? 'bg-green-600 hover:bg-green-700' : ''}
                            >
                                Published
                            </Button>
                            <Button
                                variant={filterStatus === 'draft' ? 'default' : 'outline'}
                                onClick={() => setFilterStatus('draft')}
                                className={filterStatus === 'draft' ? 'bg-green-600 hover:bg-green-700' : ''}
                            >
                                Drafts
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* News Table */}
                {loading ? (
                    <Card className="p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading articles...</p>
                    </Card>
                ) : filteredNews.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Newspaper size={64} className="mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchQuery || filterStatus !== 'all' ? 'No articles found' : 'No articles yet'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery || filterStatus !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Get started by creating your first news article'}
                        </p>
                        {!searchQuery && filterStatus === 'all' && (
                            <Button
                                onClick={() => setShowForm(true)}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Plus className="mr-2" size={20} />
                                Create Article
                            </Button>
                        )}
                    </Card>
                ) : (
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Article
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Author
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredNews.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {item.image && (
                                                        <div className="flex-shrink-0 h-16 w-16 mr-4">
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img
                                                                className="h-16 w-16 rounded-lg object-cover"
                                                                src={item.image}
                                                                alt={item.title}
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                                            {item.featured && (
                                                                <Star className="text-amber-500 fill-amber-500" size={16} />
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-500 line-clamp-1">{item.excerpt}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.author}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                                    {item.category || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.published ? (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        <CheckCircle size={14} className="mr-1" />
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                        <XCircle size={14} className="mr-1" />
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setPreviewNews(item)}
                                                        title="Preview"
                                                    >
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(item)}
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {/* Create/Edit Form Modal */}
                {showForm && (
                    <NewsForm
                        news={editingNews}
                        onClose={handleFormClose}
                        onSuccess={handleFormSuccess}
                    />
                )}

                {/* Preview Modal */}
                {previewNews && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                                <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
                                <button
                                    onClick={() => setPreviewNews(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="mb-4">
                                    {previewNews.image && (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={previewNews.image}
                                            alt={previewNews.title}
                                            className="w-full h-64 object-cover rounded-lg mb-4"
                                        />
                                    )}
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{previewNews.title}</h1>
                                    {previewNews.excerpt && (
                                        <p className="text-xl text-gray-600 mb-4">{previewNews.excerpt}</p>
                                    )}
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                        <span>By {previewNews.author}</span>
                                        <span>•</span>
                                        <span>{new Date(previewNews.createdAt).toLocaleDateString()}</span>
                                        {previewNews.category && (
                                            <>
                                                <span>•</span>
                                                <span className="capitalize">{previewNews.category}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <NewsContent content={previewNews.content} />
                                {previewNews.tags.length > 0 && (
                                    <div className="mt-8 pt-6 border-t">
                                        <div className="flex flex-wrap gap-2">
                                            {previewNews.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteDialog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Article</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this article? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowDeleteDialog(false);
                                        setDeletingId(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={confirmDelete}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminNews;
