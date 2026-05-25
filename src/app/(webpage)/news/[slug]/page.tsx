'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Loader2, Newspaper, Clock, Flame } from 'lucide-react'
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
            <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#EC1640] animate-spin mx-auto mb-4" />
                    <p className="text-sm text-slate-500 font-medium">Loading news article...</p>
                </div>
            </div>
        )
    }

    if (error || !newsItem) {
        return (
            <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6">
                <div className="text-center space-y-4 max-w-sm">
                    <Newspaper className="w-12 h-12 text-slate-350 mx-auto" />
                    <h2 className="text-xl font-serif font-semibold text-slate-800">Article Not Found</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">{error || 'The article you are looking for does not exist.'}</p>
                    <Link href="/news" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black hover:bg-[#EC1640] text-white text-xs font-semibold rounded-full shadow-sm transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Back to News
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-slate-900 pt-28 pb-16 px-4 md:px-8">
            <div className="max-w-[850px] mx-auto flex flex-col gap-6">
                {/* Back Link */}
                <div className="flex items-center justify-between pb-2 border-b border-black/10">
                    <Link href="/news" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-black transition-colors group">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Back to News
                    </Link>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#EC1640]">
                        SESA Journal
                    </span>
                </div>

                {/* Main Article Sheet Card */}
                <article className="rounded-[2.5rem] bg-white border border-black/5 shadow-sm p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    {/* Header: Category & Badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        {newsItem.category && (
                            <span className="inline-block px-3 py-1 bg-[#EC1640]/5 text-[#EC1640] border border-[#EC1640]/10 rounded-full text-[10px] uppercase font-bold tracking-[0.2em]">
                                {newsItem.category.replace('-', ' ')}
                            </span>
                        )}
                        {newsItem.featured && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-250/20 rounded-full text-[10px] uppercase font-bold tracking-[0.2em]">
                                <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-normal text-slate-950 leading-[1.15] tracking-tight mb-6">
                        {newsItem.title}
                    </h1>

                    {/* Meta Row */}
                    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-500 font-medium pb-6 mb-8 border-b border-black/5">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#EC1640]/5 text-[#EC1640] border border-[#EC1640]/10 text-[10px] font-bold flex items-center justify-center uppercase">
                                {newsItem.author.slice(0, 2)}
                            </div>
                            <span className="font-bold text-slate-800">{newsItem.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span>{formatDate(newsItem.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-450" />
                            <span>{calculateReadingTime(newsItem.content)} min read</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {newsItem.image && (
                        <div className="relative w-full h-[240px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm my-6 filter grayscale hover:grayscale-0 transition-all duration-750">
                            <Image
                                src={newsItem.image}
                                alt={newsItem.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Excerpt */}
                    {newsItem.excerpt && (
                        <div className="bg-[#F5F2EB] border-l-2 border-[#EADDC9] p-5 md:p-6 my-8 rounded-2xl">
                            <p className="text-base text-slate-700 font-medium italic leading-relaxed">
                                "{newsItem.excerpt}"
                            </p>
                        </div>
                    )}

                    {/* Content */}
                    <div className="my-8">
                        <ArticleContent content={newsItem.content} />
                    </div>

                    {/* Tags Section */}
                    {newsItem.tags && newsItem.tags.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-black/5">
                            <TagsSection tags={newsItem.tags} />
                        </div>
                    )}

                    {/* Author Details Card */}
                    <div className="mt-8">
                        <AuthorCard authorName={newsItem.author} />
                    </div>

                    {/* Share Section */}
                    <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Share Article</span>
                        <ShareButtons url={shareUrl} title={newsItem.title} />
                    </div>
                </article>

                {/* Back to All News Button at the Bottom */}
                <div className="text-center pt-6">
                    <Link href="/news" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black hover:bg-[#EC1640] text-white text-xs font-bold rounded-full shadow-sm hover:scale-[1.02] active:scale-95 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Back to All News
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NewsDetailPage
