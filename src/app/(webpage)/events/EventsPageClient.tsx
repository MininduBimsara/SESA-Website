'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Users, Clock, Search, ArrowRight, Sparkles, Filter, Code, BookOpen, Trophy, Users as UsersIcon, Heart } from 'lucide-react'
import type { Event } from '@/types/event'

type EventCategory = 'all' | 'hackathon' | 'workshop' | 'social' | 'csr' | 'competition'
type EventStatus = 'upcoming' | 'ongoing' | 'past'

interface EventsPageClientProps {
    events: Event[]
}

const categories = [
    { value: 'all', label: 'All Events', icon: Filter },
    { value: 'hackathon', label: 'Hackathons', icon: Code },
    { value: 'workshop', label: 'Workshops', icon: BookOpen },
    { value: 'competition', label: 'Competitions', icon: Trophy },
    { value: 'social', label: 'Social Events', icon: UsersIcon },
    { value: 'csr', label: 'CSR Activities', icon: Heart }
]

const statusBadgeConfig = {
    upcoming: { label: 'Upcoming', color: 'bg-blue-500 text-white' },
    ongoing: { label: 'Ongoing', color: 'bg-green-500 text-white' },
    past: { label: 'Past', color: 'bg-gray-500 text-white' }
}

const EventsPageClient: React.FC<EventsPageClientProps> = ({ events }) => {
    const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'all'>('all')

    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus
        return matchesCategory && matchesSearch && matchesStatus
    })

    const featuredEvents = events.filter(event => event.featured && event.status === 'upcoming')

    return (
        <div className="w-full max-w-[1600px] mx-auto px-3 pt-24 pb-8 md:px-5 md:pt-28 bg-white flex flex-col gap-6 md:gap-8">
            {/* Hero Section Card */}
            <section className="relative rounded-[2rem] md:rounded-[2.5rem] bg-black text-white border border-white/5 shadow-2xl py-20 px-6 md:px-10 lg:px-12 text-center overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" 
                    style={{ backgroundImage: 'url(/tech-workshop-and-coding-event-with-students.jpg)' }} 
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 space-y-4">
                    <span className="text-[#EC1640] text-xs font-semibold uppercase tracking-[0.2em]">CALENDAR</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif text-white tracking-normal leading-tight">
                        Discover SESA Events
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light">
                        Explore workshops, hackathons, and networking opportunities that shape your future
                    </p>
                </div>
            </section>

            {/* Featured Events Card */}
            {featuredEvents.length > 0 && (
                <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="w-5 h-5 text-[#EC1640] animate-pulse" />
                        <h2 className="text-2xl md:text-3xl font-semibold font-serif text-slate-950">Featured Events</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredEvents.map(event => (
                            <Card key={event.id} className="hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-[#EC1640]/50 rounded-2xl flex flex-col justify-between overflow-hidden">
                                <div className="relative h-44 w-full bg-slate-50">
                                    <Image 
                                        src={event.image || '/tech-workshop-and-coding-event-with-students.jpg'} 
                                        alt={event.title} 
                                        fill 
                                        className="object-cover" 
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#EC1640] text-white">
                                            Featured
                                        </span>
                                    </div>
                                </div>
                                <CardHeader className="p-5">
                                    <CardTitle className="text-lg font-serif font-semibold leading-snug line-clamp-2">{event.title}</CardTitle>
                                    <div className="space-y-1.5 text-xs text-slate-500 mt-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-[#EC1640]" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-[#EC1640]" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-5 pb-4">
                                    <p className="text-slate-650 text-sm line-clamp-3">{event.description}</p>
                                </CardContent>
                                <CardFooter className="px-5 pb-5 pt-0">
                                    <Link href={`/events/${event.id}`} className="w-full">
                                        <Button className="w-full bg-[#EC1640] hover:bg-[#d61237] text-white rounded-xl shadow-sm text-xs font-semibold py-2.5">
                                            Register Now
                                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Search and Filters Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden flex flex-col gap-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full lg:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-full focus:ring-2 focus:ring-[#EC1640]/20 focus:border-[#EC1640] outline-none"
                        />
                    </div>

                    {/* Status Filters */}
                    <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        {(['all', 'upcoming', 'ongoing', 'past'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${selectedStatus === status
                                    ? 'bg-[#EC1640] text-white shadow-sm'
                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                    {categories.map((cat) => {
                        const Icon = cat.icon
                        return (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value as EventCategory)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${selectedCategory === cat.value
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {cat.label}
                            </button>
                        )
                    })}
                </div>
            </section>

            {/* Events Grid Card */}
            <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200/80 shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                        <h3 className="text-xl font-serif font-semibold text-slate-800">No events found</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">Try adjusting your filters or search keywords.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 text-sm text-slate-500 font-medium">
                            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredEvents.map((event) => (
                                <Card key={event.id} className="hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-200 rounded-2xl justify-between overflow-hidden">
                                    <div className="relative h-44 w-full bg-slate-50">
                                        <Image 
                                            src={event.image || '/tech-workshop-and-coding-event-with-students.jpg'} 
                                            alt={event.title} 
                                            fill 
                                            className="object-cover" 
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold ${statusBadgeConfig[event.status].color}`}>
                                                {statusBadgeConfig[event.status].label}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-white/90 text-slate-800 border border-slate-100">
                                                {event.category}
                                            </span>
                                        </div>
                                    </div>

                                    <CardHeader className="p-5 flex-grow">
                                        <CardTitle className="text-lg font-serif font-semibold line-clamp-2 leading-snug">{event.title}</CardTitle>
                                        <div className="space-y-1.5 text-xs text-slate-500 mt-3 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-[#EC1640]" />
                                                <span>{event.date}</span>
                                            </div>
                                            {event.time && (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3.5 h-3.5 text-[#EC1640]" />
                                                    <span>{event.time}</span>
                                                </div>
                                            )}
                                            {event.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-3.5 h-3.5 text-[#EC1640]" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </div>
                                            )}
                                            {event.participants && event.participants > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-3.5 h-3.5 text-[#EC1640]" />
                                                    <span>{event.participants} participants</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>

                                    <CardContent className="px-5 pb-4">
                                        <p className="text-slate-650 text-sm line-clamp-3 leading-relaxed">{event.description}</p>
                                    </CardContent>

                                    <CardFooter className="px-5 pb-5 pt-0 flex gap-2">
                                        <Link href={`/events/${event.id}`} className="w-full">
                                            <Button variant="outline" className="w-full text-xs font-semibold py-2 rounded-xl hover:bg-slate-50">
                                                Learn More
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default EventsPageClient
