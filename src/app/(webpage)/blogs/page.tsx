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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#EC1640] animate-spin mx-auto mb-4" />
                    <p className="text-sm text-slate-500 font-medium">Loading blog articles...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="text-center space-y-4 max-w-sm">
                    <BookOpen className="w-12 h-12 text-slate-350 mx-auto" />
                    <h2 className="text-xl font-serif font-semibold text-slate-800">Error Loading Blogs</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-[#EC1640] hover:bg-[#d61237] text-white rounded-xl py-2 px-5 text-xs font-semibold">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pt-24 pb-8 md:px-5 md:pt-28 bg-white flex flex-col gap-6 md:gap-8">
            {/* Hero Section Card */}
            <section className="relative rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-neutral-900 to-slate-950 text-white border border-white/5 shadow-2xl py-20 px-6 md:px-10 lg:px-12 text-center overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" 
                    style={{ backgroundImage: 'url(/modern-tech-workspace-with-coding-screens-and-coll.jpg)' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                <div className="relative z-10 space-y-4">
                    <span className="text-[#EC1640] text-xs font-semibold uppercase tracking-[0.2em]">ARTICLES</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif text-white tracking-normal leading-tight">
                        Discover SESA Blog
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light">
                        Insights, tutorials, and stories from the Software Engineering community
                    </p>
                </div>
            </section>

            {/* Featured Posts Card */}
            {featuredPosts.length > 0 && (
                <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-8">
                        <TrendingUp className="w-5 h-5 text-[#EC1640] animate-pulse" />
                        <h2 className="text-2xl md:text-3xl font-semibold font-serif text-slate-950">Featured Posts</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredPosts.map(post => (
                            <Card key={post.id} className="hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-[#EC1640]/50 rounded-2xl flex flex-col justify-between overflow-hidden">
                                <div className="relative h-44 w-full bg-slate-50">
                                    {post.image ? (
                                        <Image src={post.image} alt={post.title} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-rose-450 to-rose-600 flex items-center justify-center">
                                            <BookOpen className="w-12 h-12 text-white/40" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#EC1640] text-white">
                                            Featured
                                        </span>
                                    </div>
                                    {post.category && (
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/95 text-slate-800 border border-slate-100">
                                                {post.category}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="p-5 flex-grow">
                                    <CardTitle className="text-lg font-serif font-semibold hover:text-[#EC1640] transition-colors leading-snug line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                    {post.excerpt && (
                                        <CardDescription className="text-slate-500 text-xs line-clamp-2 mt-2 leading-relaxed">
                                            {post.excerpt}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="px-5 pb-4 space-y-1.5 text-xs text-slate-500 font-medium border-t border-slate-100/50 pt-3">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-[#EC1640]" />
                                            <span>{post.author}</span>
                                        </div>
                                        {post.readTime && (
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-[#EC1640]" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-[#EC1640]" />
                                        <span>{formatDate(post.createdAt)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="px-5 pb-5 pt-0">
                                    <Link href={`/blogs/${post.slug}`} className="w-full">
                                        <Button className="w-full bg-[#EC1640] hover:bg-[#d61237] text-white rounded-xl shadow-sm text-xs font-semibold py-2.5">
                                            Read Article
                                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Search and Filters Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-8 lg:p-10 relative overflow-hidden flex flex-col gap-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full lg:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search articles by title, content or tag..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-full focus:ring-2 focus:ring-[#EC1640]/20 focus:border-[#EC1640] outline-none"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        {categories.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value as BlogCategory)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${selectedCategory === cat.value
                                        ? 'bg-[#EC1640] text-white shadow-sm'
                                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {cat.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Articles Grid Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                        <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                        <h3 className="text-xl font-serif font-semibold text-slate-800">No articles found</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">Try adjusting your filters or search terms.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 space-y-2">
                            <h2 className="text-xl font-serif font-semibold text-slate-900 leading-none">
                                {selectedCategory === 'all' ? 'All Articles' : `${categories.find(c => c.value === selectedCategory)?.label} Articles`}
                            </h2>
                            <p className="text-slate-500 text-xs font-medium">
                                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredPosts.map((post) => (
                                <Card key={post.id} className="hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-200 rounded-2xl justify-between overflow-hidden group">
                                    <div className="relative h-44 w-full bg-slate-50 overflow-hidden">
                                        {post.image ? (
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                                                <BookOpen className="w-12 h-12 text-white/40" />
                                            </div>
                                        )}
                                        {post.category && (
                                            <div className="absolute top-3 left-3">
                                                <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-white/90 text-slate-800 border border-slate-100">
                                                    {post.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <CardHeader className="p-5 flex-grow">
                                        <CardTitle className="text-lg font-serif font-semibold group-hover:text-[#EC1640] transition-colors leading-snug cursor-pointer line-clamp-2">
                                            {post.title}
                                        </CardTitle>
                                        {post.excerpt && (
                                            <CardDescription className="text-slate-655 text-xs line-clamp-2 mt-2 leading-relaxed">
                                                {post.excerpt}
                                            </CardDescription>
                                        )}
                                    </CardHeader>

                                    <CardContent className="px-5 pb-3">
                                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1">
                                                <User className="w-3.5 h-3.5 text-[#EC1640]" />
                                                <span className="line-clamp-1">{post.author}</span>
                                            </div>
                                            {post.readTime && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5 text-[#EC1640]" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1.5 font-medium">
                                            <Calendar className="w-3.5 h-3.5 text-[#EC1640]" />
                                            <span>{formatDate(post.createdAt)}</span>
                                        </div>

                                        {/* Tags */}
                                        {post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-4">
                                                {post.tags.slice(0, 3).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-0.5 bg-rose-50 text-[#EC1640] text-[10px] font-semibold rounded-full border border-[#EC1640]/5"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>

                                    <CardFooter className="px-5 pb-5 pt-0">
                                        <Link href={`/blogs/${post.slug}`} className="w-full">
                                            <Button variant="outline" className="w-full text-xs font-semibold py-2 rounded-xl group-hover:bg-[#EC1640] group-hover:text-white group-hover:border-transparent transition-all">
                                                Read Article
                                                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default BlogsPage
