'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, MapPin, Search, ArrowRight, Newspaper, Award, Users, Briefcase, TrendingUp, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type NewsCategory = 'all' | 'achievements' | 'announcements' | 'partnerships' | 'student-spotlight' | 'media'

interface NewsItem {
    id: number
    title: string
    summary: string
    content: string
    author?: string
    date: string
    category: NewsCategory
    location?: string
    image: string
    featured: boolean
    externalLink?: string
    tags: string[]
}

const newsItems: NewsItem[] = [
    {
        id: 1,
        title: "SESA Students Win First Place at National Hackathon 2025",
        summary: "Our team of talented students secured the championship at the Sri Lanka National Hackathon, competing against 50+ universities.",
        content: "Full news content here...",
        date: "January 18, 2025",
        category: "achievements",
        location: "Colombo, Sri Lanka",
        image: "/tech-workshop-and-coding-event-with-students.jpg",
        featured: true,
        tags: ["Hackathon", "Achievement", "Competition"]
    },
    {
        id: 2,
        title: "Partnership Announcement: SESA Collaborates with Leading Tech Companies",
        summary: "We're excited to announce new partnerships with industry leaders to provide internship and mentorship opportunities for our students.",
        content: "Full news content here...",
        date: "January 15, 2025",
        category: "partnerships",
        image: "/modern-tech-workspace-with-coding-screens-and-coll.jpg",
        featured: true,
        externalLink: "https://example.com",
        tags: ["Partnership", "Industry", "Opportunities"]
    },
    {
        id: 3,
        title: "Applications Open for SESA Executive Board 2025/26",
        summary: "We're looking for passionate leaders to join the next executive board. Applications are now open for all positions.",
        content: "Full news content here...",
        date: "January 12, 2025",
        category: "announcements",
        image: "/students-collaborating-on-software-development-pro.jpg",
        featured: true,
        tags: ["Announcement", "Leadership", "Recruitment"]
    },
    {
        id: 4,
        title: "Student Spotlight: Hasinthaka Piyumal's Journey to Full-Stack Development",
        summary: "Meet Hasinthaka, our Web Master, who has contributed significantly to SESA's digital presence and helped numerous students learn web development.",
        content: "Full news content here...",
        author: "SESA Editorial Team",
        date: "January 8, 2025",
        category: "student-spotlight",
        image: "/professional-software-engineering-career-developme.jpg",
        featured: false,
        tags: ["Student", "Success Story", "Web Development"]
    },
    {
        id: 5,
        title: "SESA Featured in University Magazine for Community Impact",
        summary: "Our CSR initiatives and community engagement programs have been recognized by the university's official publication.",
        content: "Full news content here...",
        date: "January 5, 2025",
        category: "media",
        image: "/students-collaborating-on-software-development-pro.jpg",
        featured: false,
        externalLink: "https://example.com",
        tags: ["Media", "Recognition", "CSR"]
    },
    {
        id: 6,
        title: "RealHack 5.0 Registration Breaks Records with 200+ Teams",
        summary: "Our flagship hackathon event has received overwhelming response with record-breaking registrations from universities across the country.",
        content: "Full news content here...",
        date: "January 2, 2025",
        category: "announcements",
        location: "University of Kelaniya",
        image: "/tech-workshop-and-coding-event-with-students.jpg",
        featured: false,
        tags: ["RealHack", "Event", "Registration"]
    },
    {
        id: 7,
        title: "SESA Members Land Internships at Top Tech Giants",
        summary: "Six of our members have secured prestigious internships at leading technology companies including Google, Microsoft, and AWS.",
        content: "Full news content here...",
        date: "December 28, 2024",
        category: "achievements",
        image: "/professional-software-engineering-career-developme.jpg",
        featured: false,
        tags: ["Achievement", "Internship", "Success"]
    },
    {
        id: 8,
        title: "New AI Workshop Series Announced for Spring Semester",
        summary: "Get ready for an exciting series of AI and Machine Learning workshops conducted by industry experts and professors.",
        content: "Full news content here...",
        date: "December 20, 2024",
        category: "announcements",
        image: "/modern-tech-workspace-with-coding-screens-and-coll.jpg",
        featured: false,
        tags: ["Workshop", "AI", "Learning"]
    },
    {
        id: 9,
        title: "Student Spotlight: Sachini Weerakkody's Leadership Journey",
        summary: "Learn about our Secretary's inspiring path from first-year student to key leadership role in SESA.",
        content: "Full news content here...",
        author: "SESA Editorial Team",
        date: "December 15, 2024",
        category: "student-spotlight",
        image: "/students-collaborating-on-software-development-pro.jpg",
        featured: false,
        tags: ["Student", "Leadership", "Inspiration"]
    },
    {
        id: 10,
        title: "SESA Hosts Successful Career Fair with 15+ Tech Companies",
        summary: "Our annual career fair brought together students and leading tech companies for networking and recruitment opportunities.",
        content: "Full news content here...",
        date: "December 10, 2024",
        category: "achievements",
        location: "Faculty of Science",
        image: "/professional-software-engineering-career-developme.jpg",
        featured: false,
        tags: ["Career Fair", "Networking", "Recruitment"]
    }
]

