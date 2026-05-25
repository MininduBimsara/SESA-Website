import React from 'react'
import { Newspaper, TrendingUp, Award, Code2 } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import LatestUpdatesScroll from './LatestUpdatesScroll'

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

    return <LatestUpdatesScroll updates={updates} />
}

export default LatestUpdatesSection
