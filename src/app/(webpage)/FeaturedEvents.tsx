import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
        color: "bg-green-500 text-white"
    },
    upcoming: {
        label: "Upcoming",
        color: "bg-blue-500 text-white"
    },
    past: {
        label: "Past",
        color: "bg-gray-500 text-white"
    }
}

const FeaturedEvents = async () => {
    const events = await getFeaturedEvents()
    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Featured Events
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our latest workshops, hackathons, and networking opportunities
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.length > 0 ? (
                        events.map((event) => {
                            const status = (event.status || 'upcoming') as keyof typeof statusConfig
                            return (
                                <Card
                                    key={event.id}
                                    className="hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                                >
                                    {/* Event Image */}
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={event.image || '/placeholder-event.jpg'}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* Status Badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[status].color}`}>
                                                {statusConfig[status].label}
                                            </span>
                                        </div>
                                    </div>

                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{event.date}</span>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <CardDescription className="text-sm line-clamp-3">
                                            {event.description}
                                        </CardDescription>
                                    </CardContent>

                                    <CardFooter>
                                        <Link href={`/events/${event.id}`} className="w-full">
                                            <Button
                                                variant="outline"
                                                className="w-full group"
                                            >
                                                View Details
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <p>No featured events available at this time.</p>
                        </div>
                    )}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Link href="/events">
                        <Button size="lg" className="px-8">
                            View All Events
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedEvents
