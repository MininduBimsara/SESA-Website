'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
    {
        id: 1,
        title: 'Empowering Future Software Engineers',
        subtitle: 'Join a community of passionate developers and innovators shaping the future of technology',
        cta: 'Join Now',
        ctaLink: '/about',
        image: '/students-collaborating-on-software-development-pro.jpg',
        badge: 'SESA Innovation & Leadership Network',
    },
    {
        id: 2,
        title: 'Collaborate, Learn, and Innovate Together',
        subtitle: 'Connect with peers, share knowledge, and build amazing projects in a supportive environment',
        cta: 'Learn More',
        ctaLink: '/about',
        image: '/modern-tech-workspace-with-coding-screens-and-coll.jpg',
        badge: 'Collaboration in Action',
    },
    {
        id: 3,
        title: 'Join Our Coding Events and Workshops',
        subtitle: 'Participate in hackathons, workshops, and tech talks led by industry professionals',
        cta: 'View Events',
        ctaLink: '/events',
        image: '/tech-workshop-and-coding-event-with-students.jpg',
        badge: 'Workshops • Hackathons • Tech Talks',
    },
    {
        id: 4,
        title: 'Build Your Professional Career',
        subtitle: 'Access mentorship, networking opportunities, and career development resources',
        cta: 'Get Started',
        ctaLink: '/team',
        image: '/professional-software-engineering-career-developme.jpg',
        badge: 'Mentorship & Career Growth Hub',
    },
]

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
}

const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
}

export default function HeroSlider() {
    const [activeIndex, setActiveIndex] = React.useState(0)

    return (
        <div className="relative w-full h-screen min-h-[680px] overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-custom',
                    bulletClass: 'swiper-pagination-bullet-custom',
                    bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                loop={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            {/* Background Image with Parallax Effect */}
                            <motion.div
                                initial={{ scale: 1.08, opacity: 0.85 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                />
                                {/* Elegant Dark Overlay */}
                                <div className="absolute inset-0 bg-slate-950/75" />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-slate-950/80" />
                            </motion.div>

                            {/* Content Container */}
                            <div className="relative z-10 h-full flex items-center">
                                <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-6xl">
                                    <div className="flex flex-col gap-8 sm:gap-10">
                                        <div>
                                            <motion.div
                                                key={`badge-${slide.id}-${activeIndex}`}
                                                initial={{ opacity: 0, y: 18 }}
                                                animate={activeIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                                                transition={{ duration: 0.7, delay: 0.15 }}
                                                className="inline-flex items-center gap-2 rounded-full border border-rose-500/50 bg-rose-500/15 px-4 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-rose-100"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                                                {slide.badge}
                                            </motion.div>
                                        </div>

                                        <motion.h1
                                            key={`title-${slide.id}-${activeIndex}`}
                                            variants={titleVariants}
                                            initial="hidden"
                                            animate={activeIndex === index ? 'visible' : 'hidden'}
                                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.1]"
                                        >
                                            <span className="block text-balance text-white">{slide.title}</span>
                                        </motion.h1>

                                        <motion.p
                                            key={`subtitle-${slide.id}-${activeIndex}`}
                                            variants={textVariants}
                                            initial="hidden"
                                            animate={activeIndex === index ? 'visible' : 'hidden'}
                                            transition={{ delay: 0.25 }}
                                            className="max-w-2xl text-base sm:text-lg lg:text-xl text-slate-100/80 leading-relaxed"
                                        >
                                            {slide.subtitle}
                                        </motion.p>

                                        <motion.div
                                            key={`cta-${slide.id}-${activeIndex}`}
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={activeIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                                            transition={{ duration: 0.7, delay: 0.35 }}
                                            className="flex flex-wrap items-center gap-4"
                                        >
                                            <a
                                                href={slide.ctaLink}
                                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-rose-500 to-rose-400 px-8 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(244,63,94,0.28)] transition-all duration-300 hover:brightness-110"
                                            >
                                                <span>{slide.cta}</span>
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </a>

                                            <a
                                                href="/team"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-rose-400/70 hover:text-white"
                                            >
                                                <span>Meet the Team</span>
                                            </a>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Simple Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950/70 text-rose-200 shadow-[0_12px_28px_rgba(15,23,42,0.45)] backdrop-blur transition hover:border-rose-400/60 hover:text-rose-100">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6l-6 6 6 6" />
                    </svg>
                </span>
            </button>

            <button className="swiper-button-next-custom absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950/70 text-rose-200 shadow-[0_12px_28px_rgba(15,23,42,0.45)] backdrop-blur transition hover:border-rose-400/60 hover:text-rose-100">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6l6 6-6 6" />
                    </svg>
                </span>
            </button>

            {/* Refined Pagination */}
            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
                <div className="flex justify-center px-6 sm:px-10">
                    <div className="swiper-pagination-custom flex items-center gap-2" />
                </div>
            </div>

            {/* Pagination Styles */}
            <style jsx global>{`
                .swiper-pagination-bullet-custom {
                    width: 8px;
                    height: 8px;
                    border-radius: 9999px;
                    background-color: rgba(248, 113, 113, 0.24);
                    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
                    transition: all 0.3s ease;
                }

                .swiper-pagination-bullet-custom:hover {
                    background-color: rgba(244, 63, 94, 0.45);
                }

                .swiper-pagination-bullet-active-custom {
                    width: 28px;
                    background-image: linear-gradient(90deg, rgba(244, 63, 94, 0.9), rgba(248, 113, 113, 0.95));
                    box-shadow: 0 12px 24px rgba(244, 63, 94, 0.35);
                }

                .swiper-slide {
                    opacity: 0 !important;
                    transition: opacity 1.4s ease !important;
                }

                .swiper-slide-active {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    )
}