const categories = [
    { value: 'all', label: 'All News', icon: Newspaper },
    { value: 'achievements', label: 'Achievements', icon: Award },
    { value: 'announcements', label: 'Announcements', icon: TrendingUp },
    { value: 'partnerships', label: 'Partnerships', icon: Briefcase },
    { value: 'student-spotlight', label: 'Student Spotlight', icon: Users },
    { value: 'media', label: 'Media Coverage', icon: ExternalLink }
]

const NewsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredNews = newsItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    const featuredNews = newsItems.filter(item => item.featured)
    const latestNews = newsItems[0] // Most recent news

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 py-20 px-4 md:px-8 lg:px-16 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            SESA News
                        </h1>
                        <p className="text-xl md:text-2xl text-rose-100 max-w-3xl mx-auto">
                            Latest updates, achievements, and announcements from our community
                        </p>
                    </div>
                </div>
            </section>

            {/* Breaking News / Latest News Banner */}
            {latestNews && (
                <section className="py-6 px-4 md:px-8 lg:px-16 bg-rose-50 border-b-4 border-rose-500">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4">
                            <span className="bg-rose-500 text-white px-4 py-2 rounded-full font-bold text-sm uppercase flex-shrink-0">
                                Breaking News
                            </span>
                            <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 hover:text-rose-600 transition-colors cursor-pointer line-clamp-2">
                                    {latestNews.title}
                                </h3>
                            </div>
                            <Link href={`/news/${latestNews.id}`}>
                                <Button className="bg-rose-500 hover:bg-rose-600 flex-shrink-0">
                                    Read More
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured News */}
            {featuredNews.length > 0 && (
                <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="w-6 h-6 text-rose-500" />
                            <h2 className="text-3xl font-bold text-gray-900">Featured News</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredNews.map(item => (
                                <Card key={item.id} className="hover:shadow-2xl transition-all duration-300 border-2 border-rose-200 flex flex-col">
                                    <div className="relative h-48 w-full">
                                        <Image src={item.image} alt={item.title} fill className="object-cover rounded-t-xl" />
                                        <div className="absolute top-3 right-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500 text-white">
                                                Featured
                                            </span>
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 capitalize">
                                                {item.category.replace('-', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-xl line-clamp-2 hover:text-rose-600 transition-colors">
                                            {item.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm line-clamp-3 mt-2">
                                            {item.summary}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-rose-500" />
                                                <span>{item.date}</span>
                                            </div>
                                            {item.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-rose-500" />
                                                    <span>{item.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/news/${item.id}`} className="w-full">
                                            <Button className="w-full bg-rose-500 hover:bg-rose-600">
                                                Read Full Story
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
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
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search news by title, content, or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value as NewsCategory)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === cat.value
                                        ? 'bg-rose-500 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {cat.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* All News Items */}
            <section className="py-12 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {filteredNews.length === 0 ? (
                        <div className="text-center py-20">
                            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No news found</h3>
                            <p className="text-gray-600">Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {selectedCategory === 'all' ? 'All News' : `${categories.find(c => c.value === selectedCategory)?.label}`}
                                </h2>
                                <p className="text-gray-600">
                                    Showing {filteredNews.length} {filteredNews.length === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredNews.map((item) => (
                                    <Card key={item.id} className="hover:shadow-xl transition-all duration-300 flex flex-col group">
                                        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 capitalize">
                                                    {item.category.replace('-', ' ')}
                                                </span>
                                            </div>
                                            {item.externalLink && (
                                                <div className="absolute top-3 right-3">
                                                    <span className="px-2 py-1 rounded-full bg-blue-500 text-white">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <CardHeader className="flex-grow">
                                            <CardTitle className="text-xl line-clamp-2 group-hover:text-rose-600 transition-colors cursor-pointer">
                                                {item.title}
                                            </CardTitle>
                                            <CardDescription className="text-sm line-clamp-3 mt-2">
                                                {item.summary}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-rose-500" />
                                                    <span>{item.date}</span>
                                                </div>
                                                {item.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-rose-500" />
                                                        <span className="line-clamp-1">{item.location}</span>
                                                    </div>
                                                )}
                                                {item.author && (
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-rose-500" />
                                                        <span className="line-clamp-1">{item.author}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {item.tags.slice(0, 3).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-rose-50 text-rose-600 text-xs rounded-full"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex gap-2">
                                            <Link href={`/news/${item.id}`} className="flex-1">
                                                <Button
                                                    variant="outline"
                                                    className="w-full group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-colors"
                                                >
                                                    Read More
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </Link>
                                            {item.externalLink && (
                                                <Button
                                                    variant="outline"
                                                    className="px-3"
                                                    onClick={() => window.open(item.externalLink, '_blank')}
                                                >
                                                    <ExternalLink className="w-4 h-4" />
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

            {/* Subscribe CTA */}
            <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Stay Informed with SESA Updates
                    </h2>
                    <p className="text-xl text-rose-50">
                        Follow us on social media to get the latest news, announcements, and updates from our community
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg">
                            <Newspaper className="w-5 h-5 mr-2" />
                            View All News
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                            Subscribe to Updates
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NewsPage
