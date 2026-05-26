'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'News', href: '/news' },
]

const slides = [
    {
        id: 1,
        badge: 'SESA CodeFest & Hackathons',
        title: 'Igniting Innovation\nThrough Hackathons',
        subtitle: 'Where ideas transform into code. SESA hosts premier coding events, bringing together developers to build solutions for real-world challenges.',
        cta: 'Explore Events',
        ctaLink: '/events',
    },
    {
        id: 2,
        badge: 'Workshops & Tech Seminars',
        title: 'Learning from\nIndustry Experts',
        subtitle: 'Stay ahead of the curve with our hands-on workshops, seminars, and tech talks led by senior software engineering professionals.',
        cta: 'Upcoming Events',
        ctaLink: '/events',
    },
    {
        id: 3,
        badge: 'Our Vibrant Community',
        title: 'A Community of\nVisionary Builders',
        subtitle: 'Connecting passionate developers, UI/UX designers, and tech innovators. Join a network that supports your growth from day one.',
        cta: 'Join SESA',
        ctaLink: '/about',
    },
    {
        id: 4,
        badge: 'Career Development & Mentorship',
        title: 'Bridging Academia\nand Industry',
        subtitle: 'Launch your career with mock interviews, resume reviews, and direct networking opportunities with top-tier technology companies.',
        cta: 'Meet Our Team',
        ctaLink: '/team',
    },
]

interface RoadmapItem {
    id: string
    title: string
    status: 'Completed' | 'In progress' | 'Planned'
    colStart: number
    colSpan: number
}

export default function HomeHero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)

    const [activeTab, setActiveTab] = useState<'events' | 'academic' | 'committee'>('events')

    const [roadmapItems, setRoadmapItems] = useState<Record<'events' | 'academic' | 'committee', RoadmapItem[]>>({
        events: [
            { id: 'e1', title: 'SESA CodeFest', status: 'Completed', colStart: 1, colSpan: 1 },
            { id: 'e2', title: 'SESA Hackathon', status: 'In progress', colStart: 2, colSpan: 1 },
            { id: 'e3', title: 'Industry Mentorship', status: 'Planned', colStart: 3, colSpan: 2 },
            { id: 'e4', title: 'Web Dev Bootcamp', status: 'In progress', colStart: 1, colSpan: 2 },
            { id: 'e5', title: 'Annual General Meeting', status: 'Planned', colStart: 4, colSpan: 1 },
        ],
        academic: [
            { id: 'a1', title: 'Semester 1 Lectures', status: 'Completed', colStart: 1, colSpan: 1 },
            { id: 'a2', title: 'Semester 1 Finals', status: 'In progress', colStart: 2, colSpan: 1 },
            { id: 'a3', title: 'Semester 2 Lectures', status: 'Planned', colStart: 3, colSpan: 2 },
            { id: 'a4', title: 'Semester 1 Study Leave', status: 'Completed', colStart: 1, colSpan: 2 },
            { id: 'a5', title: 'Semester 2 Finals', status: 'Planned', colStart: 4, colSpan: 1 },
        ],
        committee: [
            { id: 'c1', title: 'Committee Selection', status: 'Completed', colStart: 1, colSpan: 1 },
            { id: 'c2', title: 'Mid-year Review', status: 'In progress', colStart: 2, colSpan: 1 },
            { id: 'c3', title: 'External Partnerships', status: 'Planned', colStart: 3, colSpan: 2 },
            { id: 'c4', title: 'Event Planning v1', status: 'In progress', colStart: 1, colSpan: 2 },
            { id: 'c5', title: 'Annual Report', status: 'Planned', colStart: 4, colSpan: 1 },
        ],
    })

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`
        }
    }

    const handleCardClick = (cardId: string) => {
        setRoadmapItems((prev) => {
            const currentTabItems = prev[activeTab]
            const updated = currentTabItems.map((item) => {
                if (item.id === cardId) {
                    const statusCycle: Record<'Completed' | 'In progress' | 'Planned', 'Completed' | 'In progress' | 'Planned'> = {
                        'Planned': 'In progress',
                        'In progress': 'Completed',
                        'Completed': 'Planned',
                    }
                    return { ...item, status: statusCycle[item.status] }
                }
                return item
            })
            return { ...prev, [activeTab]: updated }
        })
    }

    const getStatusDetails = (status: 'Completed' | 'In progress' | 'Planned') => {
        switch (status) {
            case 'Completed':
                return {
                    dotColor: 'bg-emerald-500',
                    borderColor: 'border-t-emerald-500',
                    text: 'Completed',
                }
            case 'In progress':
                return {
                    dotColor: 'bg-orange-500',
                    borderColor: 'border-t-orange-500',
                    text: 'In progress',
                }
            case 'Planned':
                return {
                    dotColor: 'bg-slate-400',
                    borderColor: 'border-t-slate-400',
                    text: 'Planned',
                }
        }
    }

    return (
        <div className="w-full bg-[#f4f2ec] p-3 md:p-6 lg:p-8 min-h-screen flex flex-col justify-center transition-colors duration-300">
            {/* Inner Rounded Card Frame */}
            <div 
                className="relative w-full min-h-[880px] rounded-[32px] overflow-hidden border border-[#e5e3dd] shadow-sm bg-cover bg-center flex flex-col justify-between"
                style={{ 
                    backgroundImage: `url('/tech_watercolor_bg.png')`,
                }}
            >
                {/* Subtle soft overlay for improved contrast */}
                <div className="absolute inset-0 bg-white/5 pointer-events-none" />

                {/* Header Navbar */}
                <header className="relative w-full z-40 px-6 py-5 md:px-10 md:py-6 flex items-center justify-between">
                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-7 text-[0.875rem] font-semibold text-slate-700">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="relative hover:text-black transition-colors py-1 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C00F38] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* SESA Logo */}
                    <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/SESA_Logo_Black-01.png"
                                alt="SESA Logo"
                                width={130}
                                height={42}
                                className="h-8 md:h-9 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Search & Action Buttons */}
                    <div className="flex items-center gap-4">
                        <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-slate-100/70 hover:bg-slate-100/90 focus:bg-white text-slate-800 placeholder-slate-400 text-[0.875rem] rounded-full pl-5 pr-10 py-2 border border-slate-200 focus:border-slate-350 focus:outline-none transition-all w-40 focus:w-56"
                            />
                            <button type="submit" className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                        </form>
                        
                        <Link
                            href="/about"
                            className="bg-[#C00F38] hover:bg-[#A80B2E] text-white text-[0.875rem] font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-rose-900/10"
                        >
                            Join Us
                        </Link>
                        
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden border border-slate-200 hover:border-slate-300 rounded-full w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white transition-colors focus:outline-none text-slate-700"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </header>

                {/* Mobile Drawer Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="fixed inset-x-0 top-[85px] mx-auto w-[min(92%,500px)] z-50 overflow-hidden bg-white/95 backdrop-blur-lg rounded-3xl border border-slate-200 p-6 flex flex-col gap-3 shadow-2xl"
                        >
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-2">
                                <input
                                    type="text"
                                    placeholder="Search articles and events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-full pl-5 pr-10 py-3 border border-slate-200 focus:outline-none focus:border-slate-300 w-full"
                                />
                                <button type="submit" className="absolute right-4 text-slate-400">
                                    <Search className="w-4 h-4" />
                                </button>
                            </form>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 text-[0.95rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-black rounded-2xl transition-colors flex justify-between items-center"
                                >
                                    <span>{link.label}</span>
                                    <ArrowRight className="w-4 h-4 opacity-40" />
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Swiper Content Area (Text Carousel Only) */}
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-10 md:pt-16 pb-4">
                    <Swiper
                        modules={[Pagination, Autoplay, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pag-custom-hero',
                            bulletClass: 'swiper-bullet-custom-hero',
                            bulletActiveClass: 'swiper-bullet-active-custom-hero',
                        }}
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        loop={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="w-full"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={slide.id}>
                                <div className="flex flex-col items-center text-center px-4 py-6">
                                    {/* Badge */}
                                    <div className="mb-4">
                                        <motion.div
                                            key={`badge-${slide.id}-${activeIndex}`}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={activeIndex === index ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.5 }}
                                            className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/20 bg-[#EC1640]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#EC1640]"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#EC1640] animate-pulse" />
                                            {slide.badge}
                                        </motion.div>
                                    </div>

                                    {/* Title */}
                                    <motion.h1
                                        key={`title-${slide.id}-${activeIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={activeIndex === index ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] tracking-tight font-sans whitespace-pre-line max-w-2xl"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    {/* Subtitle */}
                                    <motion.p
                                        key={`subtitle-${slide.id}-${activeIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={activeIndex === index ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="text-xs sm:text-sm md:text-base text-slate-650 leading-relaxed max-w-xl mt-4"
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    {/* CTA Buttons */}
                                    <motion.div
                                        key={`cta-${slide.id}-${activeIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={activeIndex === index ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        className="flex flex-wrap items-center justify-center gap-4 mt-6"
                                    >
                                        <Link
                                            href={slide.ctaLink}
                                            className="group inline-flex items-center gap-2 rounded-xl bg-[#C00F38] hover:bg-[#A80B2E] text-white font-bold px-6 py-3 text-xs shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
                                        >
                                            <span>{slide.cta}</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Pill Custom Pagination */}
                    <div className="swiper-pag-custom-hero flex items-center justify-center gap-2.5 mt-2 pointer-events-auto" />
                </div>

                {/* SESA Interactive Mockup Roadmap Dashboard */}
                <div className="w-full max-w-5xl mx-auto bg-white rounded-t-[24px] border-t border-x border-slate-200/60 shadow-[0_-8px_40px_rgba(0,0,0,0.04)] overflow-hidden mt-auto shrink-0 z-20 flex flex-col sm:flex-row">
                    {/* Sidebar menu - Desktop */}
                    <div className="hidden sm:flex flex-col gap-6 w-56 border-r border-slate-100 p-5 shrink-0 bg-slate-50/30">
                        <div className="flex items-center gap-2.5 font-bold text-[0.9rem] text-slate-800">
                            {/* Custom S-curve roadmap SVG logo */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#C00F38] shrink-0">
                                <path d="M8 6h8a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h8" />
                                <circle cx="8" cy="6" r="1.75" fill="currentColor" />
                                <circle cx="8" cy="14" r="1.75" fill="currentColor" />
                                <circle cx="8" cy="22" r="1.75" fill="currentColor" />
                            </svg>
                            <span className="tracking-tight">SESA Roadmap</span>
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                            {(['events', 'academic', 'committee'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                        activeTab === tab
                                            ? 'bg-slate-100 text-slate-800 font-bold shadow-sm'
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                                    }`}
                                >
                                    {tab === 'events' ? 'Events & Projects' : tab === 'academic' ? 'Academic Calendar' : 'SESA Committee'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar menu - Mobile */}
                    <div className="sm:hidden flex flex-row gap-2 p-3.5 border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-50/50">
                        {(['events', 'academic', 'committee'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                                    activeTab === tab
                                        ? 'bg-[#C00F38] text-white shadow-sm font-bold'
                                        : 'bg-slate-100 text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                {tab === 'events' ? 'Events & Projects' : tab === 'academic' ? 'Academic Calendar' : 'SESA Committee'}
                            </button>
                        ))}
                    </div>

                    {/* Timeline & Grid area */}
                    <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                        <div className="min-w-[760px] md:min-w-0 flex flex-col h-full">
                            {/* Column headers */}
                            <div className="grid grid-cols-4 border-b border-slate-100 text-center py-3 bg-slate-50/30 text-slate-400 text-[0.65rem] font-bold tracking-widest uppercase">
                                <div>Q1 2025</div>
                                <div>Q2 2025</div>
                                <div>Q3 2025</div>
                                <div>Q4 2025</div>
                            </div>
                            
                            {/* Cards area */}
                            <div className="grid grid-cols-4 grid-rows-2 gap-4 p-5 relative flex-1 min-h-[220px]">
                                {roadmapItems[activeTab].map((item) => {
                                    const details = getStatusDetails(item.status)
                                    const colStartClasses = [
                                        'col-start-1',
                                        'col-start-2',
                                        'col-start-3',
                                        'col-start-4',
                                    ]
                                    const colSpanClasses = [
                                        'col-span-1',
                                        'col-span-2',
                                        'col-span-3',
                                        'col-span-4',
                                    ]
                                    
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            onClick={() => handleCardClick(item.id)}
                                            className={`bg-white rounded-xl border border-slate-200/60 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 cursor-pointer border-t-[3px] ${details.borderColor} ${colStartClasses[item.colStart - 1]} ${colSpanClasses[item.colSpan - 1]} flex flex-col justify-between`}
                                        >
                                            <h4 className="font-semibold text-slate-800 text-xs md:text-[0.8rem] leading-snug mb-3">
                                                {item.title}
                                            </h4>
                                            <div className="flex items-center text-[0.65rem] font-bold text-slate-400 mt-auto">
                                                <span className={`w-1.5 h-1.5 rounded-full ${details.dotColor} inline-block mr-1.5`} />
                                                {details.text}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles for Swiper Pagination Bullet styling */}
            <style jsx global>{`
                .swiper-bullet-custom-hero {
                    width: 24px;
                    height: 4px;
                    border-radius: 99px;
                    background-color: rgba(0, 0, 0, 0.12);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .swiper-bullet-custom-hero:hover {
                    background-color: rgba(0, 0, 0, 0.25);
                }
                .swiper-bullet-active-custom-hero {
                    width: 48px;
                    background-color: #C00F38;
                    box-shadow: 0 0 10px rgba(192, 15, 56, 0.25);
                }
                .swiper-slide {
                    opacity: 0 !important;
                    transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                }
                .swiper-slide-active {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    )
}
