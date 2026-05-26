'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
    Search, 
    ArrowRight, 
    Newspaper, 
    Award, 
    Users, 
    Briefcase, 
    TrendingUp, 
    ExternalLink, 
    MessageSquare,
    Clock,
    Flame,
    ArrowUpRight,
    Send,
    BookOpen
} from 'lucide-react'
import LoadingAnimation from '@/components/LoadingAnimation'
import { YoutubeIcon, FacebookIcon } from '@/components/icons/SocialIcons'
import { Button } from '@/components/ui/button'
import type { News } from '@/types/news'
import type { Blog } from '@/types/blog'

type NewsCategory = 'all' | 'achievements' | 'announcements' | 'partnerships' | 'student-spotlight' | 'media'

const categories = [
    { value: 'all', label: 'All News', icon: Newspaper },
    { value: 'achievements', label: 'Achievements', icon: Award },
    { value: 'announcements', label: 'Announcements', icon: TrendingUp },
    { value: 'partnerships', label: 'Partnerships', icon: Briefcase },
    { value: 'student-spotlight', label: 'Student Spotlight', icon: Users },
    { value: 'media', label: 'Media Coverage', icon: ExternalLink }
]

const XIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const DEFAULT_MOCK_NEWS: News[] = [
    {
        id: 'mock-1',
        title: 'Turn Your Devices From Distractions Into Time Savers Either',
        content: '<p>Every January, I usually purge old snail mail, clothes and unwanted knickknacks to start the year anew. This time, I focused on my digital spaces instead. My virtual Marie Kondo-ing forced me to think about the indispensable apps and features on my devices—and on the flip side, the time thieves that make it hard to leave the couch.</p>',
        excerpt: 'Every January, I usually purge old snail mail, clothes and unwanted knickknacks to start the year anew. This time, I focused on my digital spaces instead.',
        slug: 'turn-your-devices-from-distractions-into-time-savers',
        author: 'Yagami Souichirou',
        featured: true,
        published: true,
        image: '/news-ferris-wheel.png',
        category: 'announcements',
        tags: ['productivity', 'focus', 'digital-health'],
        createdAt: new Date('2026-01-30T10:00:00Z'),
        updatedAt: new Date('2026-01-30T10:00:00Z')
    },
    {
        id: 'mock-2',
        title: 'Draw Inspiration From Vibrancy',
        content: '<p>Exploring the intersection between code semantics and design vibrancy. Highlighting how frontend developer toolkits are evolving to enable rich user experiences and modern micro-animations that make web applications feel responsive and alive.</p>',
        excerpt: 'Exploring the intersection between code semantics and design vibrancy. Highlighting how frontend developer toolkits are evolving.',
        slug: 'draw-inspiration-from-vibrancy',
        author: 'Lind Tailor',
        featured: false,
        published: true,
        image: '/news-winter-tree.png',
        category: 'student-spotlight',
        tags: ['design', 'frontend', 'inspiration'],
        createdAt: new Date('2026-01-28T09:00:00Z'),
        updatedAt: new Date('2026-01-28T09:00:00Z')
    },
    {
        id: 'mock-3',
        title: 'SESA Collaborations Expand as Core Tech Partnerships Grow',
        content: '<p>Hours after the Senate passed the measure, the House followed suit. The bill will now go to President Biden. SESA partnerships have achieved a new milestone, introducing key guest lectures and mentorship opportunities with local tech hubs and industry leaders. A dozen academic and corporate partners ground their support to build a robust tech ecosystem for upcoming student developments.</p>',
        excerpt: 'SESA partnerships have achieved a new milestone, introducing key guest lectures and mentorship opportunities with local tech hubs and industry leaders.',
        slug: 'sesa-collaborations-expand',
        author: 'Alexa Ruyk',
        featured: false,
        published: true,
        image: '/placeholder-news.jpg',
        category: 'partnerships',
        tags: ['partnerships', 'industry', 'collaboration'],
        createdAt: new Date('2026-01-27T08:00:00Z'),
        updatedAt: new Date('2026-01-27T08:00:00Z')
    },
    {
        id: 'mock-4',
        title: 'What Happens to Privacy in the New Age of AI',
        content: '<p>As large language models become deeply integrated into daily developer environments, questions of data privacy, secure local execution, and open-source models emerge. We review the latest trends in offline AI execution and what it means for enterprise developers.</p>',
        excerpt: 'As large language models become deeply integrated into daily developer environments, questions of data privacy and secure local execution emerge.',
        slug: 'privacy-in-the-age-of-ai',
        author: 'Marcus Aurelius',
        featured: false,
        published: true,
        image: '/news-privacy-ai.png',
        category: 'media',
        tags: ['ai', 'privacy', 'security'],
        createdAt: new Date('2026-01-25T11:00:00Z'),
        updatedAt: new Date('2026-01-25T11:00:00Z')
    }
]

const FALLBACK_BLOGS: Blog[] = [
    {
        id: 'fallback-1',
        title: 'The Future of Work: 5 Strategies for Building Resilient, High-Performing Teams',
        content: '<p>Explore practical strategies to help your organization adapt, collaborate, and thrive.</p>',
        excerpt: 'Explore practical strategies to help your organization adapt, collaborate, and thrive in an ever-changing world of work.',
        slug: 'future-of-work-strategies-for-resilient-teams',
        author: 'SESA Editorial Team',
        featured: true,
        published: true,
        category: 'career',
        tags: ['leadership', 'culture', 'strategy'],
        readTime: '6 min read',
        createdAt: new Date('2026-05-12T12:00:00Z'),
        updatedAt: new Date('2026-05-12T12:00:00Z')
    },
    {
        id: 'fallback-2',
        title: 'Streamlining Operations: How Automation Drives Scalable Growth',
        content: '<p>Discover how automation can eliminate manual tasks and reduce costs.</p>',
        excerpt: 'Discover how automation can eliminate manual tasks, reduce costs, and create the foundation for long-term, sustainable growth.',
        slug: 'streamlining-operations-automation-drives-growth',
        author: 'SESA Editorial Team',
        featured: true,
        published: true,
        category: 'technical',
        tags: ['automation', 'systems', 'ops'],
        readTime: '5 min read',
        createdAt: new Date('2026-05-08T12:00:00Z'),
        updatedAt: new Date('2026-05-08T12:00:00Z')
    },
    {
        id: 'fallback-3',
        title: 'Turning Data Into Decisions: A Practical Guide for Business Leaders',
        content: '<p>Learn how to build a data-driven culture and make faster business decisions.</p>',
        excerpt: 'Learn how to build a data-driven culture and leverage analytics to make smarter, faster business decisions.',
        slug: 'turning-data-into-decisions-business-leaders',
        author: 'SESA Editorial Team',
        featured: false,
        published: true,
        category: 'events',
        tags: ['data', 'analytics', 'insight'],
        readTime: '7 min read',
        createdAt: new Date('2026-05-03T12:00:00Z'),
        updatedAt: new Date('2026-05-03T12:00:00Z')
    }
]

const NewsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [newsItems, setNewsItems] = useState<News[]>([])
    const [blogPosts, setBlogPosts] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        const fetchNewsAndBlogs = async () => {
            try {
                setLoading(true)
                const [newsRes, blogsRes] = await Promise.all([
                    fetch('/api/news'),
                    fetch('/api/blogs')
                ])
                if (!newsRes.ok) {
                    throw new Error('Failed to fetch news')
                }
                if (!blogsRes.ok) {
                    throw new Error('Failed to fetch blogs')
                }
                const newsData = await newsRes.json()
                const blogsData = await blogsRes.json()
                
                const publishedNews = newsData.filter((item: News) => item.published)
                const publishedBlogs = Array.isArray(blogsData)
                    ? blogsData.filter((item: Blog) => item.published)
                    : []
                
                setNewsItems(publishedNews)
                setBlogPosts(publishedBlogs)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchNewsAndBlogs()
    }, [])

    const filteredNews = newsItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category?.toLowerCase() === selectedCategory
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const getReadingTime = (content: string) => {
        const text = content.replace(/<[^>]*>/g, '')
        const words = text.trim().split(/\s+/).length
        const wpm = 225
        const time = Math.ceil(words / wpm)
        return `${time} min read`
    }

    const getCommentCount = (title: string) => {
        return (title.length % 27) + 12
    }

    const renderHighlightedTitle = (title: string, highlightStyle: 'red' | 'beige' = 'red') => {
        const lowerTitle = title.toLowerCase()
        let matchWords: string[] = []
        
        if (lowerTitle.includes('distractions')) {
            matchWords = ['distractions']
        } else if (lowerTitle.includes('collaborations expand')) {
            matchWords = ['collaborations', 'expand']
        } else if (lowerTitle.includes('shutdown as')) {
            matchWords = ['shutdown', 'as']
        } else if (lowerTitle.includes('vibrancy')) {
            matchWords = ['vibrancy']
        }
        
        if (matchWords.length > 0) {
            const words = title.split(' ')
            const indices: number[] = []
            
            words.forEach((w, idx) => {
                const cleanW = w.toLowerCase().replace(/[^a-z0-9]/g, '')
                if (matchWords.includes(cleanW)) {
                    indices.push(idx)
                }
            })
            
            if (indices.length > 0) {
                const firstIdx = indices[0]
                const lastIdx = indices[indices.length - 1]
                const before = words.slice(0, firstIdx).join(' ')
                const highlighted = words.slice(firstIdx, lastIdx + 1).join(' ')
                const after = words.slice(lastIdx + 1).join(' ')
                
                if (highlightStyle === 'red') {
                    return (
                        <>
                            {before} <span className="bg-[#11112A] text-[#FCFCFC] px-2.5 py-0.5 inline-block transform -rotate-1 rounded-sm font-sans font-bold text-[95%]">{highlighted}</span> {after}
                        </>
                    )
                } else {
                    return (
                        <>
                            {before} <span className="bg-[#D2D2D2] text-[#11112A] px-2 py-0.5 rounded-sm mx-0.5 font-sans font-bold text-[95%] inline-block">{highlighted}</span> {after}
                        </>
                    )
                }
            }
        }
        
        // Fallback: highlight a middle word
        const words = title.split(' ')
        if (words.length <= 2) return title
        const midIdx = Math.floor(words.length / 2)
        const before = words.slice(0, midIdx).join(' ')
        const highlighted = words[midIdx]
        const after = words.slice(midIdx + 1).join(' ')
        
        if (highlightStyle === 'red') {
            return (
                <>
                    {before} <span className="bg-[#11112A] text-[#FCFCFC] px-2 py-0.5 inline-block transform -rotate-1 rounded-sm font-sans font-bold text-[95%]">{highlighted}</span> {after}
                </>
            )
        } else {
            return (
                <>
                    {before} <span className="bg-[#D2D2D2] text-[#11112A] px-1.5 py-0.5 rounded-sm mx-0.5 font-sans font-bold text-[95%] inline-block">{highlighted}</span> {after}
                </>
            )
        }
    }

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newsletterEmail) {
            setSubscribed(true)
            setNewsletterEmail('')
            setTimeout(() => setSubscribed(false), 5000)
        }
    }

    if (loading) {
        return <LoadingAnimation text="Loading SESA news..." />
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center p-6">
                <div className="text-center space-y-4 max-w-sm">
                    <Newspaper className="w-12 h-12 text-[#D2D2D2] mx-auto" />
                    <h2 className="text-xl font-bold font-sans text-[#11112A]">Error Loading News</h2>
                    <p className="text-[#32324E] text-sm">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-[#11112A] hover:bg-[#32324E] text-[#FCFCFC] rounded-xl py-2 px-5 text-xs font-semibold">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    // Build the bento grid display articles. 
    // We take dynamic articles first, and fill up to 4 using defaults to maintain the layout aesthetic.
    const displayNews = [...filteredNews]
    if (displayNews.length < 4) {
        const usedSlugs = new Set(displayNews.map(item => item.slug))
        for (const mockItem of DEFAULT_MOCK_NEWS) {
            if (!usedSlugs.has(mockItem.slug) && displayNews.length < 4) {
                displayNews.push(mockItem)
            }
        }
    }

    // Dynamic stats calculations
    const totalArticles = newsItems.length > 0 ? newsItems.length : 24
    const uniqueAuthors = newsItems.length > 0 ? new Set(newsItems.map(item => item.author)).size : 8
    
    // Blogs to display
    const displayBlogs = blogPosts.length > 0 ? blogPosts.slice(0, 3) : FALLBACK_BLOGS.slice(0, 3)

    // Remaining news items that are not shown in the top 4 bento cards
    const overflowNews = filteredNews.slice(4)

    return (
        <div className="w-full min-h-screen bg-[#FCFCFC] px-3 pt-24 pb-12 md:px-6 lg:px-8 md:pt-32 flex flex-col gap-6 md:gap-8 transition-colors duration-300">
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
                {/* Hero / Header Section */}
                <section 
                    className="relative w-full rounded-[32px] overflow-hidden border border-[#D2D2D2] shadow-sm bg-cover bg-center py-20 px-6 md:px-10 lg:px-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                    style={{ backgroundImage: `url('/tech_watercolor_bg.png')` }}
                >
                    <div className="absolute inset-0 bg-[#FCFCFC]/35 pointer-events-none backdrop-blur-[1px]" />
                    <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#11112A]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#11112A] animate-pulse" />
                            SESA EDITORIAL
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-sans text-[#11112A] leading-[1.15] tracking-tight max-w-2xl mx-auto">
                            The SESA Journal
                        </h1>
                        <p className="text-sm md:text-base text-[#32324E] max-w-xl mx-auto font-medium mt-4">
                            Discover stories, breakthroughs, academic updates, and partnerships from the Software Engineering Students' Association.
                        </p>
                    </div>
                </section>

                {/* Search and Filters Card */}
                <section className="bg-[#FCFCFC] rounded-[2rem] border border-[#D2D2D2] shadow-sm p-6 md:p-8 relative overflow-hidden flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Categories List */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
                            {categories.map((cat) => {
                                const Icon = cat.icon
                                const isActive = selectedCategory === cat.value
                                return (
                                    <button
                                        key={cat.value}
                                        onClick={() => setSelectedCategory(cat.value as NewsCategory)}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                                            isActive
                                                ? 'bg-[#11112A] text-[#FCFCFC] shadow-sm'
                                                : 'bg-[#FCFCFC] text-[#32324E] hover:bg-[#D2D2D2]/25 border border-[#D2D2D2]'
                                        }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        {cat.label}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full lg:max-w-xs">
                            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-xs bg-[#FCFCFC] border border-[#D2D2D2] text-[#11112A] rounded-full focus:ring-1 focus:ring-[#11112A] outline-none transition-shadow"
                            />
                        </div>
                    </div>
                </section>

                {searchQuery && (
                    <div className="text-xs text-[#32324E]/80 font-medium">
                        Showing results for "{searchQuery}" under {categories.find(c => c.value === selectedCategory)?.label} ({filteredNews.length} articles found)
                    </div>
                )}

                {/* Bento Grid Editorial Layout */}
                {displayNews.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* COLUMN 1: Main Highlight Card (Spans 6) */}
                        {displayNews[0] && (
                            <article className="lg:col-span-6 rounded-[2rem] bg-[#FCFCFC] border border-[#D2D2D2] shadow-sm p-6 md:p-8 overflow-hidden min-h-[580px] md:min-h-[640px] flex flex-col justify-between group hover:shadow-md transition-all duration-300 relative">
                                {/* Ferris wheel background style */}
                                <div className="absolute inset-0 opacity-15 pointer-events-none filter grayscale transition-all duration-500 group-hover:opacity-20 group-hover:scale-105 group-hover:grayscale-0">
                                    <Image 
                                        src={displayNews[0].image || '/news-ferris-wheel.png'} 
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <div className="relative z-10">
                                    {/* Author & Date Header */}
                                    <div className="flex items-center gap-1.5 text-xs text-[#32324E]/80 mb-6 font-medium">
                                        <span className="font-bold text-[#11112A] tracking-wide">{displayNews[0].author}</span>
                                        <span>•</span>
                                        <span>{formatDate(displayNews[0].createdAt)}</span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold font-sans text-[#11112A] leading-[1.1] tracking-tight my-6 hover:text-[#32324E] transition-colors">
                                        <Link href={`/news/${displayNews[0].slug}`}>
                                            {renderHighlightedTitle(displayNews[0].title, 'red')}
                                        </Link>
                                    </h2>

                                    {/* Content Excerpt */}
                                    <p className="text-[#32324E]/90 text-sm md:text-base leading-relaxed mb-6 font-normal max-w-xl">
                                        {displayNews[0].excerpt || displayNews[0].content.substring(0, 180).replace(/<[^>]*>/g, '') + '...'}
                                    </p>
                                </div>

                                {/* Footer stats / metadata */}
                                <div className="relative z-10 border-t border-[#D2D2D2]/50 pt-5 flex items-center gap-6">
                                    <div className="flex items-center gap-1.5 text-[#32324E]/80 text-xs font-semibold">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>{getCommentCount(displayNews[0].title)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[#32324E]/80 text-xs font-semibold">
                                        <Clock className="w-4 h-4" />
                                        <span>{getReadingTime(displayNews[0].content)}</span>
                                    </div>
                                </div>
                            </article>
                        )}

                        {/* COLUMN 2: Spans 3 */}
                        <div className="lg:col-span-3 flex flex-col gap-8">
                            {/* Card 2: Minimal Centered Thumbnail Article */}
                            {displayNews[1] && (
                                <article className="rounded-[2rem] bg-[#FCFCFC] border border-[#D2D2D2] shadow-sm p-6 flex flex-col justify-between min-h-[350px] group hover:shadow-md transition-all duration-300">
                                    <div>
                                        {/* Author & Date */}
                                        <div className="flex items-center gap-1 text-[10px] text-[#32324E]/70 mb-3 font-bold">
                                            <span className="text-[#11112A]">{displayNews[1].author}</span>
                                            <span>•</span>
                                            <span>{formatDate(displayNews[1].createdAt)}</span>
                                        </div>

                                        {/* Centered Grayscale Image */}
                                        <div className="relative w-full h-32 rounded-2xl overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-500 my-3">
                                            <Image 
                                                src={displayNews[1].image || '/news-winter-tree.png'} 
                                                alt=""
                                                fill
                                                sizes="(max-width: 768px) 100vw, 25vw"
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-base md:text-lg font-bold font-sans text-[#11112A] leading-snug group-hover:text-[#32324E] transition-colors mt-2">
                                            <Link href={`/news/${displayNews[1].slug}`}>
                                                {displayNews[1].title}
                                            </Link>
                                        </h3>
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-[#D2D2D2]/50 pt-4 mt-4 flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-[#32324E]/80 text-[11px] font-semibold">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            <span>{getCommentCount(displayNews[1].title)}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[#32324E]/80 text-[11px] font-semibold">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{getReadingTime(displayNews[1].content)}</span>
                                        </div>
                                    </div>
                                </article>
                            )}

                            {/* Card 3: SESA Tide of Thoughts / Insights Stats */}
                            <div className="rounded-[2rem] bg-[#FCFCFC] border border-[#D2D2D2] p-6 shadow-sm min-h-[160px] flex flex-col justify-between">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-wider font-semibold text-[#32324E]/80">Tide of Thoughts</h4>
                                    <p className="text-xs text-[#32324E] mt-2 leading-relaxed font-normal">
                                        Get the SESA Hub opinions, workshop reviews, editor columns, and academic logs.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 border-t border-[#D2D2D2]/50 pt-3.5 mt-3">
                                    <div className="flex items-center gap-1.5 text-xs text-[#11112A] font-bold">
                                        <BookOpen className="w-3.5 h-3.5 text-[#32324E]" />
                                        <span>{totalArticles} articles</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-[#11112A] font-bold">
                                        <Users className="w-3.5 h-3.5 text-[#32324E]" />
                                        <span>{uniqueAuthors} authors</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Social Channels Grid */}
                            <div className="rounded-[2rem] bg-[#FCFCFC] border border-[#D2D2D2] shadow-sm p-5 flex flex-col gap-4">
                                <div className="grid grid-cols-4 gap-2">
                                    <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="bg-[#FCFCFC] border border-[#D2D2D2] text-[#11112A] hover:bg-[#11112A] hover:text-[#FCFCFC] rounded-2xl p-3 flex items-center justify-center hover:scale-105 transition-transform" aria-label="Discord">
                                        <Send className="w-4 h-4 transform rotate-[320deg] translate-y-[-1px] translate-x-[-1px]" />
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-[#FCFCFC] border border-[#D2D2D2] text-[#11112A] hover:bg-[#11112A] hover:text-[#FCFCFC] rounded-2xl p-3 flex items-center justify-center hover:scale-105 transition-transform" aria-label="YouTube">
                                        <YoutubeIcon className="w-4 h-4" />
                                    </a>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-[#FCFCFC] border border-[#D2D2D2] text-[#11112A] hover:bg-[#11112A] hover:text-[#FCFCFC] rounded-2xl p-3 flex items-center justify-center hover:scale-105 transition-transform" aria-label="Facebook">
                                        <FacebookIcon className="w-4 h-4" />
                                    </a>
                                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="bg-[#FCFCFC] border border-[#D2D2D2] text-[#11112A] hover:bg-[#11112A] hover:text-[#FCFCFC] rounded-2xl p-3 flex items-center justify-center hover:scale-105 transition-transform" aria-label="X">
                                        <XIcon />
                                    </a>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-[#32324E]/80 font-bold px-1">
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#11112A] animate-ping" />
                                        <span>32:13 PLAYTIME</span>
                                    </div>
                                    <div>98,076 FOLLOWERS</div>
                                </div>
                            </div>

                            {/* Card 5: Bottom Dark Card */}
                            {displayNews[3] && (
                                <article className="rounded-[2rem] bg-[#11112A] text-white p-5 min-h-[140px] flex flex-col justify-between group hover:shadow-md transition-all duration-300 relative overflow-hidden">
                                    {/* Waves background */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                                        <Image 
                                            src={displayNews[3].image || '/news-privacy-ai.png'} 
                                            alt=""
                                            fill
                                            sizes="25vw"
                                            className="object-cover object-bottom"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-[#11112A]/60" />

                                    <div className="relative z-10">
                                        <h3 className="text-sm font-bold font-sans text-slate-100 group-hover:text-[#32324E] transition-colors leading-snug max-w-[85%]">
                                            <Link href={`/news/${displayNews[3].slug}`}>
                                                {displayNews[3].title}
                                            </Link>
                                        </h3>
                                    </div>

                                    <div className="relative z-10 flex justify-between items-center pt-2">
                                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">TECH BRIEF</span>
                                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            <span>{getCommentCount(displayNews[3].title)}</span>
                                        </div>
                                    </div>
                                </article>
                            )}
                        </div>

                        {/* COLUMN 3: Spans 3 */}
                        <div className="lg:col-span-3 flex flex-col gap-8">
                            {/* Card 6: Author Profile + Beige Highlight Header Article */}
                            {displayNews[2] && (
                                <article className="rounded-[2rem] bg-[#FCFCFC] border border-[#D2D2D2] shadow-sm p-6 flex flex-col justify-between min-h-[350px] group hover:shadow-md transition-all duration-300">
                                    <div>
                                        {/* Author profile & flame icon */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-[#11112A]/5 text-[#11112A] border border-[#11112A]/10 text-xs font-bold flex items-center justify-center uppercase">
                                                    {displayNews[2].author.slice(0, 2)}
                                                </div>
                                                <span className="font-bold text-[#11112A] text-xs tracking-tight">{displayNews[2].author}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Flame className="w-4 h-4 text-[#11112A] animate-pulse fill-[#11112A]" />
                                                <Link href={`/news/${displayNews[2].slug}`} className="w-6 h-6 rounded-full bg-[#FCFCFC] border border-[#D2D2D2] flex items-center justify-center hover:bg-[#D2D2D2]/25">
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-[#32324E]" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold font-sans text-[#11112A] leading-snug hover:text-[#32324E] transition-colors my-3">
                                            <Link href={`/news/${displayNews[2].slug}`}>
                                                {renderHighlightedTitle(displayNews[2].title, 'beige')}
                                            </Link>
                                        </h3>

                                        {/* Description Excerpt */}
                                        <p className="text-[#32324E]/80 text-xs leading-relaxed line-clamp-3">
                                            {displayNews[2].excerpt || displayNews[2].content.substring(0, 130).replace(/<[^>]*>/g, '') + '...'}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-[#D2D2D2]/50 pt-4 mt-4 flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-[#32324E]/80 text-[11px] font-semibold">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            <span>{getCommentCount(displayNews[2].title)}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[#32324E]/80 text-[11px] font-semibold">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{getReadingTime(displayNews[2].content)}</span>
                                        </div>
                                    </div>
                                </article>
                            )}

                            {/* Card 7: Latest from SESA Blog */}
                            <div className="rounded-[2rem] bg-[#FCFCFC] border border-[#D2D2D2] shadow-sm p-6 flex flex-col justify-between min-h-[300px] group hover:border-[#11112A]/25 transition-all duration-300">
                                <div>
                                    <div className="flex items-center justify-between border-b border-[#D2D2D2]/50 pb-3 mb-4">
                                        <h3 className="text-xs uppercase tracking-wider font-bold text-[#32324E]/70">Latest Blogs</h3>
                                        <BookOpen className="w-4 h-4 text-[#11112A]" />
                                    </div>
                                    <ul className="flex flex-col gap-4">
                                        {displayBlogs.map((blog) => (
                                            <li key={blog.id} className="group/item border-b border-[#D2D2D2]/50 last:border-b-0 pb-3 last:pb-0">
                                                <Link href={`/blogs/${blog.slug}`} className="block">
                                                    <h4 className="text-xs font-semibold leading-snug text-[#11112A] group-hover/item:text-[#32324E] transition-colors line-clamp-2">
                                                        {blog.title}
                                                    </h4>
                                                    <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-[#32324E]/70 font-medium">
                                                        <span>{blog.author}</span>
                                                        <span>•</span>
                                                        <span>{blog.readTime || getReadingTime(blog.content)}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="border-t border-[#D2D2D2]/50 pt-3.5 mt-3">
                                    <Link href="/blogs" className="text-[10px] uppercase font-bold text-[#32324E] hover:text-[#11112A] transition-colors flex items-center gap-1">
                                        Explore SESA Blog <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>

                            {/* Card 8: SESA Newsletter Sign Up Card */}
                            <div className="rounded-[2rem] bg-[#FCFCFC] border border-[#D2D2D2] shadow-sm p-6 flex flex-col justify-between min-h-[145px] group hover:border-[#11112A]/30 transition-colors">
                                <div>
                                    <h3 className="text-base font-bold font-sans text-[#11112A] leading-tight">Get SESA Journal</h3>
                                    <p className="text-[11px] text-[#32324E]/80 mt-1 leading-normal">
                                        Join for tech workshops, academic alerts, and careers.
                                    </p>
                                </div>

                                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 items-center mt-4">
                                    <input 
                                        type="email" 
                                        placeholder={subscribed ? "Subscribed! ✓" : "Enter your email..."}
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        disabled={subscribed}
                                        className="flex-1 bg-[#FCFCFC] border border-[#D2D2D2] text-[#11112A] text-[11px] px-3 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-[#11112A] disabled:bg-[#D2D2D2]/20 disabled:text-[#32324E] disabled:border-[#D2D2D2]/35 transition-all"
                                        required
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={subscribed}
                                        className="w-8 h-8 rounded-full bg-[#11112A] text-[#FCFCFC] flex items-center justify-center hover:bg-[#32324E] hover:scale-105 transition-all flex-shrink-0 disabled:bg-[#D2D2D2] disabled:text-[#32324E]"
                                        aria-label="Subscribe"
                                    >
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#FCFCFC] rounded-[2rem] border border-[#D2D2D2] shadow-sm space-y-4">
                        <Newspaper className="w-12 h-12 text-[#D2D2D2] mx-auto" />
                        <h3 className="text-xl font-bold font-sans text-[#11112A]">No news articles found</h3>
                        <p className="text-[#32324E] text-xs max-w-xs mx-auto">Try adjusting your filters or search query.</p>
                    </div>
                )}

                {/* Overflow Articles Section: Shown if matching search/category has > 4 articles */}
                {overflowNews.length > 0 && (
                    <section className="border-t border-[#D2D2D2]/50 pt-12 mt-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold font-sans text-[#11112A]">More Articles</h2>
                            <p className="text-xs text-[#32324E] font-medium">Showing {overflowNews.length} additional matching {overflowNews.length === 1 ? 'article' : 'articles'}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {overflowNews.map((item) => (
                                <article key={item.id} className="rounded-3xl bg-[#FCFCFC] border border-[#D2D2D2] shadow-sm p-5 flex flex-col justify-between min-h-[300px] group hover:shadow-md transition-all duration-300">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-[#32324E]/80 mb-3 font-semibold">
                                            <span className="font-bold text-[#11112A]">{item.author}</span>
                                            <span>•</span>
                                            <span>{formatDate(item.createdAt)}</span>
                                        </div>

                                        {item.image && (
                                            <div className="relative w-full h-32 rounded-2xl overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-500 my-2">
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 30vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}

                                        <h3 className="text-base font-bold font-sans text-[#11112A] leading-snug group-hover:text-[#32324E] transition-colors mt-2">
                                            <Link href={`/news/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h3>
                                        
                                        <p className="text-[#32324E]/80 text-xs leading-relaxed line-clamp-2 mt-2 font-normal">
                                            {item.excerpt || item.content.substring(0, 110).replace(/<[^>]*>/g, '') + '...'}
                                        </p>
                                    </div>

                                    <div className="border-t border-[#D2D2D2]/50 pt-3.5 mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-[#32324E]/80 text-[11px] font-semibold">
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                <span>{getCommentCount(item.title)}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[#32324E]/80 text-[11px] font-semibold">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{getReadingTime(item.content)}</span>
                                            </div>
                                        </div>
                                        <Link href={`/news/${item.slug}`} className="text-[#11112A] hover:text-[#32324E] text-xs font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                            Read More <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default NewsPage
