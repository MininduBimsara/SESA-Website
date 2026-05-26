import React from 'react'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/prisma'

async function getFeaturedEvents() {
    try {
        const events = await prisma.event.findMany({
            where: { featured: true },
            orderBy: { date: 'desc' },
            take: 4,
        })
        return events
    } catch (error) {
        console.error('Failed to fetch featured events:', error)
        return []
    }
}

const statusConfig = {
    ongoing: {
        label: "Ongoing",
        color: "bg-black border-black text-[#FCFCFC]"
    },
    upcoming: {
        label: "Upcoming",
        color: "bg-[#11112A] border-[#11112A] text-[#FCFCFC]"
    },
    past: {
        label: "Past",
        color: "bg-[#32324E] border-[#32324E] text-[#D2D2D2]"
    }
}

const FeaturedEvents = async () => {
    const events = await getFeaturedEvents()
    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-8 bg-[#FCFCFC]">
            {/* White Rounded Frame Card */}
            <section className="bg-[#FCFCFC] rounded-[2rem] md:rounded-[2.5rem] border border-[#D2D2D2] shadow-xl p-6 md:p-10 lg:p-12 flex flex-col gap-10 md:gap-12 relative overflow-hidden">
                
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#11112A]">
                        What&apos;s Happening
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#11112A] tracking-tight leading-none">
                        Featured Events
                    </h2>
                    <p className="text-base md:text-lg text-[#32324E] max-w-xl mx-auto font-normal">
                        Discover our latest workshops, hackathons, and networking opportunities.
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {events.length > 0 ? (
                        events.map((event) => {
                            const status = (event.status || 'upcoming') as keyof typeof statusConfig
                            return (
                                <div
                                    key={event.id}
                                    className="bg-[#FCFCFC] border border-[#D2D2D2] rounded-[1.75rem] overflow-hidden hover:border-[#32324E] hover:shadow-md transition-all duration-300 flex flex-col group"
                                >
                                    {/* Event Image */}
                                    <div className="relative h-48 w-full overflow-hidden bg-[#D2D2D2]/10">
                                        <Image
                                            src={event.image || '/2.jpeg'}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Status Badge */}
                                        <div className="absolute top-3.5 right-3.5">
                                            <span className={`px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusConfig[status].color}`}>
                                                {statusConfig[status].label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Event Details */}
                                    <div className="p-5 flex-grow flex flex-col justify-between gap-5">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-1.5 text-xs text-[#32324E] font-semibold uppercase tracking-wider">
                                                <Calendar className="w-3.5 h-3.5 text-[#11112A]" />
                                                <span>{event.date}</span>
                                            </div>
                                            <h3 className="text-[1.125rem] font-bold text-[#11112A] group-hover:text-[#32324E] transition-colors leading-snug line-clamp-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-[0.875rem] text-[#32324E]/85 leading-relaxed font-normal line-clamp-3">
                                                {event.description}
                                            </p>
                                        </div>

                                        <Link href={`/events/${event.id}`} className="block w-full">
                                            <button className="w-full bg-[#D2D2D2]/20 hover:bg-[#11112A] text-[#11112A] hover:text-[#FCFCFC] border border-[#D2D2D2] hover:border-[#11112A] font-bold rounded-2xl py-3 text-xs flex items-center justify-center gap-1.5 transition-all duration-300">
                                                <span>View Details</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center py-12 text-[#32324E]">
                            <p>No featured events available at this time.</p>
                        </div>
                    )}
                </div>

                {/* View All Button */}
                <div className="text-center pt-2">
                    <Link href="/events" className="inline-block">
                        <button className="bg-[#11112A] hover:bg-[#32324E] text-[#FCFCFC] border border-[#11112A] hover:border-[#32324E] font-bold rounded-full px-8 py-3.5 text-sm transition-all duration-300 flex items-center gap-1.5 hover:scale-[1.02] active:scale-95 shadow-md">
                            <span>View All Events</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default FeaturedEvents
