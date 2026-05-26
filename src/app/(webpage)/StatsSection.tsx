import React from 'react'
import { Users } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import * as LucideIcons from 'lucide-react'
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

const StatsSection = async () => {
    const statistics = await getStatistics()

    const getIconComponent = (iconName: string): ComponentType<SVGProps<SVGSVGElement> & { className?: string }> => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Icon = (LucideIcons as any)[iconName]
        return Icon || Users
    }

    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-8 bg-[#FCFCFC]">
            {/* Dark Widescreen Container Card */}
            <section className="bg-[#11112A] border border-[#32324E]/50 shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 relative overflow-hidden flex flex-col gap-10 md:gap-12">
                


                {/* Section Header */}
                <div className="text-center relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#FCFCFC]/20 bg-[#FCFCFC]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FCFCFC]">
                        Our Metrics
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-base md:text-lg text-[#D2D2D2] font-normal">
                        Growing stronger together, one milestone at a time.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
                    {statistics.length > 0 ? (
                        statistics.map((stat) => {
                            const Icon = getIconComponent(stat.icon)
                            return (
                                <div
                                    key={stat.id}
                                    className="bg-[#32324E]/40 border border-[#32324E]/60 hover:border-[#FCFCFC]/50 rounded-2xl md:rounded-[1.75rem] p-5 md:p-8 text-center hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 group"
                                >
                                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl border border-[#32324E] bg-[#11112A] text-[#FCFCFC] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs md:text-[0.875rem] text-[#D2D2D2] font-medium tracking-wide uppercase">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center text-[#D2D2D2]/50 py-12">
                            <p>No statistics available yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default StatsSection
