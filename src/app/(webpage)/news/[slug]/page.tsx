'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Calendar, User, ArrowLeft, Loader2, Newspaper, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { News } from '@/types/news'
import { ArticleContent } from '@/components/ArticleContent'
import { ShareButtons } from '@/components/ShareButtons'
import { AuthorCard } from '@/components/AuthorCard'
import { TagsSection } from '@/components/TagsSection'

const NewsDetailPage = () => {
    const params = useParams()
    const slug = params.slug as string

    const [newsItem, setNewsItem] = useState<News | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                setLoading(true)

                // Fetch specific news by slug
                const newsResponse = await fetch(`/api/news/slug/${slug}`)
                if (!newsResponse.ok) {
                    if (newsResponse.status === 404) {
                        setError('News article not found')
                    } else {
                        throw new Error('Failed to fetch news')
                    }
                    return
                }
                const foundNews: News = await newsResponse.json()

                if (!foundNews.published) {
                    setError('News article not found')
                    return
                }

                setNewsItem(foundNews)

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                console.error('Error fetching news:', err)
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchNewsDetail()
        }
    }, [slug])

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const calculateReadingTime = (content: string) => {
        const text = content.replace(/<[^>]*>/g, '')
        const wordsPerMinute = 200
        const words = text.trim().split(/\s+/).length
        const time = Math.ceil(words / wordsPerMinute)
        return time
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-rose-500 animate-spin mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Loading news article...</p>
                </div>
            </div>
        )
    }

    if (error || !newsItem) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">News Not Found</h3>
                    <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
                    <Link href="/news">
                        <Button className="bg-rose-500 hover:bg-rose-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to News
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
                    <Link href="/news">
                        <Button variant="ghost" className="text-gray-600 hover:text-rose-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to News
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] w-full">
                {newsItem.image && (
                    <Image
                        src={newsItem.image}
                        alt={newsItem.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-0 right-0">
                    <div className="max-w-4xl mx-auto px-4 md:px-8">
                        {newsItem.category && (
                            <span className="inline-block px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-semibold capitalize mb-4">
                                {newsItem.category.replace('-', ' ')}
                            </span>
                        )}
                        {newsItem.featured && (
                            <span className="inline-block px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-semibold ml-2 mb-4">
                                Featured
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    {newsItem.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-rose-500" />
                        <span className="font-medium">{newsItem.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-rose-500" />
                        <span>{formatDate(newsItem.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-rose-500" />
                        <span>{calculateReadingTime(newsItem.content)} min read</span>
                    </div>
                </div>

                {/* Excerpt */}
                {newsItem.excerpt && (
                    <div className="bg-rose-50 border-l-4 border-rose-500 p-6 mb-8 rounded-r-lg">
                        <p className="text-lg text-gray-700 font-medium italic">
                            {newsItem.excerpt}
                        </p>
                    </div>
                )}

                {/* Main Content using reusable component */}
                <ArticleContent content={newsItem.content} />

                {/* Tags using reusable component */}
                <TagsSection tags={newsItem.tags} />

                {/* Author Info using reusable component */}
                <AuthorCard authorName={newsItem.author} />

                {/* Share Section using reusable component */}
                <ShareButtons url={shareUrl} title={newsItem.title} />

                {/* Back to News Button */}
                <div className="text-center">
                    <Link href="/news">
                        <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to All News
                        </Button>
                    </Link>
                </div>
            </article>
        </div>
    )
}

export default NewsDetailPage
