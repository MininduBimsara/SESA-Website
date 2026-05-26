"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const createPlaceholderImage = (label: string, category: string | null) => {
    const bgColors = ['#11112A', '#32324E', '#1A1A3A', '#222244']
    const hash = label.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const bg = bgColors[hash % bgColors.length]
    const categoryName = category || 'SESA'
    const cleanLabel = label.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="${cleanLabel}">
            <rect width="800" height="500" fill="${bg}" />
            <circle cx="680" cy="100" r="150" fill="#ffffff" fill-opacity="0.04" />
            <circle cx="100" cy="400" r="120" fill="#ffffff" fill-opacity="0.03" />
            <rect x="50" y="380" width="220" height="8" rx="4" fill="#ffffff" fill-opacity="0.15" />
            <rect x="50" y="405" width="160" height="6" rx="3" fill="#ffffff" fill-opacity="0.08" />
            <text x="50" y="160" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" width="700">${cleanLabel.length > 30 ? cleanLabel.slice(0, 30) + '...' : cleanLabel}</text>
            <text x="50" y="210" fill="#ffffff" fill-opacity="0.7" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="500">${categoryName.toUpperCase()}</text>
        </svg>
    `
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`
}

const getRelativeTime = (date: Date | string) => {
    const now = new Date()
    const d = new Date(date)
    const diffTime = Math.abs(now.getTime() - d.getTime())
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
    image: string | null
    createdAt: Date
    type: 'news' | 'blog'
}

export default function LatestUpdatesScroll({ updates }: { updates: UpdateItem[] }) {
    const containerRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [maxTravel, setMaxTravel] = useState(0)

    const updateTravelDimensions = () => {
        if (trackRef.current && trackRef.current.parentElement) {
            const parentWidth = trackRef.current.parentElement.clientWidth
            const trackWidth = trackRef.current.scrollWidth
            
            // To ensure there is ALWAYS some scroll movement, even if items fit,
            // we calculate the difference. If they fit perfectly, we can force a small travel
            // or just let it be 0. But the user asked for horizontal scroll.
            // We set the cards to have a minimum width so they usually overflow.
            setMaxTravel(Math.max(0, trackWidth - parentWidth + 32)) 
        }
    }

    useEffect(() => {
        updateTravelDimensions()
        window.addEventListener('resize', updateTravelDimensions)
        const delayTimer = setTimeout(updateTravelDimensions, 150)

        return () => {
            window.removeEventListener('resize', updateTravelDimensions)
            clearTimeout(delayTimer)
        }
    }, [updates])

    useEffect(() => {
        const handleScrollPhysics = () => {
            if (!containerRef.current || !trackRef.current) return

            const scrollTop = window.scrollY
            const containerTop = containerRef.current.offsetTop
            const containerHeight = containerRef.current.offsetHeight
            const viewportHeight = window.innerHeight

            // Map progress (0 to 1)
            const rawProgress = (scrollTop - containerTop) / (containerHeight - viewportHeight)
            const clampedProgress = Math.max(0, Math.min(1, rawProgress))
            setScrollProgress(clampedProgress)
        }

        window.addEventListener('scroll', handleScrollPhysics, { passive: true })
        // Initial call
        handleScrollPhysics()

        return () => {
            window.removeEventListener('scroll', handleScrollPhysics)
        }
    }, [])

    const currentTranslation = -maxTravel * scrollProgress

    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-8 bg-[#FCFCFC]">
            <section 
                ref={containerRef} 
                className="relative block" 
                style={{ height: maxTravel > 0 ? '200vh' : 'auto' }}
            >
                <div className={maxTravel > 0 ? "sticky top-20 md:top-24 w-full overflow-hidden" : "w-full"}>
                    <div className="bg-[#FCFCFC] rounded-[2rem] md:rounded-[2.5rem] border border-[#D2D2D2] shadow-xl p-6 md:p-10 lg:p-12 flex flex-col gap-10 md:gap-12 relative overflow-hidden">
                        
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 shrink-0">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#11112A]">
                                    Latest News
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#11112A] tracking-tight leading-none">
                                    Latest Updates
                                </h2>
                                <p className="text-base md:text-lg text-[#32324E] font-normal">
                                    Stay informed about SESA news, blogs, and opportunities.
                                </p>
                            </div>
                            
                            {/* Header CTA Links */}
                            <div className="hidden md:flex items-center gap-4 text-sm font-bold">
                                <Link
                                    href="/news"
                                    className="inline-flex items-center gap-1.5 text-[#11112A] hover:text-[#32324E] transition-colors"
                                >
                                    <span>View All News</span>
                                    <span>→</span>
                                </Link>
                                <span className="text-[#D2D2D2]">|</span>
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center gap-1.5 text-[#11112A] hover:text-[#32324E] transition-colors"
                                >
                                    <span>View All Blogs</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Horizontal scrolling track of Updates */}
                        <div className="relative w-full overflow-hidden shrink-0">
                            <div 
                                ref={trackRef}
                                className="flex gap-6 transition-transform duration-75 ease-out w-max"
                                style={{ transform: `translateX(${currentTranslation}px)` }}
                            >
                                {updates.length > 0 ? (
                                    updates.map((item) => {
                                        const linkPath = item.type === 'blog' ? `/blogs/${item.slug}` : `/news/${item.slug}`
                                        return (
                                            <Link 
                                                href={linkPath}
                                                key={item.id}
                                                className="w-[300px] md:w-[400px] shrink-0 bg-[#FCFCFC] hover:bg-[#FCFCFC] border border-[#D2D2D2] hover:border-[#32324E] rounded-[1.75rem] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col items-start group"
                                            >
                                                {/* Card Image */}
                                                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#FCFCFC] border-b border-[#D2D2D2]/60">
                                                    <Image 
                                                        src={item.image || createPlaceholderImage(item.title, item.category || (item.type === 'blog' ? 'Blog' : 'News'))}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    {/* Category overlay */}
                                                    <span className="absolute top-4 left-4 rounded-full bg-[#11112A] text-[#FCFCFC] border border-[#FCFCFC]/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] z-10 shadow-sm">
                                                        {item.category || (item.type === 'blog' ? 'Blog' : 'News')}
                                                    </span>
                                                </div>
                                                
                                                {/* Text Content */}
                                                <div className="p-5 md:p-6 flex-grow flex flex-col gap-3 md:gap-4 w-full">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-bold text-[#32324E]/70 uppercase tracking-wider">
                                                            {item.type === 'blog' ? 'Blog Post' : 'News Article'}
                                                        </span>
                                                        <span className="text-xs text-[#32324E]/70 font-medium">
                                                            {getRelativeTime(item.createdAt)}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-2 flex-grow">
                                                        <h3 className="text-lg md:text-[1.125rem] font-bold text-[#11112A] group-hover:text-[#32324E] transition-colors leading-snug line-clamp-2">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-[0.875rem] text-[#32324E]/85 leading-relaxed font-normal line-clamp-2 md:line-clamp-3">
                                                            {item.excerpt || item.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...'}
                                                        </p>
                                                    </div>
                                                    
                                                    {/* Card Footer Action */}
                                                    <div className="flex items-center gap-1 text-xs font-bold text-[#11112A] group-hover:text-[#32324E] transition-colors pt-2 border-t border-[#D2D2D2]/30 mt-2">
                                                        <span>Read Full {item.type === 'blog' ? 'Blog' : 'News'}</span>
                                                        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <div className="w-full text-center py-12 text-[#32324E]">
                                        <p>No updates available at this time.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile CTA Links */}
                        <div className="text-center mt-2 md:hidden shrink-0">
                            <div className="flex items-center justify-center gap-4 text-xs font-bold">
                                <Link
                                    href="/news"
                                    className="inline-flex items-center gap-1.5 text-[#11112A] hover:text-[#32324E] transition-colors"
                                >
                                    <span>View All News</span>
                                    <span>→</span>
                                </Link>
                                <span className="text-[#D2D2D2]">|</span>
                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center gap-1.5 text-[#11112A] hover:text-[#32324E] transition-colors"
                                >
                                    <span>View All Blogs</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
