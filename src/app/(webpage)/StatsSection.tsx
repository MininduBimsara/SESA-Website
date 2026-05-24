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

    const getColorClasses = (color: string) => {
        const colors: Record<string, string> = {
            rose: 'bg-rose-100 text-rose-600',
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            green: 'bg-green-100 text-green-600'
        }
        return colors[color] || colors.rose
    }

    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-xl text-rose-100">
                        Growing stronger together, one milestone at a time
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {statistics.length > 0 ? (
                        statistics.map((stat) => {
                            const Icon = getIconComponent(stat.icon)
                            return (
                                <div
                                    key={stat.id}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                                >
                                    <div className={`w-16 h-16 rounded-full ${getColorClasses(stat.color)} flex items-center justify-center mx-auto mb-4`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-rose-100 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center text-white/80 py-12">
                            <p>No statistics available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default StatsSection
