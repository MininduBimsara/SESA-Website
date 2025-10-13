'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowLeft, BookOpen, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { ArticleContent } from '@/components/ArticleContent'
import { ShareButtons } from '@/components/ShareButtons'
import { AuthorCard } from '@/components/AuthorCard'
import { TagsSection } from '@/components/TagsSection'
import type { Blog } from '@/types/blog'

const BlogDetailPage = () => {
    const params = useParams()
    const slug = params?.slug as string
    
    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const calculateReadingTime = (content: string) => {
        const text = content.replace(/<[^>]*>/g, '')
        const wordsPerMinute = 200
        const words = text.trim().split(/\s+/).length
        const time = Math.ceil(words / wordsPerMinute)
        return `${time} min read`
    }

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/blogs/slug/${slug}`)
                
                if (!response.ok) {
                    if (response.status === 404) {
                        setError('Blog post not found')
                    } else {
                        throw new Error('Failed to fetch blog')
                    }
                    return
                }
                
                const foundBlog: Blog = await response.json()
                
                if (!foundBlog.published) {
                    setError('Blog post not found')
                    return
                }
                
                setBlog(foundBlog)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                console.error('Error fetching blog:', err)
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchBlogDetail()
        }
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-rose-500 animate-spin mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Loading blog post...</p>
                </div>
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Post Not Found</h2>
                    <p className="text-gray-600 mb-4">{error || 'The blog post you are looking for does not exist.'}</p>
                    <Link href="/blogs">
                        <Button className="bg-rose-500 hover:bg-rose-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blogs
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const readTime = blog.readTime || calculateReadingTime(blog.content)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
                    <Link href="/blogs">
                        <Button variant="ghost" className="hover:bg-gray-100">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blogs
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <article className="bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                    {/* Category Badge */}
                    {blog.category && (
                        <div className="mb-4">
                            <span className="inline-block px-4 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold capitalize">
                                {blog.category}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {/* Excerpt */}
                    {blog.excerpt && (
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {blog.excerpt}
                        </p>
                    )}

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-rose-500" />
                            <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-rose-500" />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-rose-500" />
                            <span>{readTime}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {blog.image && (
                        <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-xl overflow-hidden">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <ArticleContent content={blog.content} />
                    {/* Tags */}
                    {blog.tags.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <TagsSection tags={blog.tags} />
                        </div>
                    )}

                    {/* Author Card */}
                    <div className="mt-12">
                        <AuthorCard
                            name={blog.author}
                            bio={`Written by ${blog.author}`}
                        />
                    </div>


                    {/* Share Buttons - Better positioned after content */}
                    <div className="mt-12">
                        <ShareButtons
                            url={typeof window !== 'undefined' ? window.location.href : ''}
                            title={blog.title}
                        />
                    </div>


                    {/* Navigation */}
                    <div className="mt-12 pt-8">
                        <Link href="/blogs">
                            <Button className="bg-rose-500 hover:bg-rose-600">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to All Blogs
                            </Button>
                        </Link>
                    </div>
                </div>
            </article>

            {/* Related Posts Section */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
                    <div className="text-center py-8">
                        <Link href="/blogs">
                            <Button variant="outline" className="hover:bg-white">
                                View All Blogs
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BlogDetailPage
