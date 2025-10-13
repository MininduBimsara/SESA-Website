'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Blog } from '@/types/blog';
import TiptapEditor from './TiptapEditor';

interface BlogFormProps {
    blog?: Blog | null;
    onClose: () => void;
    onSuccess: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        author: '',
        category: '',
        tags: [] as string[],
        image: '',
        readTime: '',
        featured: false,
        published: false,
    });
    const [tagInput, setTagInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title,
                content: blog.content,
                excerpt: blog.excerpt || '',
                slug: blog.slug,
                author: blog.author,
                category: blog.category || '',
                tags: blog.tags || [],
                image: blog.image || '',
                readTime: blog.readTime || '',
                featured: blog.featured,
                published: blog.published,
            });
        }
    }, [blog]);

    const handleChange = (field: string, value: string | boolean | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const generateSlug = () => {
        if (!blog) { // Only auto-generate for new blogs
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
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
        } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
            newErrors.slug = 'Slug must only contain lowercase letters, numbers, and hyphens';
        }

        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }

        if (formData.excerpt && formData.excerpt.length > 300) {
            newErrors.excerpt = 'Excerpt must be less than 300 characters';
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
            const url = blog ? `/api/blogs/${blog.id}` : '/api/blogs';
            const method = blog ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save blog');
            }

            onSuccess();
            onClose();
        } catch (error: unknown) {
            console.error('Error saving blog:', error);
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message : 'Failed to save blog'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="min-h-screen">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-50 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {blog ? 'Edit Blog Post' : 'Create Blog Post'}
                    </h2>
                    <div className="flex items-center gap-3">
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
                            form="blog-form"
                            className="bg-indigo-600 hover:bg-indigo-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : blog ? 'Update Post' : 'Save Post'}
                        </Button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form id="blog-form" onSubmit={handleSubmit} className="max-w-7xl mx-auto px-8 pt-8 pb-24 space-y-6">
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
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter blog post title"
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
                            onChange={(e) => handleChange('slug', e.target.value.toLowerCase())}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.slug ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="blog-post-url"
                        />
                        {errors.slug && (
                            <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">
                            URL: /blogs/{formData.slug || 'your-slug'}
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
                                    key={blog?.id || 'new'}
                                    content={formData.content}
                                    onChange={(content) => handleChange('content', content)}
                                />
                            </div>
                        ) : (
                            <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px]">
                                <div 
                                    className="prose prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{ __html: formData.content }}
                                />
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
                            maxLength={300}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.excerpt ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Brief summary of the blog post (max 300 characters)"
                        />
                        {errors.excerpt && (
                            <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">
                            {formData.excerpt.length}/300 characters
                        </p>
                    </div>

                    {/* Author, Category, and Read Time Row */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Author *
                            </label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => handleChange('author', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.author ? 'border-red-500' : 'border-gray-300'
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">Select category</option>
                                <option value="technical">Technical</option>
                                <option value="career">Career</option>
                                <option value="events">Events</option>
                                <option value="tutorials">Tutorials</option>
                                <option value="community">Community</option>
                                <option value="insights">Insights</option>
                            </select>
                        </div>

                        {/* Read Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Read Time
                            </label>
                            <input
                                type="text"
                                value={formData.readTime}
                                onChange={(e) => handleChange('readTime', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="e.g., 5 min read"
                            />
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
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-2"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="text-indigo-600 hover:text-indigo-800"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">
                            Upload an image (max 5MB). Recommended size: 1200x630px
                        </p>
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
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Featured Post</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => handleChange('published', e.target.checked)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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

                    {/* Bottom spacing to prevent content being hidden under sticky header */}
                    <div className="h-20"></div>
                </form>
            </div>
        </div>
    );
};

export default BlogForm;
