'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { News } from '@/types/news';
import NewsContent from '@/components/NewsContent';
import TiptapEditor from './TiptapEditor';

interface NewsFormProps {
    news?: News | null;
    onClose: () => void;
    onSuccess: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ news, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        author: '',
        category: '',
        tags: [] as string[],
        image: '',
        featured: false,
        published: false,
    });
    const [tagInput, setTagInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (news) {
            setFormData({
                title: news.title,
                content: news.content,
                excerpt: news.excerpt || '',
                slug: news.slug,
                author: news.author,
                category: news.category || '',
                tags: news.tags || [],
                image: news.image || '',
                featured: news.featured,
                published: news.published,
            });
        }
    }, [news]);

    const handleChange = (field: string, value: string | boolean | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Image must be less than 5MB' }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
                setErrors(prev => ({ ...prev, image: '' }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.content.trim() || formData.content === '<p><br></p>') {
            newErrors.content = 'Content is required';
        }

        if (!formData.slug.trim()) {
            newErrors.slug = 'Slug is required';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const url = news ? `/api/news/${news.id}` : '/api/news';
            const method = news ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save news');
            }

            onSuccess();
            onClose();
        } catch (error: unknown) {
            console.error('Error saving news:', error);
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message : 'Failed to save news'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {news ? 'Edit News Article' : 'Create News Article'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            onBlur={generateSlug}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter news title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug (URL) *
                        </label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => handleChange('slug', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.slug ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="news-title-url"
                        />
                        {errors.slug && (
                            <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">
                            URL: /news/{formData.slug || 'your-slug'}
                        </p>
                    </div>

                    {/* Content Editor */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Content (HTML Editor) *
                            </label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setShowPreview(!showPreview)}
                            >
                                {showPreview ? 'Hide Preview' : 'Show Preview'}
                            </Button>
                        </div>

                        {!showPreview ? (
                            <div className={errors.content ? 'border-2 border-red-500 rounded-lg' : ''}>
                                <TiptapEditor
                                    content={formData.content}
                                    onChange={(content) => handleChange('content', content)}
                                />
                            </div>
                        ) : (
                            <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                                <NewsContent content={formData.content} />
                            </div>
                        )}
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                            Use the toolbar to format text, add headings, lists, code blocks, etc.
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt (Short Summary)
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => handleChange('excerpt', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Brief summary of the article"
                        />
                    </div>

                    {/* Author & Category Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Author *
                            </label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => handleChange('author', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.author ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Author name"
                            />
                            {errors.author && (
                                <p className="mt-1 text-sm text-red-500">{errors.author}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="">Select category</option>
                                <option value="achievements">Achievements</option>
                                <option value="announcements">Announcements</option>
                                <option value="partnerships">Partnerships</option>
                                <option value="student-spotlight">Student Spotlight</option>
                                <option value="media">Media Coverage</option>
                            </select>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Enter tag and press Enter"
                            />
                            <Button
                                type="button"
                                onClick={handleAddTag}
                                variant="outline"
                            >
                                Add Tag
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="text-green-600 hover:text-green-800"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                        )}
                        {formData.image && (
                            <div className="mt-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    {/* Checkboxes */}
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => handleChange('featured', e.target.checked)}
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Featured Article</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => handleChange('published', e.target.checked)}
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Published</span>
                        </label>
                    </div>

                    {/* Error Message */}
                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-600">{errors.submit}</p>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : news ? 'Update Article' : 'Create Article'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsForm;