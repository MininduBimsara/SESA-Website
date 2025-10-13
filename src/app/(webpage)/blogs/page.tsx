'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, Search, ArrowRight, TrendingUp, BookOpen, Code, Lightbulb, Users, Briefcase, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Blog } from '@/types/blog'

type BlogCategory = 'all' | 'technical' | 'career' | 'events' | 'tutorials' | 'community'

const categories = [
    { value: 'all', label: 'All Posts', icon: BookOpen },
    { value: 'technical', label: 'Technical', icon: Code },
    { value: 'tutorials', label: 'Tutorials', icon: Lightbulb },
    { value: 'career', label: 'Career', icon: Briefcase },
    { value: 'events', label: 'Events', icon: TrendingUp },
    { value: 'community', label: 'Community', icon: Users }
]

const BlogsPage = () => {
    const [blogPosts, setBlogPosts] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/blogs')
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs')
                }
                const data = await response.json()
                // Filter only published blogs
                const publishedBlogs = Array.isArray(data) ? data.filter((item: Blog) => item.published) : []
                setBlogPosts(publishedBlogs)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                console.error('Error fetching blogs:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [])

    const filteredPosts = Array.isArray(blogPosts) ? blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    }) : []

    const featuredPosts = Array.isArray(blogPosts) ? blogPosts.filter(post => post.featured) : []

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-rose-500 animate-spin mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Loading blog posts...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blogs</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-rose-500 hover:bg-rose-600">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 py-20 px-4 md:px-8 lg:px-16 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            SESA Blog
                        </h1>
                        <p className="text-xl md:text-2xl text-rose-100 max-w-3xl mx-auto">
                            Insights, tutorials, and stories from the Software Engineering community
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="w-6 h-6 text-rose-500" />
                            <h2 className="text-3xl font-bold text-gray-900">Featured Posts</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredPosts.map(post => (
                                <Card key={post.id} className="hover:shadow-2xl transition-all duration-300 border-2 border-rose-200 flex flex-col">
                                    <div className="relative h-48 w-full">
                                        {post.image ? (
                                            <Image src={post.image} alt={post.title} fill className="object-cover rounded-t-xl" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                                                <BookOpen className="w-16 h-16 text-white/50" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500 text-white">
                                                Featured
                                            </span>
                                        </div>
                                        {post.category && (
                                            <div className="absolute top-3 left-3">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 capitalize">
                                                    {post.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-xl line-clamp-2 hover:text-rose-600 transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        {post.excerpt && (
                                            <CardDescription className="text-sm line-clamp-3 mt-2">
                                                {post.excerpt}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>{post.author}</span>
                                            </div>
                                            {post.readTime && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(post.createdAt)}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/blogs/${post.slug}`} className="w-full">
                                            <Button className="w-full bg-rose-500 hover:bg-rose-600">
                                                Read More
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Search and Filter Section */}
            <section className="py-8 px-4 md:px-8 lg:px-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search articles by title, content, or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value as BlogCategory)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === cat.value
                                        ? 'bg-rose-500 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {cat.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* All Blog Posts */}
            <section className="py-12 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
                            <p className="text-gray-600">Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {selectedCategory === 'all' ? 'All Articles' : `${categories.find(c => c.value === selectedCategory)?.label} Articles`}
                                </h2>
                                <p className="text-gray-600">
                                    Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post) => (
                                    <Card key={post.id} className="hover:shadow-xl transition-all duration-300 flex flex-col group">
                                        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                                            {post.image ? (
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                                                    <BookOpen className="w-16 h-16 text-white/50" />
                                                </div>
                                            )}
                                            {post.category && (
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 capitalize">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <CardHeader className="flex-grow">
                                            <CardTitle className="text-xl line-clamp-2 group-hover:text-rose-600 transition-colors cursor-pointer">
                                                {post.title}
                                            </CardTitle>
                                            {post.excerpt && (
                                                <CardDescription className="text-sm line-clamp-3 mt-2">
                                                    {post.excerpt}
                                                </CardDescription>
                                            )}
                                        </CardHeader>

                                        <CardContent>
                                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    <span className="line-clamp-1">{post.author}</span>
                                                </div>
                                                {post.readTime && (
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{post.readTime}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(post.createdAt)}</span>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {post.tags.slice(0, 3).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-rose-50 text-rose-600 text-xs rounded-full"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>

                                        <CardFooter>
                                            <Link href={`/blogs/${post.slug}`} className="w-full">
                                                <Button variant="outline" className="w-full group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-colors">
                                                    Read Article
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Stay Updated with Our Latest Posts
                    </h2>
                    <p className="text-xl text-rose-50">
                        Follow us on social media to never miss an article, tutorial, or community update
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg">
                            <BookOpen className="w-5 h-5 mr-2" />
                            View All Articles
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                            Follow on Medium
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BlogsPage
