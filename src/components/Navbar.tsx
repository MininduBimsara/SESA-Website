'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { FacebookIcon } from './icons/SocialIcons'
import { cn } from '@/lib/utils'
import { socialMediaLinks } from './SocialLinks'

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

const Navbar = ({ initialTheme = 'dark' }: NavbarProps) => {
    const pathname = usePathname()
    const isHomepage = pathname === '/'
    const [isOpen, setIsOpen] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)

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
                            'w-[min(92%,1100px)] rounded-full border px-4 py-2 backdrop-blur-lg mt-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]',
                            isLight
                                ? 'border-[#EC1640]/25 bg-white/95 text-slate-800 shadow-[0_18px_45px_rgba(236,22,64,0.12)]'
                                : 'border-white/10 bg-slate-950/80 text-slate-100 shadow-[0_30px_60px_rgba(15,23,42,0.35)]',
                        ]
                        : [
                            'w-full border-b px-6 py-2.5 rounded-none mt-0',
                            isLight
                                ? 'border-white/0 bg-white/0 text-slate-700'
                                : 'border-white/0 bg-slate-950/0 text-slate-100'
                        ]
                )}
            >
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-full px-2 py-1 transition-colors"
                >
                    <Image
                        src="/SESA_Logo_Black-01.png"
                        alt="SESA Logo"
                        width={110}
                        height={36}
                        className={cn("h-8 w-auto object-contain", !isLight && "brightness-0 invert")}
                    />
                </Link>

                <nav
                    className={cn(
                        'hidden items-center gap-8 pr-4 text-sm font-medium md:flex',
                        isLight ? 'text-slate-600' : 'text-slate-200'
                    )}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                'group relative transition-colors duration-300',
                                isLight ? 'hover:text-[#EC1640]' : 'hover:text-[#EC1640]'
                            )}
                        >
                            {link.label}
                            <span
                                className={cn(
                                    'absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full bg-[#EC1640]'
                                )}
                            />
                        </Link>
                    ))}
                    <a
                        href={socialMediaLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'rounded-full px-5 py-2 text-white shadow-[0_15px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-105 flex items-center gap-2',
                            'bg-black hover:bg-[#EC1640]'
                        )}
                    >
                        <FacebookIcon className="w-4 h-4" />
                        Follow Us
                    </a>
                </nav>

                <button
                    type="button"
                    className={cn(
                        'mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full border transition md:hidden',
                        isLight
                            ? 'border-[#EC1640]/25 text-[#EC1640] hover:border-[#EC1640]/40 hover:text-[#EC1640]'
                            : 'border-white/20 text-white hover:border-[#EC1640] hover:text-[#EC1640]'
                    )}
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className={cn(
                            'pointer-events-auto mx-auto mt-3 w-[min(92%,1100px)] overflow-hidden rounded-3xl border px-6 py-6 shadow-[0_24px_60px_rgba(236,22,64,0.12)] md:hidden',
                            isLight
                                ? 'border-slate-100 bg-white text-slate-700'
                                : 'border-white/10 bg-slate-950/95 text-slate-100'
                        )}
                    >
                        <div className="flex flex-col gap-4 text-base font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        'flex items-center justify-between rounded-2xl border px-4 py-3 transition',
                                        isLight
                                            ? 'border-slate-100 bg-slate-50 hover:border-[#EC1640]/30 hover:bg-[#EC1640]/5 text-slate-800'
                                            : 'border-white/10 bg-white/5 hover:border-[#EC1640]/60 hover:bg-[#EC1640]/10 text-white'
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>{link.label}</span>
                                    <span
                                        className={cn(
                                            'text-xs uppercase tracking-[0.3em] text-[#EC1640]'
                                        )}
                                    >
                                        Explore
                                    </span>
                                </Link>
                            ))}
                            <a
                                href={socialMediaLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-black hover:bg-[#EC1640] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.15)] transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <FacebookIcon className="w-4 h-4" />
                                Follow Us on Facebook
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default Navbar
