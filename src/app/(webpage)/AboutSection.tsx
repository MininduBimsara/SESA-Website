"use client"

import React from 'react'
import Image from 'next/image'

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
            
            {/* About SESA Card */}
            <section className="bg-[#FCFCFC] rounded-[2rem] md:rounded-[2.5rem] border border-[#D2D2D2] shadow-xl overflow-hidden relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] items-stretch">
                    {/* Left: Text Content */}
                    <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#11112A]">
                            Who We Are
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#11112A] tracking-tight leading-tight">
                            About <span className="text-[#11112A]">SESA</span>
                        </h2>
                        <div className="space-y-4">
                            <p className="text-[0.975rem] md:text-[1.05rem] text-[#32324E] leading-relaxed font-normal">
                                SESA is the <strong className="text-[#11112A] font-semibold">official student society</strong> for Software Engineering
                                undergraduates in the Faculty of Science at University of Kelaniya.
                            </p>
                            <p className="text-[0.975rem] md:text-[1.05rem] text-[#32324E] leading-relaxed font-normal">
                                Our mission is to help students build both <strong className="text-[#11112A] font-semibold">technical (&quot;hard&quot;) skills</strong> and
                                <strong className="text-[#11112A] font-semibold"> interpersonal (&quot;soft&quot;) skills</strong>, encouraging collaboration and creating
                                unity among students throughout their academic journey.
                            </p>
                            <p className="text-[0.975rem] md:text-[1.05rem] text-[#32324E] leading-relaxed font-normal">
                                We represent one of the <strong className="text-[#11112A] font-semibold">pioneering software engineering degree programmes
                                in Sri Lanka&apos;s state university system</strong>, fostering innovation and
                                excellence in software engineering education.
                            </p>
                        </div>
                    </div>

                    {/* Right: Image (No container, split design) */}
                    <div className="relative lg:col-span-7 min-h-[350px] lg:min-h-full w-full">
                        <Image
                             src="/students-collaborating-on-software-development-pro.jpg"
                            alt="SESA members collaborating"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/5" />
                    </div>
                </div>
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
