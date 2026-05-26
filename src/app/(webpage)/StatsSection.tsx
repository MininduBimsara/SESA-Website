import React from 'react'
import prisma from '@/lib/prisma'

async function getStatistics() {
    try {
        const statistics = await prisma.statistic.findMany({
            where: { active: true },
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        })
        return statistics
    } catch (error) {
        console.error('Failed to fetch statistics:', error)
        return []
    }
}

const getColorBarClass = (color: string) => {
    const colorLower = color?.toLowerCase() || ''
    if (colorLower === 'rose') return 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
    if (colorLower === 'blue') return 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]'
    if (colorLower === 'purple') return 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
    if (colorLower === 'green') return 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
    return 'bg-white/40'
}

const StatsSection = async () => {
    const statistics = await getStatistics()

    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-8 bg-[#FCFCFC]">
            {/* Dark Widescreen Container Card */}
            <section className="bg-[#11112A] border border-[#32324E]/50 shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 relative overflow-hidden flex flex-col gap-10 md:gap-12">
                
                {/* Background Grid Mesh */}
                <div className="absolute inset-0 bg-[radial-gradient(#32324E_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

                {/* Background Ambient Glows */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10 w-full">
                    {/* Left Column: Heading and Context */}
                    <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#FCFCFC]/20 bg-[#FCFCFC]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FCFCFC]">
                            Our Metrics
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-base text-[#D2D2D2]/80 font-normal leading-relaxed">
                            Growing stronger together, one milestone at a time.
                        </p>
                    </div>

                    {/* Right Column: Dynamic Typographic Stats */}
                    <div className="lg:col-span-8 w-full">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-0 lg:divide-x lg:divide-[#32324E]/60 w-full">
                            {statistics.length > 0 ? (
                                statistics.map((stat) => (
                                    <div
                                        key={stat.id}
                                        className="flex flex-col items-center lg:items-start text-center lg:text-left lg:px-8 first:pl-0 last:pr-0 group transition-all duration-300"
                                    >
                                        <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none tabular-nums group-hover:scale-105 transition-transform duration-300">
                                            {stat.value}
                                        </div>
                                        <div className={`w-8 h-1 rounded-full mt-3.5 ${getColorBarClass(stat.color)}`} />
                                        <div className="text-xs md:text-sm font-bold text-[#D2D2D2] tracking-widest uppercase mt-3.5 group-hover:text-white transition-colors">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-[#D2D2D2]/50 py-12">
                                    <p>No statistics available yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StatsSection
