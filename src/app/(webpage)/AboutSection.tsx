"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GraduationCap, Code, Users } from 'lucide-react'

const coreFocus = [
    {
        title: "Skill Development",
        description: "Build technical and interpersonal skills through workshops, hackathons, and hands-on projects.",
        image: "/tech-workshop-and-coding-event-with-students.jpg",
    },
    {
        title: "Research & Innovation",
        description: "Promote research and innovation in emerging technologies and software engineering practices.",
        image: "/modern-tech-workspace-with-coding-screens-and-coll.jpg",
    },
    {
        title: "Industry Collaboration",
        description: "Enhance learning through partnerships with industry, providing real-world exposure and networking.",
        image: "/professional-software-engineering-career-developme.jpg",
    },
    {
        title: "Community Building",
        description: "Foster interaction and unity among students, lecturers, and alumni for collaborative growth.",
        image: "/student-community-collaboration.png",
    },
]

const AboutSection = () => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = React.useState(0)

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1024) return
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const containerHeight = rect.height
            const scrolled = -rect.top // how much has scrolled past the top of the container
            
            // Calculate progress (0 to 1)
            const totalScrollableHeight = containerHeight - window.innerHeight
            if (totalScrollableHeight <= 0) return
            
            let progress = scrolled / totalScrollableHeight
            progress = Math.max(0, Math.min(1, progress)) // clamp between 0 and 1
            
            // Map progress to activeIndex (0 to 3)
            const index = Math.min(
                Math.floor(progress * coreFocus.length),
                coreFocus.length - 1
            )
            setActiveIndex(index)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll)
        // Run once on mount
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])


    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 py-6 md:px-5 md:py-8 bg-[#FCFCFC] flex flex-col gap-6 md:gap-8">
            
            {/* About SESA Section */}
            <section className="bg-[#FCFCFC] rounded-[2rem] md:rounded-[2.5rem] border border-[#D2D2D2] shadow-xl overflow-hidden relative p-8 md:p-12 lg:p-16 flex flex-col gap-12 lg:gap-16">
                
                {/* Decorative background grids/dots */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(#11112A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none rounded-full" />
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[radial-gradient(#11112A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none rounded-full" />

                {/* Section Header & Narrative */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                    {/* Left Column: Heading */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#11112A]"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#11112A] animate-pulse" />
                            Who We Are
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#11112A] tracking-tight leading-[1.1]"
                        >
                            Pioneering the Future of <span className="bg-gradient-to-r from-[#11112A] via-[#32324E] to-[#11112A] bg-clip-text text-transparent">Software Engineering</span>
                        </motion.h2>
                    </div>

                    {/* Right Column: Detailed Narrative */}
                    <div className="lg:col-span-5 lg:pt-8">
                        <motion.p 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-[#32324E] leading-relaxed font-normal border-l-2 border-[#11112A]/20 pl-6"
                        >
                            The Software Engineering Students&apos; Association (SESA) is the official student body representing undergraduates in the Faculty of Science at the University of Kelaniya. We are dedicated to bridging the gap between academic theories and industry standards, creating a launchpad for future tech leaders.
                        </motion.p>
                    </div>
                </div>

                {/* Interactive Pillars Grid (3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {[
                        {
                            icon: GraduationCap,
                            title: "Official Student Body",
                            description: "Representing the pioneering SE degree programme at the Faculty of Science, University of Kelaniya.",
                            accent: "from-[#11112A]/10 to-[#11112A]/0"
                        },
                        {
                            icon: Code,
                            title: "Skill Synthesis",
                            description: "Fostering both cutting-edge technical proficiency and professional leadership traits through hands-on projects.",
                            accent: "from-[#32324E]/10 to-[#32324E]/0"
                        },
                        {
                            icon: Users,
                            title: "Collaborative Community",
                            description: "Cultivating unity, peer mentoring, and a lifelong network of industry professionals and alumni.",
                            accent: "from-[#11112A]/10 to-[#11112A]/0"
                        }
                    ].map((pillar, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                            whileHover={{ y: -6, borderColor: '#11112A' }}
                            className="relative bg-white/50 backdrop-blur-sm border border-[#D2D2D2] p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between min-h-[260px] group overflow-hidden"
                        >
                            {/* Card Hover Ambient Glow */}
                            <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                            
                            {/* Decorative background grid inside card */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="space-y-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-[#11112A]/5 border border-[#11112A]/10 flex items-center justify-center text-[#11112A] group-hover:bg-[#11112A] group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm">
                                    <pillar.icon className="w-6 h-6 transition-transform duration-500 group-hover:rotate-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#11112A] group-hover:text-[#11112A]/90 transition-colors duration-300">{pillar.title}</h3>
                                <p className="text-sm text-[#32324E]/80 leading-relaxed font-normal">{pillar.description}</p>
                            </div>
                            
                            {/* Bottom interactive indicator */}
                            <div className="pt-6 border-t border-[#D2D2D2]/30 mt-6 flex items-center justify-between relative z-10">
                                <span className="text-xs font-semibold text-[#11112A]/40 uppercase tracking-widest group-hover:text-[#11112A]/80 transition-colors duration-300">Pillar 0{idx + 1}</span>
                                <div className="w-6 h-6 rounded-full bg-[#11112A]/5 flex items-center justify-center text-[#11112A] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Minimalist Stats / Quick Facts Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="border-t border-[#D2D2D2] pt-8 md:pt-10 flex flex-wrap gap-y-6 justify-between items-center relative z-10"
                >
                    <div className="flex flex-wrap gap-x-12 gap-y-4">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-[#32324E]/50 uppercase tracking-wider">Established</p>
                            <p className="text-lg font-bold text-[#11112A]">Year 2017</p>
                        </div>
                        <div className="w-[1px] h-10 bg-[#D2D2D2] hidden sm:block" />
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-[#32324E]/50 uppercase tracking-wider">Affiliation</p>
                            <p className="text-lg font-bold text-[#11112A]">University of Kelaniya</p>
                        </div>
                        <div className="w-[1px] h-10 bg-[#D2D2D2] hidden sm:block" />
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-[#32324E]/50 uppercase tracking-wider">Representation</p>
                            <p className="text-lg font-bold text-[#11112A]">Faculty of Science</p>
                        </div>
                    </div>
                    
                    <div className="bg-[#11112A] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md flex items-center gap-2 border border-white/10 hover:bg-[#32324E] transition-colors duration-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Official Student Body
                    </div>
                </motion.div>
            </section>

            {/* What We Do Sticky Slide Section */}
            <section 
                ref={containerRef}
                className="relative w-full h-auto lg:h-[400vh]"
            >
                {/* Mobile View: Regular stacked cards (Hidden on Desktop) */}
                <div className="lg:hidden flex flex-col gap-12 p-6 md:p-10 bg-[#FCFCFC] text-[#11112A] rounded-[2rem] md:rounded-[2.5rem] border border-[#D2D2D2] shadow-xl overflow-hidden">
                    <div className="space-y-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#11112A]">
                            Our Core Focus
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#11112A] tracking-tight">
                            What We Do
                        </h2>
                    </div>
                    
                    <div className="flex flex-col gap-10">
                        {coreFocus.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-6">
                                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#D2D2D2] shadow-md">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/25" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                                        <h3 className="text-xl font-bold text-white">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-[#32324E] text-sm leading-relaxed px-2">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop View: Sticky Slides (Hidden on Mobile) */}
                <div className="hidden lg:flex relative w-full sticky top-0 h-[100vh] lg:h-[calc(100vh-2rem)] lg:top-4 items-stretch overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-[#FCFCFC] text-[#11112A] border border-[#D2D2D2] shadow-xl">
                    <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                        
                        {/* Left Side: Text Slides */}
                        <div className="relative h-full flex flex-col justify-center lg:col-span-5 p-12 xl:p-16">
                            {coreFocus.map((item, idx) => {
                                const isActive = idx === activeIndex
                                return (
                                    <div 
                                        key={idx}
                                        className={`absolute inset-x-12 xl:inset-x-16 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            isActive 
                                                ? 'opacity-100 translate-y-0' 
                                                : idx < activeIndex 
                                                    ? 'opacity-0 -translate-y-16 pointer-events-none'
                                                    : 'opacity-0 translate-y-16 pointer-events-none'
                                        }`}
                                    >
                                        <div className="space-y-6">
                                            <div className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#11112A]">
                                                Our Core Focus • 0{idx + 1}/04
                                            </div>
                                            <h2 className="text-4xl xl:text-5xl font-extrabold text-[#11112A] tracking-tight leading-tight">
                                                {item.title}
                                            </h2>
                                            <p className="text-lg xl:text-xl text-[#32324E] leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                            
                                            <div className="flex items-center gap-6 pt-4">
                                                <div className="flex gap-2">
                                                    {coreFocus.map((_, dotIdx) => (
                                                        <div 
                                                            key={dotIdx} 
                                                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                                                dotIdx === activeIndex ? 'w-8 bg-[#11112A]' : 'w-1.5 bg-[#D2D2D2]'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Right Side: Image Slides (Split design, no container) */}
                        <div className="relative h-full w-full lg:col-span-7 overflow-hidden">
                            {coreFocus.map((item, idx) => {
                                const isActive = idx === activeIndex
                                return (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            isActive 
                                                ? 'opacity-100 scale-100' 
                                                : 'opacity-0 scale-[1.03] pointer-events-none'
                                        }`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            priority={idx === 0}
                                        />
                                        <div className="absolute inset-0 bg-black/20" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutSection
