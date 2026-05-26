'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'News', href: '/news' },
]

type NavbarTheme = 'dark' | 'light'

interface NavbarProps {
    initialTheme?: NavbarTheme
}

const Navbar = ({ initialTheme = 'light' }: NavbarProps) => {
    const pathname = usePathname()
    const isHomepage = pathname === '/'
    const [isOpen, setIsOpen] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 120
            setHasScrolled(window.scrollY > threshold)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/blogs?search=${encodeURIComponent(searchQuery)}`
        }
    }

    const resolvedTheme = useMemo<NavbarTheme>(() => {
        if (hasScrolled) return 'light'
        return initialTheme
    }, [hasScrolled, initialTheme])

    const isLight = resolvedTheme === 'light'
    const isDetached = hasScrolled
    const isVisible = !isHomepage || hasScrolled

    return (
        <motion.header
            initial={{ opacity: 0, y: -100 }}
            animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : -100 
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                'fixed inset-x-0 top-0 z-50 pointer-events-none',
                !isVisible && 'pointer-events-none'
            )}
        >
            <motion.div
                layout
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    'flex items-center justify-between mx-auto transition-colors duration-300 pointer-events-auto',
                    isDetached
                        ? [
                            'w-[min(92%,1200px)] rounded-full border px-6 py-2.5 backdrop-blur-lg mt-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]',
                            isLight
                                ? 'border-slate-200 bg-white/95 text-slate-800 shadow-[0_18px_45px_rgba(0,0,0,0.05)]'
                                : 'border-white/10 bg-slate-950/80 text-slate-100 shadow-[0_30px_60px_rgba(15,23,42,0.35)]',
                        ]
                        : [
                            'w-full border-b px-8 py-4 rounded-none mt-0',
                            isLight
                                ? 'border-transparent bg-transparent text-slate-800'
                                : 'border-white/5 bg-slate-950/50 backdrop-blur-md text-slate-100'
                        ]
                )}
            >
                {/* Desktop Left Navigation Links */}
                <nav
                    className={cn(
                        'hidden items-center gap-7 text-[0.875rem] font-semibold lg:flex',
                        isLight ? 'text-slate-700' : 'text-white/80'
                    )}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                'group relative py-1 transition-colors duration-300',
                                isLight ? 'hover:text-black' : 'hover:text-white'
                            )}
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EC1640] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* SESA Logo Centered */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/SESA_Logo_Black-01.png"
                            alt="SESA Logo"
                            width={130}
                            height={42}
                            className={cn("h-8 md:h-9 w-auto object-contain transition-all duration-300", !isLight && "brightness-0 invert")}
                        />
                    </Link>
                </div>

                {/* Desktop Right Side elements: Search, Join Us & Drawer Toggle */}
                <div className="flex items-center gap-3">
                    <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={cn(
                                "text-[0.875rem] rounded-full pl-5 pr-10 py-2 border focus:outline-none transition-all w-40 focus:w-56",
                                isLight 
                                    ? "bg-slate-100/70 hover:bg-slate-100/90 focus:bg-white text-slate-800 placeholder-slate-400 border-slate-200 focus:border-slate-350" 
                                    : "bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/40 border-white/10 focus:border-white/30"
                            )}
                        />
                        <button type="submit" className={cn("absolute right-3.5 transition-colors", isLight ? "text-slate-400 hover:text-slate-650" : "text-white/50 hover:text-white")}>
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    <Link
                        href="/about"
                        className={cn(
                            "text-[0.875rem] font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md hidden sm:inline-block",
                            isLight
                                ? "bg-[#EC1640] hover:bg-[#d61237] text-white shadow-rose-900/10"
                                : "bg-[#EC1640] hover:bg-[#d61237] text-white shadow-[#EC1640]/10"
                        )}
                    >
                        Join Us
                    </Link>

                    <button
                        type="button"
                        className={cn(
                            'rounded-full w-10 h-10 flex items-center justify-center transition-all focus:outline-none lg:hidden border',
                            isLight
                                ? 'border-slate-200 text-slate-700 bg-white/80 hover:bg-white'
                                : 'border-white/10 text-white bg-white/10 hover:border-white/20'
                        )}
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile / Full Drawer Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className={cn(
                            'pointer-events-auto mx-auto mt-3 w-[min(92%,500px)] overflow-hidden rounded-3xl border px-6 py-6 shadow-2xl z-55 relative lg:hidden',
                            isLight
                                ? 'border-slate-200 bg-white text-slate-750'
                                : 'border-white/10 bg-slate-950/95 text-white'
                        )}
                    >
                        <div className="flex flex-col gap-3">
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-1">
                                <input
                                    type="text"
                                    placeholder="Search articles and events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={cn(
                                        "w-full pl-5 pr-10 py-3 border text-sm rounded-full focus:outline-none",
                                        isLight
                                            ? "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
                                            : "bg-white/5 border-white/10 text-white placeholder-white/40"
                                    )}
                                />
                                <button type="submit" className="absolute right-4 text-slate-400 hover:text-[#EC1640] transition-colors">
                                    <Search className="w-4 h-4" />
                                </button>
                            </form>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        'flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all',
                                        isLight
                                            ? 'border-slate-100 bg-slate-50 hover:border-[#EC1640]/30 hover:bg-[#EC1640]/5 text-slate-850'
                                            : 'border-white/10 bg-white/5 hover:border-[#EC1640]/50 hover:bg-white/10 text-white'
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>{link.label}</span>
                                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}

                            <Link
                                href="/about"
                                className="mt-2 text-center rounded-full bg-[#EC1640] hover:bg-[#d61237] text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-rose-900/10 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Join Us
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default Navbar
