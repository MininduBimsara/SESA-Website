'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ArrowRight } from 'lucide-react'

// Brand Icons matching the mockup logos
const GameviaIcon = () => (
    <svg className="w-5 h-5 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 12h4m2 0h2m-6-8h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M8 8v8M16 8v8" />
    </svg>
)

const ProwessiaIcon = () => (
    <svg className="w-5 h-5 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5a9.3 9.3 0 0 1-4-7.5 9.3 9.3 0 0 1-4 7.5c-2 1.6-3 3.5-3 5.5a7 7 0 0 0 7 7Z" />
    </svg>
)

const FlexoraviaIcon = () => (
    <svg className="w-5 h-5 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 12h18M12 3a9 9 0 0 1 9 9M12 21a9 9 0 0 1-9-9" />
    </svg>
)

const EnduroxIcon = () => (
    <svg className="w-5 h-5 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
)

const KyneticIcon = () => (
    <svg className="w-5 h-5 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22 22 2M12 2v6M12 16v6M2 12h6M16 12h6" />
    </svg>
)

const DynastraIcon = () => (
    <svg className="w-5 h-5 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
)

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'News', href: '/news' },
]

export default function HomeHero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`
        }
    }

    return (
        <div className="w-full max-w-[1550px] mx-auto px-3 pb-6 md:px-5 md:pt-4 lg:pt-5 bg-white">
            {/* White Rounded Frame Container */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-3 md:p-4 lg:p-5 flex flex-col gap-4 md:gap-5 relative">
                
                {/* Embedded Navbar */}
                <header className="flex items-center justify-between w-full py-1">
                    {/* Left: Navigation links */}
                    <nav className="hidden lg:flex items-center gap-7 text-[0.875rem] font-medium text-slate-800">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.label} 
                                href={link.href} 
                                className="relative hover:text-rose-500 transition-colors py-1 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-rose-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Center: SESA Logo */}
                    <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/SESA_Logo_Black-01.png"
                                alt="SESA Logo"
                                width={130}
                                height={42}
                                className="h-10 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right: Search, Call to Action, and Mobile Menu Toggle */}
                    <div className="flex items-center gap-3">
                        {/* Search Pill */}
                        <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder-slate-400 text-[0.875rem] rounded-full pl-5 pr-10 py-2.5 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all w-48 focus:w-60"
                            />
                            <button type="submit" className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                        </form>

                        {/* CTA button */}
                        <Link 
                            href="/about" 
                            className="bg-black hover:bg-slate-900 text-white text-[0.875rem] font-medium px-6 py-2.5 rounded-full transition-all hover:scale-[1.02] flex items-center gap-1 shadow-sm active:scale-95"
                        >
                            Join Us
                        </Link>

                        {/* Hamburger menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="border border-slate-200 hover:border-slate-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-50 transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
                        </button>
                    </div>
                </header>

                {/* Mobile Navigation Drawer */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 flex flex-col p-4 gap-2 lg:hidden z-20"
                        >
                            {/* Mobile Search */}
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-2">
                                <input
                                    type="text"
                                    placeholder="Search articles and events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white text-slate-800 placeholder-slate-400 text-sm rounded-full pl-5 pr-10 py-3 border border-slate-200 focus:outline-none focus:border-slate-300 w-full"
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
                                    className="px-4 py-3 text-[0.95rem] font-medium text-slate-700 hover:bg-slate-200/50 hover:text-rose-500 rounded-xl transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Hero Card Container */}
                <div 
                    className="relative w-full h-[500px] sm:h-[580px] md:h-[680px] lg:h-[780px] xl:h-[840px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-900 shadow-inner group"
                >
                    {/* Background Developer Workspace Image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out group-hover:scale-105"
                        style={{ backgroundImage: "url('/students-collaborating-on-software-development-pro.jpg')" }}
                    />
                    
                    {/* Elegant Dark Gradients Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/40" />

                    {/* Top-Right: Vertical Social Links */}
                    <div className="absolute top-6 right-6 flex flex-col items-end gap-3.5 text-white/80 font-medium text-xs md:text-sm tracking-wide z-10">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-rose-400">Instagram</a>
                        <a href="https://facebook.com/sesa.uok" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-rose-400">Facebook</a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-rose-400">YouTube</a>
                        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-rose-400">WhatsApp</a>
                    </div>

                    {/* Bottom-Left: Hero Adaptive Text Stack */}
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 lg:bottom-12 lg:left-12 max-w-xl z-10">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.08] tracking-tight text-left"
                        >
                            <span className="block font-sans">Code In</span>
                            <span className="block font-sans">Build Strong</span>
                            <span className="block font-sans">Deploy Free</span>
                        </motion.h1>
                    </div>

                    {/* Bottom-Right: Frosted Glass Stats & Commitment Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 max-w-[340px] md:max-w-[380px] p-5 md:p-6 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl text-white shadow-2xl z-10 flex flex-col gap-4"
                    >
                        {/* Member Stack & Metric */}
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3.5 overflow-hidden">
                                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white/30 bg-slate-800 overflow-hidden relative">
                                    <Image src="/placeholder-user.jpg" alt="User" fill className="object-cover" />
                                </div>
                                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white/30 bg-slate-700 overflow-hidden relative">
                                    <Image src="/placeholder-user.jpg" alt="User" fill className="object-cover" />
                                </div>
                                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white/30 bg-slate-600 overflow-hidden relative">
                                    <Image src="/placeholder-user.jpg" alt="User" fill className="object-cover" />
                                </div>
                            </div>
                            <span className="text-xl md:text-2xl font-bold tracking-tight">1.2k+</span>
                        </div>

                        {/* Description Text */}
                        <p className="text-[0.875rem] md:text-[0.95rem] text-slate-100/95 leading-relaxed font-normal">
                            We&apos;re committed to empowering future software engineers by fostering collaboration, innovation, and professional growth in a vibrant student community.
                        </p>
                    </motion.div>
                </div>

                {/* Footer Brand Logo Strip */}
                {/* <footer className="w-full border-t border-slate-100/80 pt-3.5 mt-1">
                    <div className="flex items-center justify-between gap-8 md:gap-12 px-2 overflow-x-auto scrollbar-none py-1.5">
                        <div className="flex items-center text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap text-sm font-semibold select-none">
                            <GameviaIcon />
                            <span>gamevia</span>
                        </div>
                        <div className="flex items-center text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap text-sm font-semibold select-none">
                            <ProwessiaIcon />
                            <span>Prowessia</span>
                        </div>
                        <div className="flex items-center text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap text-sm font-semibold select-none">
                            <FlexoraviaIcon />
                            <span>Flexoravia</span>
                        </div>
                        <div className="flex items-center text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap text-sm font-semibold select-none">
                            <EnduroxIcon />
                            <span>endurox</span>
                        </div>
                        <div className="flex items-center text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap text-sm font-semibold select-none">
                            <KyneticIcon />
                            <span>Kynetic</span>
                        </div>
                        <div className="flex items-center text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap text-sm font-semibold select-none">
                            <DynastraIcon />
                            <span>dynastra</span>
                        </div>
                    </div>
                </footer> */}

            </div>
        </div>
    )
}
