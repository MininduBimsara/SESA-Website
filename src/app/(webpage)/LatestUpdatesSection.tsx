import React from 'react'
import { Newspaper, TrendingUp, Award, Code2 } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/prisma'

const getCategoryIcon = (category: string | null) => {
    const categoryLower = category?.toLowerCase() || ''
    if (categoryLower.includes('achievement') || categoryLower.includes('award')) return Award
    if (categoryLower.includes('workshop') || categoryLower.includes('tech')) return Code2
    if (categoryLower.includes('opportunity') || categoryLower.includes('career')) return TrendingUp
    return Newspaper
}

const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
}

type UpdateItem = {
    id: string
    title: string
    content: string
    excerpt: string | null
    slug: string
    category: string | null
    createdAt: Date
    type: 'news' | 'blog'
}

async function getLatestUpdates() {
    try {
        const news = await prisma.news.findMany({
            where: { 
                published: true,
                featured: true 
            },
            orderBy: { createdAt: 'desc' },
            take: 4,
            select: {
                id: true,
                title: true,
                content: true,
                excerpt: true,
                slug: true,
                category: true,
                createdAt: true,
            }
        })

        const blogs = await prisma.blog.findMany({
            where: { 
                published: true,
                featured: true 
            },
            orderBy: { createdAt: 'desc' },
            take: 4,
            select: {
                id: true,
                title: true,
                content: true,
                excerpt: true,
                slug: true,
                category: true,
                createdAt: true,
            }
        })

        const newsWithType: UpdateItem[] = news.map(item => ({ ...item, type: 'news' as const }))
        const blogsWithType: UpdateItem[] = blogs.map(item => ({ ...item, type: 'blog' as const }))
        
        const combined = [...newsWithType, ...blogsWithType]
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 4)

        return combined
    } catch (error) {
        console.error('Failed to fetch latest updates:', error)
        return []
    }
}

const LatestUpdatesSection = async () => {
    const updates = await getLatestUpdates()

    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-8 bg-white">
            {/* White Rounded Container Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 flex flex-col gap-10 md:gap-12 relative overflow-hidden">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                            Latest News
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-none">
                            Latest Updates
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 font-normal">
                            Stay informed about SESA news, blogs, and opportunities.
                        </p>
                    </div>
                    
                    {/* Header CTA Links */}
                    <div className="hidden md:flex items-center gap-4 text-sm font-bold">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-1.5 text-black hover:text-[#EC1640] transition-colors"
                        >
                            <span>View All News</span>
                            <span>→</span>
                        </Link>
                        <span className="text-slate-300">|</span>
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-1.5 text-black hover:text-[#EC1640] transition-colors"
                        >
                            <span>View All Blogs</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>

                {/* Grid of Updates */}
                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {updates.length > 0 ? (
                        updates.map((item) => {
                            const Icon = getCategoryIcon(item.category)
                            const linkPath = item.type === 'blog' ? `/blogs/${item.slug}` : `/news/${item.slug}`
                            return (
                                <Link 
                                    href={linkPath}
                                    key={item.id}
                                    className="bg-slate-50/50 hover:bg-white border border-slate-200/75 hover:border-[#EC1640]/50 rounded-[1.75rem] p-5 md:p-6 hover:shadow-2xl transition-all duration-300 flex items-start gap-4 md:gap-5 group"
                                >
                                    {/* Icon Holder */}
                                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl border border-slate-200 bg-slate-100 text-[#EC1640] flex items-center justify-center flex-shrink-0 group-hover:bg-[#EC1640] group-hover:text-white group-hover:border-[#EC1640] transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div className="flex-grow space-y-2">
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-[10px] font-bold text-[#EC1640] uppercase tracking-wider">
                                                {item.category || (item.type === 'blog' ? 'Blog' : 'News')}
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium">
                                                {getRelativeTime(new Date(item.createdAt))}
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-[1.125rem] font-bold text-black group-hover:text-[#EC1640] transition-colors leading-snug line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-[0.875rem] text-slate-600 leading-relaxed font-normal line-clamp-2">
                                            {item.excerpt || item.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...'}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })
                    ) : (
                        <div className="col-span-2 text-center py-12 text-slate-500">
                            <p>No updates available at this time.</p>
                        </div>
                    )}
                </div>

                {/* Mobile CTA Links */}
                <div className="text-center mt-2 md:hidden">
                    <div className="flex items-center justify-center gap-4 text-xs font-bold">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-1.5 text-black hover:text-[#EC1640] transition-colors"
                        >
                            <span>View All News</span>
                            <span>→</span>
                        </Link>
                        <span className="text-slate-300">|</span>
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-1.5 text-black hover:text-[#EC1640] transition-colors"
                        >
                            <span>View All Blogs</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default LatestUpdatesSection
