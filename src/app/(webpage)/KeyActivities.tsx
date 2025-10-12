import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Trophy, Users, Briefcase } from 'lucide-react'

const activities = [
    {
        icon: Code,
        title: "Workshops & Tech Talks",
        description: "Hands-on learning from industry experts covering the latest technologies and best practices.",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        icon: Trophy,
        title: "Hackathons & Competitions",
        description: "Turn ideas into real-world solutions through exciting coding challenges and competitions.",
        color: "text-purple-600",
        bgColor: "bg-purple-50"
    },
    {
        icon: Briefcase,
        title: "Career Guidance",
        description: "Internship tips, CV reviews, and mentorship programs to kickstart your career.",
        color: "text-green-600",
        bgColor: "bg-green-50"
    },
    {
        icon: Users,
        title: "Community & Networking",
        description: "Collaborate and grow with like-minded peers in a supportive environment.",
        color: "text-orange-600",
        bgColor: "bg-orange-50"
    }
]

const KeyActivities = () => {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What We Do
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover the key activities and focus areas that make SESA a vibrant community
                    </p>
                </div>

                {/* Activity Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities.map((activity, index) => {
                        const Icon = activity.icon
                        return (
                            <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 hover:border-gray-300"
                            >
                                <CardHeader>
                                    <div className={`w-14 h-14 rounded-lg ${activity.bgColor} flex items-center justify-center mb-4`}>
                                        <Icon className={`w-7 h-7 ${activity.color}`} />
                                    </div>
                                    <CardTitle className="text-xl mb-2">{activity.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {activity.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default KeyActivities
