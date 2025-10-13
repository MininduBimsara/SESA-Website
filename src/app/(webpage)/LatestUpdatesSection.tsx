import React from 'react'
import { Newspaper, TrendingUp, Award, Code2 } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/prisma'

// Helper function to get icon component based on category
const getCategoryIcon = (category: string | null) => {
    const categoryLower = category?.toLowerCase() || ''
    
    if (categoryLower.includes('achievement') || categoryLower.includes('award')) return Award
    if (categoryLower.includes('workshop') || categoryLower.includes('tech')) return Code2
    if (categoryLower.includes('opportunity') || categoryLower.includes('career')) return TrendingUp
    return Newspaper
}

// Helper function to get color based on category
const getCategoryColor = (category: string | null) => {
    const categoryLower = category?.toLowerCase() || ''
    
    if (categoryLower.includes('achievement') || categoryLower.includes('award')) return 'rose'
    if (categoryLower.includes('workshop') || categoryLower.includes('tech')) return 'blue'
    if (categoryLower.includes('opportunity') || categoryLower.includes('career')) return 'purple'
    return 'green'
}

// Helper function to calculate relative time
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

// Type for combined news and blog items
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
        // Fetch news
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

        // Fetch blogs
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

        // Combine and add type field
        const newsWithType: UpdateItem[] = news.map(item => ({ ...item, type: 'news' as const }))
        const blogsWithType: UpdateItem[] = blogs.map(item => ({ ...item, type: 'blog' as const }))
        
        // Merge, sort by date, and take top 4
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

    const getColorClasses = (color: string) => {
        const colors = {
            rose: 'bg-rose-100 text-rose-600 border-rose-200',
            blue: 'bg-blue-100 text-blue-600 border-blue-200',
            purple: 'bg-purple-100 text-purple-600 border-purple-200',
            green: 'bg-green-100 text-green-600 border-green-200'
        }
        return colors[color as keyof typeof colors]
    }

    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Latest Updates
                        </h2>
                        <p className="text-xl text-gray-600">
                            Stay informed about SESA news, blogs, and opportunities
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold"
                        >
                            View All News
                            <span>→</span>
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold"
                        >
                            View All Blogs
                            <span>→</span>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {updates.length > 0 ? (
                        updates.map((item) => {
                            const Icon = getCategoryIcon(item.category)
                            const color = getCategoryColor(item.category)
                            const linkPath = item.type === 'blog' ? `/blogs/${item.slug}` : `/news/${item.slug}`
                            return (
                                <Link 
                                    href={linkPath}
                                    key={item.id}
                                    className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-200 hover:border-gray-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${getColorClasses(color)} flex items-center justify-center flex-shrink-0 border`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                                    {item.category || (item.type === 'blog' ? 'Blog' : 'News')}
                                                </span>
                                                <span className="text-sm text-gray-400">
                                                    {getRelativeTime(new Date(item.createdAt))}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 line-clamp-2">
                                                {item.excerpt || item.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    ) : (
                        <div className="col-span-2 text-center py-12 text-gray-500">
                            <p>No updates available at this time.</p>
                        </div>
                    )}
                </div>

                <div className="text-center mt-10 md:hidden">
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold"
                        >
                            View All News
                            <span>→</span>
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold"
                        >
                            View All Blogs
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LatestUpdatesSection
