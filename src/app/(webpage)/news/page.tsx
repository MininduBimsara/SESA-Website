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
                // Filter only published news
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

    // Format date helper
    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-rose-500 animate-spin mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Loading news...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Error Loading News</h3>
                    <p className="text-gray-600">{error}</p>
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
                            SESA News
                        </h1>
                        <p className="text-xl md:text-2xl text-rose-100 max-w-3xl mx-auto">
                            Latest updates, achievements, and announcements from our community
                        </p>
                    </div>
                </div>
            </section>

            {/* Breaking News / Latest News Banner */}
            {latestNews && (
                <section className="py-6 px-4 md:px-8 lg:px-16 bg-rose-50 border-b-4 border-rose-500">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4">
                            <span className="bg-rose-500 text-white px-4 py-2 rounded-full font-bold text-sm uppercase flex-shrink-0">
                                Breaking News
                            </span>
                            <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 hover:text-rose-600 transition-colors cursor-pointer line-clamp-2">
                                    {latestNews.title}
                                </h3>
                            </div>
                            <Link href={`/news/${latestNews.slug}`}>
                                <Button className="bg-rose-500 hover:bg-rose-600 flex-shrink-0">
                                    Read More
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured News */}
            {featuredNews.length > 0 && (
                <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="w-6 h-6 text-rose-500" />
                            <h2 className="text-3xl font-bold text-gray-900">Featured News</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredNews.map(item => (
                                <Card key={item.id} className="hover:shadow-2xl transition-all duration-300 border-2 border-rose-200 flex flex-col">
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={item.image || '/placeholder-news.jpg'}
                                            alt={item.title}
                                            fill
                                            className="object-cover rounded-t-xl"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500 text-white">
                                                Featured
                                            </span>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 capitalize">
                                                {item.category?.replace('-', ' ') || 'News'}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-xl line-clamp-2 hover:text-rose-600 transition-colors">
                                            {item.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm line-clamp-3 mt-2">
                                            {item.excerpt || item.content.substring(0, 150).replace(/<[^>]*>/g, '')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-rose-500" />
                                                <span>{formatDate(item.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-rose-500" />
                                                <span>{item.author}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/news/${item.slug}`} className="w-full">
                                            <Button className="w-full bg-rose-500 hover:bg-rose-600">
                                                Read Full Story
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
                                placeholder="Search news by title, content, or tags..."
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
                                    onClick={() => setSelectedCategory(cat.value as NewsCategory)}
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

            {/* All News Items */}
            <section className="py-12 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {filteredNews.length === 0 ? (
                        <div className="text-center py-20">
                            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No news found</h3>
                            <p className="text-gray-600">Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {selectedCategory === 'all' ? 'All News' : `${categories.find(c => c.value === selectedCategory)?.label}`}
                                </h2>
                                <p className="text-gray-600">
                                    Showing {filteredNews.length} {filteredNews.length === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredNews.map((item) => (
                                    <Card key={item.id} className="hover:shadow-xl transition-all duration-300 flex flex-col group">
                                        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                                            <Image
                                                src={item.image || '/placeholder-news.jpg'}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 capitalize">
                                                    {item.category?.replace('-', ' ') || 'News'}
                                                </span>
                                            </div>
                                        </div>

                                        <CardHeader className="flex-grow">
                                            <CardTitle className="text-xl line-clamp-2 group-hover:text-rose-600 transition-colors cursor-pointer">
                                                {item.title}
                                            </CardTitle>
                                            <CardDescription className="text-sm line-clamp-3 mt-2">
                                                {item.excerpt || item.content.substring(0, 150).replace(/<[^>]*>/g, '')}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-rose-500" />
                                                    <span>{formatDate(item.createdAt)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-rose-500" />
                                                    <span className="line-clamp-1">{item.author}</span>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {item.tags.slice(0, 3).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-rose-50 text-rose-600 text-xs rounded-full"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex gap-2">
                                            <Link href={`/news/${item.slug}`} className="flex-1">
                                                <Button
                                                    variant="outline"
                                                    className="w-full group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-colors"
                                                >
                                                    Read More
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

            {/* Subscribe CTA */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Stay Informed with SESA Updates
                    </h2>
                    <p className="text-xl text-rose-50">
                        Follow us on social media to get the latest news, announcements, and updates from our community
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg">
                            <Newspaper className="w-5 h-5 mr-2" />
                            View All News
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                            Subscribe to Updates
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NewsPage
