'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Calendar, MapPin, Users, Clock, Search, ArrowRight, Sparkles, Filter, Code, BookOpen, Trophy, Users as UsersIcon, Heart } from 'lucide-react'
import SocialLinks from '@/components/SocialLinks'
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 py-20 px-4 md:px-8 lg:px-16 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            SESA Events
                        </h1>
                        <p className="text-xl md:text-2xl text-rose-100 max-w-3xl mx-auto">
                            Discover workshops, hackathons, and networking opportunities that shape your future
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            {featuredEvents.length > 0 && (
                <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles className="w-6 h-6 text-rose-500" />
                            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredEvents.map(event => (
                                <Card key={event.id} className="hover:shadow-2xl transition-all duration-300 border-2 border-rose-200">
                                    <div className="relative h-48 w-full">
                                        <Image 
                                            src={event.image || '/tech-workshop-and-coding-event-with-students.jpg'} 
                                            alt={event.title} 
                                            fill 
                                            className="object-cover rounded-t-xl" 
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500 text-white">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl">{event.title}</CardTitle>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{event.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full bg-rose-500 hover:bg-rose-600">
                                            Register Now
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Search and Filter Section */}
            <section className="py-8 px-4 md:px-8 lg:px-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2">
                            {(['all', 'upcoming', 'ongoing', 'past'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedStatus === status
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        {categories.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value as EventCategory)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.value
                                        ? 'bg-rose-500 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-12 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
                            <p className="text-gray-600">Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 text-gray-600">
                                Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredEvents.map((event) => (
                                    <Card key={event.id} className="hover:shadow-xl transition-all duration-300 flex flex-col">
                                        <div className="relative h-48 w-full">
                                            <Image 
                                                src={event.image || '/tech-workshop-and-coding-event-with-students.jpg'} 
                                                alt={event.title} 
                                                fill 
                                                className="object-cover rounded-t-xl" 
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeConfig[event.status].color}`}>
                                                    {statusBadgeConfig[event.status].label}
                                                </span>
                                            </div>
                                            <div className="absolute top-3 left-3">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 capitalize">
                                                    {event.category}
                                                </span>
                                            </div>
                                        </div>

                                        <CardHeader className="flex-grow">
                                            <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                                            <div className="space-y-2 text-sm text-gray-600 mt-3">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-rose-500" />
                                                    <span>{event.date}</span>
                                                </div>
                                                {event.time && (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-rose-500" />
                                                        <span>{event.time}</span>
                                                    </div>
                                                )}
                                                {event.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-rose-500" />
                                                        <span className="line-clamp-1">{event.location}</span>
                                                    </div>
                                                )}
                                                {event.participants && event.participants > 0 && (
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-rose-500" />
                                                        <span>{event.participants} participants</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardHeader>

                                        <CardContent>
                                            <p className="text-gray-600 line-clamp-3">{event.description}</p>
                                        </CardContent>

                                        <CardFooter className="flex gap-2">
                                            <Button variant="outline" className="flex-1">
                                                Learn More
                                            </Button>
                                            {event.status === 'upcoming' && event.registrationLink && (
                                                <Button className="flex-1 bg-rose-500 hover:bg-rose-600">
                                                    Register
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Stay Updated on Upcoming Events
                    </h2>
                    <p className="text-xl text-rose-50">
                        Follow us on social media to receive notifications about new events, workshops, and opportunities
                    </p>
                    <div className="flex justify-center pt-4">
                        <SocialLinks variant="buttons" />
                    </div>
                    <div className="flex justify-center pt-6">
                        <SocialLinks variant="icons" className="text-white" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EventsPageClient
