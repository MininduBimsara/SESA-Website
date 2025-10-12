'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

type EventStatus = 'ongoing' | 'upcoming' | 'past'

interface Event {
    id: number
    title: string
    date: string
    description: string
    image: string
    status: EventStatus
}

const events: Event[] = [
    {
        id: 1,
        title: "Tech Workshop 2024",
        date: "December 15, 2024",
        description: "Join us for an intensive workshop on modern web development featuring Next.js, React, and TypeScript.",
        image: "/tech-workshop-and-coding-event-with-students.jpg",
        status: "upcoming"
    },
    {
        id: 2,
        title: "Career Development Seminar",
        date: "November 20, 2024",
        description: "Learn about internship opportunities, CV building, and interview preparation from industry professionals.",
        image: "/professional-software-engineering-career-developme.jpg",
        status: "past"
    },
    {
        id: 3,
        title: "Hackathon 2024",
        date: "October 15, 2024",
        description: "24-hour coding challenge where students build innovative solutions to real-world problems.",
        image: "/students-collaborating-on-software-development-pro.jpg",
        status: "ongoing"
    },
    {
        id: 4,
        title: "Modern Tech Workspace",
        date: "January 10, 2025",
        description: "Explore the latest trends in software engineering and collaborative development practices.",
        image: "/modern-tech-workspace-with-coding-screens-and-coll.jpg",
        status: "upcoming"
    }
]

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

const FeaturedEvents = () => {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
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
                    {events.map((event) => (
                        <Card
                            key={event.id}
                            className="hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                        >
                            {/* Event Image */}
                            <div className="relative h-48 w-full">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Status Badge */}
                                <div className="absolute top-3 right-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[event.status].color}`}>
                                        {statusConfig[event.status].label}
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
                                <Button
                                    variant="outline"
                                    className="w-full group"
                                >
                                    View Details
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Button size="lg" className="px-8">
                        View All Events
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedEvents
