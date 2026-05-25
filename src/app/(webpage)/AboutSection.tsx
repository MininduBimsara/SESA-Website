"use client"

import React from 'react'
import Image from 'next/image'
import { Target, Users, Lightbulb, Briefcase } from 'lucide-react'

const coreFocus = [
    {
        title: "Skill Development",
        description: "Build technical and interpersonal skills through workshops, hackathons, and hands-on projects.",
        icon: Target,
        image: "/tech-workshop-and-coding-event-with-students.jpg",
    },
    {
        title: "Research & Innovation",
        description: "Promote research and innovation in emerging technologies and software engineering practices.",
        icon: Lightbulb,
        image: "/modern-tech-workspace-with-coding-screens-and-coll.jpg",
    },
    {
        title: "Industry Collaboration",
        description: "Enhance learning through partnerships with industry, providing real-world exposure and networking.",
        icon: Briefcase,
        image: "/professional-software-engineering-career-developme.jpg",
    },
    {
        title: "Community Building",
        description: "Foster interaction and unity among students, lecturers, and alumni for collaborative growth.",
        icon: Users,
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
        <div className="w-full max-w-[1600px] mx-auto px-3 py-6 md:px-5 md:py-8 bg-white flex flex-col gap-6 md:gap-8">
            
            {/* About SESA Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-6 flex flex-col items-start">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                            Who We Are
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-none">
                            About <span className="text-[#EC1640]">SESA</span>
                        </h2>
                        <div className="space-y-4">
                            <p className="text-[0.975rem] md:text-[1.05rem] text-slate-700 leading-relaxed font-normal">
                                SESA is the <strong className="text-black font-semibold">official student society</strong> for Software Engineering
                                undergraduates in the Faculty of Science at University of Kelaniya.
                            </p>
                            <p className="text-[0.975rem] md:text-[1.05rem] text-slate-700 leading-relaxed font-normal">
                                Our mission is to help students build both <strong className="text-black font-semibold">technical (&quot;hard&quot;) skills</strong> and
                                <strong className="text-black font-semibold"> interpersonal (&quot;soft&quot;) skills</strong>, encouraging collaboration and creating
                                unity among students throughout their academic journey.
                            </p>
                            <p className="text-[0.975rem] md:text-[1.05rem] text-slate-700 leading-relaxed font-normal">
                                We represent one of the <strong className="text-black font-semibold">pioneering software engineering degree programmes
                                in Sri Lanka&apos;s state university system</strong>, fostering innovation and
                                excellence in software engineering education.
                            </p>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative h-[340px] md:h-[420px] rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl group">
                        <Image
                            src="/students-collaborating-on-software-development-pro.jpg"
                            alt="SESA members collaborating"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </div>
            </section>

            {/* What We Do Sticky Slide Section */}
            <section 
                ref={containerRef}
                className="relative w-full h-auto lg:h-[400vh] bg-slate-950 text-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-800 shadow-2xl"
            >
                {/* Mobile View: Regular stacked cards (Hidden on Desktop) */}
                <div className="lg:hidden flex flex-col gap-12 p-6 md:p-10">
                    <div className="space-y-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                            Our Core Focus
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">
                            What We Do
                        </h2>
                    </div>
                    
                    <div className="flex flex-col gap-10">
                        {coreFocus.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-6">
                                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#EC1640] flex items-center justify-center text-white shrink-0">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed px-2">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop View: Sticky Slides (Hidden on Mobile) */}
                <div className="hidden lg:flex relative w-full sticky top-0 h-screen items-center p-12 xl:p-16 overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
                    
                    {/* Subtle Modern Blob Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-[#EC1640] rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
                        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-3000"></div>
                    </div>

                    <div className="relative z-10 w-full grid grid-cols-2 gap-16 xl:gap-24 items-center h-full max-h-[800px] mx-auto max-w-[1400px]">
                        
                        {/* Left Side: Text Slides */}
                        <div className="relative h-full flex flex-col justify-center">
                            {coreFocus.map((item, idx) => {
                                const isActive = idx === activeIndex
                                return (
                                    <div 
                                        key={idx}
                                        className={`absolute w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            isActive 
                                                ? 'opacity-100 translate-y-0' 
                                                : idx < activeIndex 
                                                    ? 'opacity-0 -translate-y-16 pointer-events-none'
                                                    : 'opacity-0 translate-y-16 pointer-events-none'
                                        }`}
                                    >
                                        <div className="space-y-8">
                                            <div className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#EC1640]">
                                                Our Core Focus • 0{idx + 1}/04
                                            </div>
                                            <h2 className="text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-tight">
                                                {item.title}
                                            </h2>
                                            <p className="text-xl xl:text-2xl text-slate-400 leading-relaxed max-w-lg font-light">
                                                {item.description}
                                            </p>
                                            
                                            <div className="flex items-center gap-6 pt-4">
                                                <div className="w-16 h-16 rounded-2xl bg-[#EC1640] flex items-center justify-center text-white shadow-xl shadow-[#EC1640]/20">
                                                    <item.icon className="w-8 h-8" />
                                                </div>
                                                <div className="flex gap-2">
                                                    {coreFocus.map((_, dotIdx) => (
                                                        <div 
                                                            key={dotIdx} 
                                                            className={`h-2 rounded-full transition-all duration-500 ${
                                                                dotIdx === activeIndex ? 'w-10 bg-[#EC1640]' : 'w-2 bg-slate-700'
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

                        {/* Right Side: Image Slides */}
                        <div className="relative h-[70vh] w-full rounded-[2.5rem] overflow-hidden border border-slate-800/80 shadow-2xl">
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
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
