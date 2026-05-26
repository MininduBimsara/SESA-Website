'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { FacebookIcon, InstagramIcon, YoutubeIcon, WhatsappIcon } from './icons/SocialIcons'

// Note: Swiper CSS is already imported globally in src/app/globals.css

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'News', href: '/news' },
]

const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
    { label: 'Facebook', href: 'https://facebook.com/sesa.uok', icon: FacebookIcon },
    { label: 'YouTube', href: 'https://youtube.com', icon: YoutubeIcon },
    { label: 'WhatsApp', href: 'https://wa.me', icon: WhatsappIcon },
]

const slides = [
    {
        id: 1,
        badge: 'SESA CodeFest & Hackathons',
        title: 'Igniting Innovation\nThrough Hackathons',
        subtitle: 'Where ideas transform into code. SESA hosts premier coding events, bringing together developers to build solutions for real-world challenges.',
        cta: 'Explore Events',
        ctaLink: '/events',
        image: '/students-collaborating-on-software-development-pro.jpg',
    },
    {
        id: 2,
        badge: 'Workshops & Tech Seminars',
        title: 'Learning from\nIndustry Experts',
        subtitle: 'Stay ahead of the curve with our hands-on workshops, seminars, and tech talks led by senior software engineering professionals.',
        cta: 'Upcoming Events',
        ctaLink: '/events',
        image: '/tech-workshop-and-coding-event-with-students.jpg',
    },
    {
        id: 3,
        badge: 'Our Vibrant Community',
        title: 'A Community of\nVisionary Builders',
        subtitle: 'Connecting passionate developers, UI/UX designers, and tech innovators. Join a network that supports your growth from day one.',
        cta: 'Join SESA',
        ctaLink: '/about',
        image: '/modern-tech-workspace-with-coding-screens-and-coll.jpg',
    },
    {
        id: 4,
        badge: 'Career Development & Mentorship',
        title: 'Bridging Academia\nand Industry',
        subtitle: 'Launch your career with mock interviews, resume reviews, and direct networking opportunities with top-tier technology companies.',
        cta: 'Meet Our Team',
        ctaLink: '/team',
        image: '/professional-software-engineering-career-developme.jpg',
    },
]

const slideTextVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: custom * 0.15,
            ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number], // easeOutCubic
        },
    }),
}

