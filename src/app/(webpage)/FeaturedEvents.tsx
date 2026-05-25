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
        color: "bg-green-600 border-green-600 text-white"
    },
    upcoming: {
        label: "Upcoming",
        color: "bg-[#EC1640] border-[#EC1640] text-white shadow-[0_4px_12px_rgba(236,22,64,0.2)]"
    },
    past: {
        label: "Past",
        color: "bg-neutral-800 border-neutral-800 text-neutral-300"
    }
}

const FeaturedEvents = async () => {
    const events = await getFeaturedEvents()
    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pb-6 md:px-5 md:pb-8 bg-white">
            {/* White Rounded Frame Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 flex flex-col gap-10 md:gap-12 relative overflow-hidden">
                
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#EC1640]/30 bg-[#EC1640]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#EC1640]">
                        What&apos;s Happening
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-none">
                        Featured Events
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto font-normal">
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
                                    className="bg-white border border-slate-200/75 rounded-[1.75rem] overflow-hidden hover:border-[#EC1640]/50 hover:shadow-2xl transition-all duration-300 flex flex-col group"
                                >
                                    {/* Event Image */}
                                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                        <Image
                                            src={event.image || '/placeholder-event.jpg'}
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
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                                                <Calendar className="w-3.5 h-3.5 text-[#EC1640]" />
                                                <span>{event.date}</span>
                                            </div>
                                            <h3 className="text-[1.125rem] font-bold text-black group-hover:text-[#EC1640] transition-colors leading-snug line-clamp-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-[0.875rem] text-slate-600 leading-relaxed font-normal line-clamp-3">
                                                {event.description}
                                            </p>
                                        </div>

                                        <Link href={`/events/${event.id}`} className="block w-full">
                                            <button className="w-full bg-slate-50 hover:bg-black text-slate-800 hover:text-white border border-slate-200/80 hover:border-black font-bold rounded-2xl py-3 text-xs flex items-center justify-center gap-1.5 transition-all duration-300">
                                                <span>View Details</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            <p>No featured events available at this time.</p>
                        </div>
                    )}
                </div>

                {/* View All Button */}
                <div className="text-center pt-2">
                    <Link href="/events" className="inline-block">
                        <button className="bg-black hover:bg-[#EC1640] text-white border border-black hover:border-[#EC1640] font-bold rounded-full px-8 py-3.5 text-sm transition-all duration-300 flex items-center gap-1.5 hover:scale-[1.02] active:scale-95 shadow-md">
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
