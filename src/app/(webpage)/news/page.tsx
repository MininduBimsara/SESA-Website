'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Search, ArrowRight, Newspaper, Award, Users, Briefcase, TrendingUp, ExternalLink, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { News } from '@/types/news'

type NewsCategory = 'all' | 'achievements' | 'announcements' | 'partnerships' | 'student-spotlight' | 'media'

const categories = [
    { value: 'all', label: 'All News', icon: Newspaper },
    { value: 'achievements', label: 'Achievements', icon: Award },
    { value: 'announcements', label: 'Announcements', icon: TrendingUp },
    { value: 'partnerships', label: 'Partnerships', icon: Briefcase },
    { value: 'student-spotlight', label: 'Student Spotlight', icon: Users },
    { value: 'media', label: 'Media Coverage', icon: ExternalLink }
]

const NewsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [newsItems, setNewsItems] = useState<News[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/news')
                if (!response.ok) {
                    throw new Error('Failed to fetch news')
                }
                const data = await response.json()
                const publishedNews = data.filter((item: News) => item.published)
                setNewsItems(publishedNews)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                console.error('Error fetching news:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    const filteredNews = newsItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category?.toLowerCase() === selectedCategory
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    const featuredNews = newsItems.filter(item => item.featured)
    const latestNews = newsItems.length > 0 ? newsItems[0] : null

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#EC1640] animate-spin mx-auto mb-4" />
                    <p className="text-sm text-slate-500 font-medium">Loading SESA news...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="text-center space-y-4 max-w-sm">
                    <Newspaper className="w-12 h-12 text-slate-350 mx-auto" />
                    <h2 className="text-xl font-serif font-semibold text-slate-800">Error Loading News</h2>
                    <p className="text-slate-500 text-sm">{error}</p>
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
                    style={{ backgroundImage: 'url(/tech-workshop-and-coding-event-with-students.jpg)' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                <div className="relative z-10 space-y-4">
                    <span className="text-[#EC1640] text-xs font-semibold uppercase tracking-[0.2em]">ANNOUNCEMENTS</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif text-white tracking-normal leading-tight">
                        Discover SESA News
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light">
                        Latest updates, achievements, and announcements from our community
                    </p>
                </div>
            </section>

            {/* Breaking News / Latest News Banner Card */}
            {latestNews && (
                <section className="bg-rose-50/70 border border-[#EC1640]/25 rounded-[1.5rem] md:rounded-[2rem] p-5 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <span className="bg-[#EC1640] text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider flex-shrink-0">
                                Breaking News
                            </span>
                            <div className="flex-1">
                                <h3 className="text-base md:text-lg font-serif font-semibold text-slate-900 hover:text-[#EC1640] transition-colors cursor-pointer line-clamp-1">
                                    {latestNews.title}
                                </h3>
                            </div>
                        </div>
                        <Link href={`/news/${latestNews.slug}`} className="w-full md:w-auto">
                            <Button className="bg-[#EC1640] hover:bg-[#d61237] text-white rounded-xl text-xs font-semibold py-2 w-full md:w-auto px-5">
                                Read More
                                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                            </Button>
                        </Link>
                    </div>
                </section>
            )}

            {/* Featured News Card */}
            {featuredNews.length > 0 && (
                <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-8">
                        <TrendingUp className="w-5 h-5 text-[#EC1640] animate-pulse" />
                        <h2 className="text-2xl md:text-3xl font-semibold font-serif text-slate-950">Featured News</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredNews.map(item => (
                            <Card key={item.id} className="hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-[#EC1640]/50 rounded-2xl flex flex-col justify-between overflow-hidden">
                                <div className="relative h-44 w-full bg-slate-50">
                                    <Image
                                        src={item.image || '/placeholder-news.jpg'}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#EC1640] text-white">
                                            Featured
                                        </span>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/95 text-slate-800 border border-slate-100">
                                            {item.category?.replace('-', ' ') || 'News'}
                                        </span>
                                    </div>
                                </div>
                                <CardHeader className="p-5 flex-grow">
                                    <CardTitle className="text-lg font-serif font-semibold hover:text-[#EC1640] transition-colors leading-snug line-clamp-2">
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription className="text-slate-550 text-xs line-clamp-2 mt-2 leading-relaxed">
                                        {item.excerpt || item.content.substring(0, 150).replace(/<[^>]*>/g, '')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-5 pb-4 space-y-1.5 text-xs text-slate-500 font-medium border-t border-slate-100/50 pt-3">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-[#EC1640]" />
                                            <span>{formatDate(item.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-[#EC1640]" />
                                            <span>{item.author}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="px-5 pb-5 pt-0">
                                    <Link href={`/news/${item.slug}`} className="w-full">
                                        <Button className="w-full bg-[#EC1640] hover:bg-[#d61237] text-white rounded-xl shadow-sm text-xs font-semibold py-2.5">
                                            Read Full Story
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
                            placeholder="Search news by title, content or tags..."
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
                                    onClick={() => setSelectedCategory(cat.value as NewsCategory)}
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

            {/* News Grid Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                {filteredNews.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                        <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
                        <h3 className="text-xl font-serif font-semibold text-slate-800">No news articles found</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 space-y-2">
                            <h2 className="text-xl font-serif font-semibold text-slate-900 leading-none">
                                {selectedCategory === 'all' ? 'All News' : `${categories.find(c => c.value === selectedCategory)?.label}`}
                            </h2>
                            <p className="text-slate-500 text-xs font-medium font-sans">
                                Showing {filteredNews.length} {filteredNews.length === 1 ? 'item' : 'items'}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredNews.map((item) => (
                                <Card key={item.id} className="hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-200 rounded-2xl justify-between overflow-hidden group">
                                    <div className="relative h-44 w-full bg-slate-50 overflow-hidden">
                                        <Image
                                            src={item.image || '/placeholder-news.jpg'}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-white/90 text-slate-800 border border-slate-100">
                                                {item.category?.replace('-', ' ') || 'News'}
                                            </span>
                                        </div>
                                    </div>

                                    <CardHeader className="p-5 flex-grow">
                                        <CardTitle className="text-lg font-serif font-semibold group-hover:text-[#EC1640] transition-colors leading-snug cursor-pointer line-clamp-2">
                                            {item.title}
                                        </CardTitle>
                                        <CardDescription className="text-slate-655 text-xs line-clamp-2 mt-2 leading-relaxed">
                                            {item.excerpt || item.content.substring(0, 150).replace(/<[^>]*>/g, '')}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="px-5 pb-3">
                                        <div className="space-y-1 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-[#EC1640]" />
                                                <span>{formatDate(item.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <User className="w-3.5 h-3.5 text-[#EC1640]" />
                                                <span className="line-clamp-1">{item.author}</span>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        {item.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-4">
                                                {item.tags.slice(0, 3).map((tag, index) => (
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
                                        <Link href={`/news/${item.slug}`} className="w-full">
                                            <Button variant="outline" className="w-full text-xs font-semibold py-2 rounded-xl group-hover:bg-[#EC1640] group-hover:text-white group-hover:border-transparent transition-all">
                                                Read More
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

export default NewsPage