export default function HomeHero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const [hasScrolledHeader, setHasScrolledHeader] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolledHeader(window.scrollY > 40)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`
        }
    }

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden bg-slate-950">
            {/* Header Overlay */}
            <header 
                className={`fixed lg:absolute top-0 left-0 w-full z-40 transition-all duration-300 px-6 py-4 md:px-10 md:py-6 flex items-center justify-between ${
                    hasScrolledHeader 
                        ? 'bg-slate-950/75 backdrop-blur-md border-b border-white/5 py-3 md:py-4' 
                        : 'bg-slate-950/90 border-b border-white/5'
                }`}
            >
                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-7 text-[0.875rem] font-medium text-white/80">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="relative hover:text-white transition-colors py-1 group"
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-rose-500 transition-all duration-300 group-hover:w-full" />
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
                            className="h-9 w-auto object-contain brightness-0 invert"
                            priority
                        />
                    </Link>
                </div>

                {/* Search, Join Us, & Hamburger */}
                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/40 text-[0.875rem] rounded-full pl-5 pr-10 py-2 border border-white/10 focus:border-white/30 focus:outline-none transition-all w-40 focus:w-56"
                        />
                        <button type="submit" className="absolute right-3.5 text-white/50 hover:text-white transition-colors">
                            <Search className="w-4 h-4" />
                        </button>
                    </form>
                    
                    <Link
                        href="/about"
                        className="bg-[#EC1640] hover:bg-[#d61237] text-white text-[0.875rem] font-medium px-6 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-950/20"
                    >
                        Join Us
                    </Link>
                    
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden border border-white/10 hover:border-white/30 rounded-full w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors focus:outline-none text-white"
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
                        className="fixed inset-x-0 top-[70px] mx-auto w-[min(92%,500px)] z-50 overflow-hidden bg-slate-950/95 backdrop-blur-lg rounded-3xl border border-white/10 p-6 flex flex-col gap-3 shadow-2xl"
                    >
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-2">
                            <input
                                type="text"
                                placeholder="Search articles and events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 text-white placeholder-white/40 text-sm rounded-full pl-5 pr-10 py-3 border border-white/10 focus:outline-none focus:border-white/20 w-full"
                            />
                            <button type="submit" className="absolute right-4 text-white/50">
                                <Search className="w-4 h-4" />
                            </button>
                        </form>
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-4 py-3 text-[0.95rem] font-medium text-white/80 hover:bg-white/5 hover:text-white rounded-2xl transition-colors flex justify-between items-center"
                            >
                                <span>{link.label}</span>
                                <ArrowRight className="w-4 h-4 opacity-40" />
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Swiper Full Screen Carousel */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                navigation={{
                    nextEl: '.swiper-btn-next',
                    prevEl: '.swiper-btn-prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pag-custom',
                    bulletClass: 'swiper-bullet-custom',
                    bulletActiveClass: 'swiper-bullet-active-custom',
                }}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                speed={1200}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full flex items-center">
                            {/* Slide Background Image */}
                            <div className="absolute inset-0">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-out scale-105 swiper-zoom-container"
                                    style={{ 
                                        backgroundImage: `url(${slide.image})`,
                                    }}
                                />
                                {/* Overlay Gradient for excellent text readability */}
                                <div className="absolute inset-0 bg-black/75" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 md:pt-24 flex items-center justify-start">
                                <div className="max-w-2xl flex flex-col gap-4 sm:gap-5 text-left">
                                    {/* Badge */}
                                    <div>
                                        <motion.div
                                            key={`badge-${slide.id}-${activeIndex}`}
                                            custom={1}
                                            variants={slideTextVariants}
                                            initial="hidden"
                                            animate={activeIndex === index ? 'visible' : 'hidden'}
                                            className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/10 px-3.5 py-1 text-[0.675rem] font-semibold uppercase tracking-[0.2em] text-[#EC1640]"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#EC1640] animate-pulse" />
                                            {slide.badge}
                                        </motion.div>
                                    </div>

                                    {/* Slide Title */}
                                    <motion.h1
                                        key={`title-${slide.id}-${activeIndex}`}
                                        custom={2}
                                        variants={slideTextVariants}
                                        initial="hidden"
                                        animate={activeIndex === index ? 'visible' : 'hidden'}
                                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium font-serif text-white leading-[1.2] tracking-normal whitespace-pre-line"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    {/* Slide Subtitle */}
                                    <motion.p
                                        key={`subtitle-${slide.id}-${activeIndex}`}
                                        custom={3}
                                        variants={slideTextVariants}
                                        initial="hidden"
                                        animate={activeIndex === index ? 'visible' : 'hidden'}
                                        className="text-xs sm:text-sm lg:text-base text-slate-300/90 leading-relaxed max-w-lg"
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    {/* Slide CTA Buttons */}
                                    <motion.div
                                        key={`cta-${slide.id}-${activeIndex}`}
                                        custom={4}
                                        variants={slideTextVariants}
                                        initial="hidden"
                                        animate={activeIndex === index ? 'visible' : 'hidden'}
                                        className="flex flex-wrap items-center gap-4 mt-1"
                                    >
                                        <Link
                                            href={slide.ctaLink}
                                            className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-950 font-bold px-6 py-2.5 text-xs shadow-xl transition-all duration-300 hover:bg-[#EC1640] hover:text-white hover:scale-[1.03] active:scale-95"
                                        >
                                            <span>{slide.cta}</span>
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                        </Link>

                                        <Link
                                            href="/team"
                                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 active:scale-95"
                                        >
                                            <span>Meet the Team</span>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Social Links Side Overlay */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-30 hidden md:flex">
                <div className="h-16 w-px bg-white/20 mb-2" />
                {socialLinks.map((s, i) => {
                    const Icon = s.icon
                    return (
                        <motion.a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                            className="text-white/40 hover:text-[#EC1640] transition-all duration-300 hover:scale-110 p-1.5"
                            aria-label={s.label}
                        >
                            <Icon className="w-5 h-5" />
                        </motion.a>
                    )
                })}
                <div className="h-16 w-px bg-white/20 mt-2" />
            </div>

            {/* Bottom Panel Info */}
            <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 flex items-end justify-between z-30 pointer-events-none">
                {/* Left Side: Membership Stat */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex flex-col gap-1 text-left hidden sm:block"
                >
                    <span className="text-white/40 text-[0.55rem] tracking-[0.2em] uppercase font-bold">COMMUNITY</span>
                    <span className="text-white text-xs font-bold tracking-wider">1.2K+ ACTIVE MEMBERS</span>
                </motion.div>

                {/* Center: Custom Pill Pagination */}
                <div className="swiper-pag-custom flex items-center gap-2.5 pointer-events-auto" />


            </div>

            {/* Custom Styles for Swiper Pagination & Slide Zoom */}
            <style jsx global>{`
                .swiper-bullet-custom {
                    width: 24px;
                    height: 4px;
                    border-radius: 99px;
                    background-color: rgba(255, 255, 255, 0.2);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .swiper-bullet-custom:hover {
                    background-color: rgba(255, 255, 255, 0.4);
                }
                .swiper-bullet-active-custom {
                    width: 48px;
                    background-color: #EC1640;
                    box-shadow: 0 0 12px rgba(236, 22, 64, 0.5);
                }
                .swiper-slide-active .swiper-zoom-container {
                    transform: scale(1.00);
                }
                .swiper-slide {
                    opacity: 0 !important;
                    transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                }
                .swiper-slide-active {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    )
}
