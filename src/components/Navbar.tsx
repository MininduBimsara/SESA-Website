'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Facebook } from 'lucide-react'
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

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                'fixed inset-x-0 z-50 transition-all duration-500',
                isDetached ? 'pointer-events-none top-6 flex justify-center' : 'top-0'
            )}
        >
            <div
                className={cn(
                    'flex w-full items-center justify-between transition-all duration-500 mx-auto',
                    isDetached
                        ? [
                            'pointer-events-auto w-[min(92%,1100px)] rounded-full border px-4 py-0 backdrop-blur-lg',
                            'mx-auto',
                            isLight
                                ? 'border-rose-100/80 bg-white/95 text-slate-700 shadow-[0_18px_45px_rgba(244,63,94,0.12)]'
                                : 'border-white/10 bg-slate-950/80 text-slate-100 shadow-[0_30px_60px_rgba(15,23,42,0.35)]',
                        ]
                        : [
                            'pointer-events-auto border-b px-6 py-2',
                            isLight
                                ? 'border-white/0 bg-white/0 text-slate-700'
                                : 'border-white/0 bg-slate-950/0 text-slate-100'
                        ]
                )}
            >
                <Link
                    href="/"
                    className={cn(
                        'flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-colors',
                        isLight ? 'text-slate-500 hover:text-rose-500' : 'text-slate-100 hover:text-rose-300'
                    )}
                >
                    <span
                        className={cn(
                            'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-gradient-to-br text-white shadow-[0_12px_24px_rgba(244,63,94,0.28)]',
                            isLight ? 'border-rose-200 from-rose-400 via-rose-500 to-rose-600' : 'border-rose-500/60 from-rose-500 via-rose-500 to-rose-400'
                        )}
                    >
                        <span className="text-lg font-bold">S</span>
                    </span>
                    <span
                        className={cn(
                            'hidden sm:inline-flex text-xs',
                            isLight ? 'text-slate-600' : 'text-slate-200/80'
                        )}
                    >
                        Software Engineering Student Association
                    </span>
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
                                isLight ? 'hover:text-rose-500' : 'hover:text-rose-300'
                            )}
                        >
                            {link.label}
                            <span
                                className={cn(
                                    'absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full',
                                    isLight ? 'bg-gradient-to-r from-rose-400 to-rose-500' : 'bg-gradient-to-r from-rose-300 to-rose-500'
                                )}
                            />
                        </Link>
                    ))}
                    <a
                        href={socialMediaLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'rounded-full px-5 py-2 text-white shadow-[0_15px_30px_rgba(244,63,94,0.2)] transition-transform duration-300 hover:scale-105 flex items-center gap-2',
                            isLight ? 'bg-gradient-to-r from-rose-500 via-rose-500 to-rose-400' : 'bg-gradient-to-r from-rose-500 via-rose-500 to-rose-400'
                        )}
                    >
                        <Facebook className="w-4 h-4" />
                        Follow Us
                    </a>
                </nav>

                <button
                    type="button"
                    className={cn(
                        'mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full border transition md:hidden',
                        isLight
                            ? 'border-rose-100 text-rose-400 hover:border-rose-200 hover:text-rose-500'
                            : 'border-white/20 text-rose-200 hover:border-rose-300/80 hover:text-rose-200'
                    )}
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className={cn(
                            'pointer-events-auto mx-auto mt-3 w-[min(92%,1100px)] overflow-hidden rounded-3xl border px-6 py-6 shadow-[0_24px_60px_rgba(244,63,94,0.14)] md:hidden',
                            isLight
                                ? 'border-rose-100 bg-white text-slate-700'
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
                                            ? 'border-rose-100 bg-rose-50/60 hover:border-rose-200 hover:bg-rose-100/60'
                                            : 'border-white/10 bg-white/5 hover:border-rose-400/60 hover:bg-rose-500/10'
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>{link.label}</span>
                                    <span
                                        className={cn(
                                            'text-xs uppercase tracking-[0.3em]',
                                            isLight ? 'text-rose-300' : 'text-rose-200'
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
                                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(244,63,94,0.2)]"
                                onClick={() => setIsOpen(false)}
                            >
                                <Facebook className="w-4 h-4" />
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
