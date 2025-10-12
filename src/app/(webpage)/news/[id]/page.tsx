'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, MapPin, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

interface NewsDetail {
    id: number
    title: string
    summary: string
    content: string
    date: string
    category: string
    location?: string
    author?: string
    image: string
    tags?: string[]
}

// This would typically come from a database or API
const newsData: Record<string, NewsDetail> = {
    '1': {
        id: 1,
        title: "SESA Students Win First Place at National Hackathon 2025",
        summary: "Our team of talented students secured the championship at the Sri Lanka National Hackathon, competing against 50+ universities.",
        content: `
            <p>In an outstanding display of innovation and technical prowess, a team of SESA students has won first place at the prestigious Sri Lanka National Hackathon 2025. The competition, held in Colombo, brought together over 50 universities from across the country, with more than 200 teams competing for the top prize.</p>

            <h2>The Winning Solution</h2>
            <p>Our team developed an innovative AI-powered platform that addresses real-world challenges in the healthcare sector. The solution, named "HealthBridge," uses machine learning algorithms to predict patient outcomes and optimize hospital resource allocation.</p>

            <p>The project impressed the judges with its practical application, scalability, and potential impact on Sri Lanka's healthcare system. The team worked tirelessly over the 48-hour hackathon period, showcasing not only their technical skills but also their ability to work under pressure and collaborate effectively.</p>

            <h2>Team Members</h2>
            <p>The winning team consisted of:</p>
            <ul>
                <li>Imansha Dilshan (Team Lead) - Backend Development & AI</li>
                <li>Yasiru Upananda - Frontend Development & UX Design</li>
                <li>Minindu Abeywardene - Data Science & Analytics</li>
                <li>Hasinthaka Piyumal - Full-Stack Development</li>
            </ul>

            <h2>Recognition and Prizes</h2>
            <p>Along with the championship trophy, the team received:</p>
            <ul>
                <li>Prize money of LKR 500,000</li>
                <li>Mentorship opportunities with industry leaders</li>
                <li>Fast-track interviews with sponsoring tech companies</li>
                <li>Recognition from the Ministry of Technology</li>
            </ul>

            <h2>Impact on SESA</h2>
            <p>This victory marks a significant milestone for SESA and demonstrates the high caliber of our students. It reinforces our mission to provide hands-on learning experiences and foster innovation among software engineering undergraduates.</p>

            <p>The success of this team is a testament to the collaborative environment and technical excellence that SESA promotes through its workshops, hackathons, and mentorship programs.</p>

            <h2>Looking Ahead</h2>
            <p>The team plans to further develop "HealthBridge" and is in talks with several hospitals and healthcare organizations for potential pilot implementations. They are also considering launching a startup to bring the solution to market.</p>

            <p>This achievement inspires other SESA members to pursue their innovative ideas and participate in national and international competitions. We look forward to seeing more such accomplishments from our talented community.</p>
        `,
        date: "January 18, 2025",
        category: "achievements",
        location: "Colombo, Sri Lanka",
        author: "SESA Editorial Team",
        image: "/tech-workshop-and-coding-event-with-students.jpg",
        tags: ["Hackathon", "Achievement", "Competition", "AI", "Healthcare"]
    },
    '2': {
        id: 2,
        title: "Partnership Announcement: SESA Collaborates with Leading Tech Companies",
        summary: "We're excited to announce new partnerships with industry leaders to provide internship and mentorship opportunities for our students.",
        content: `
            <p>SESA is thrilled to announce strategic partnerships with several leading technology companies, marking a significant step forward in bridging the gap between academic learning and industry practice. These collaborations will provide our students with unprecedented access to internships, mentorship programs, and real-world project experiences.</p>

            <h2>Partner Companies</h2>
            <p>We are proud to partner with:</p>
            <ul>
                <li><strong>TechCorp Solutions</strong> - A leading software development company specializing in enterprise solutions</li>
                <li><strong>DataMinds Analytics</strong> - Pioneers in big data and machine learning applications</li>
                <li><strong>CloudWave Technologies</strong> - Cloud infrastructure and DevOps specialists</li>
                <li><strong>InnovateLK</strong> - A startup accelerator and venture capital firm</li>
                <li><strong>Global Tech Partners</strong> - International IT consultancy with offices worldwide</li>
            </ul>

            <h2>Benefits for SESA Members</h2>
            <p>These partnerships will offer our members:</p>
            <ul>
                <li><strong>Internship Opportunities:</strong> Guaranteed interview slots for paid internships during semester breaks</li>
                <li><strong>Mentorship Programs:</strong> One-on-one mentorship from industry professionals</li>
                <li><strong>Workshops and Training:</strong> Exclusive technical workshops on cutting-edge technologies</li>
                <li><strong>Project Collaborations:</strong> Opportunities to work on real industry projects</li>
                <li><strong>Career Guidance:</strong> Resume reviews, interview preparation, and career counseling</li>
                <li><strong>Fast-Track Recruitment:</strong> Priority consideration for full-time positions after graduation</li>
            </ul>

            <h2>Industry-Academia Collaboration</h2>
            <p>Dr. Nalin Warnajith, Senior Treasurer of SESA, commented: "These partnerships represent a significant milestone in our mission to provide world-class opportunities for our students. By connecting academia with industry, we're ensuring that our graduates are not just job-ready, but industry-ready."</p>

            <h2>Upcoming Initiatives</h2>
            <p>As part of these partnerships, we will be launching:</p>
            <ul>
                <li>A monthly tech talk series featuring industry experts</li>
                <li>Quarterly hackathons with real industry challenges</li>
                <li>A job board exclusively for SESA members</li>
                <li>Annual career fair with partner companies</li>
            </ul>

            <h2>Application Process</h2>
            <p>SESA members interested in these opportunities can apply through our newly launched platform. Applications for the first batch of internships will open on February 1st, 2025.</p>

            <p>We encourage all members to take advantage of these opportunities and make the most of this exciting collaboration.</p>
        `,
        date: "January 15, 2025",
        category: "partnerships",
        author: "Imansha Dilshan",
        image: "/modern-tech-workspace-with-coding-screens-and-coll.jpg",
        tags: ["Partnership", "Industry", "Opportunities", "Internship", "Career"]
    },
    '3': {
        id: 3,
        title: "Applications Open for SESA Executive Board 2025/26",
        summary: "We're looking for passionate leaders to join the next executive board. Applications are now open for all positions.",
        content: `
            <p>SESA is excited to announce that applications are now open for the Executive Board 2025/26. We're looking for passionate, dedicated, and innovative individuals who want to make a significant impact on our community and lead SESA into its next chapter.</p>

            <h2>Available Positions</h2>
            <p>We are accepting applications for the following positions:</p>
            <ul>
                <li><strong>President</strong> - Lead the association and oversee all operations</li>
                <li><strong>Vice President</strong> - Support the President and manage internal affairs</li>
                <li><strong>Secretary</strong> - Handle official communications and documentation</li>
                <li><strong>Vice Secretary</strong> - Assist the Secretary and manage records</li>
                <li><strong>Junior Treasurer</strong> - Manage finances and budget planning</li>
                <li><strong>Head of Strategic Planning</strong> - Develop long-term strategies and partnerships</li>
                <li><strong>Web Master</strong> - Maintain and develop digital platforms</li>
                <li><strong>Media Team Members</strong> - Handle social media and content creation</li>
                <li><strong>Event Coordinators</strong> - Organize workshops, hackathons, and events</li>
            </ul>

            <h2>What We're Looking For</h2>
            <p>Ideal candidates should possess:</p>
            <ul>
                <li>Strong leadership and communication skills</li>
                <li>Passion for software engineering and technology</li>
                <li>Commitment to serving the SESA community</li>
                <li>Ability to work collaboratively in a team</li>
                <li>Creative thinking and problem-solving abilities</li>
                <li>Time management and organizational skills</li>
            </ul>

            <h2>Benefits of Joining</h2>
            <p>As an executive board member, you will:</p>
            <ul>
                <li>Develop valuable leadership and management skills</li>
                <li>Expand your professional network</li>
                <li>Make a lasting impact on the SESA community</li>
                <li>Gain recognition from university and industry</li>
                <li>Enhance your resume and career prospects</li>
                <li>Work with industry partners and mentors</li>
            </ul>

            <h2>Application Process</h2>
            <p>The application process consists of:</p>
            <ol>
                <li><strong>Online Application:</strong> Submit your application form with a statement of purpose</li>
                <li><strong>Initial Screening:</strong> Applications will be reviewed by the current board</li>
                <li><strong>Interview:</strong> Shortlisted candidates will be invited for interviews</li>
                <li><strong>Selection:</strong> Final candidates will be announced</li>
                <li><strong>Handover:</strong> Orientation and transition period with current board</li>
            </ol>

            <h2>Important Dates</h2>
            <ul>
                <li>Application Opening: January 12, 2025</li>
                <li>Application Deadline: February 5, 2025</li>
                <li>Interviews: February 10-15, 2025</li>
                <li>Results Announcement: February 20, 2025</li>
                <li>Official Handover: March 1, 2025</li>
            </ul>

            <h2>How to Apply</h2>
            <p>Interested candidates should:</p>
            <ol>
                <li>Download the application form from our website</li>
                <li>Prepare a statement of purpose (max 500 words)</li>
                <li>Submit via email to sesa@kln.ac.lk</li>
                <li>Include "Executive Board Application - [Position]" in subject line</li>
            </ol>

            <p>For questions about the application process, please contact our current Secretary at secretary@sesa-uok.org.</p>

            <p>We look forward to receiving your applications and welcoming new leaders to the SESA family!</p>
        `,
        date: "January 12, 2025",
        category: "announcements",
        author: "Sachini Weerakkody",
        image: "/students-collaborating-on-software-development-pro.jpg",
        tags: ["Announcement", "Leadership", "Recruitment", "Applications"]
    }
}

const NewsDetailPage = () => {
    const params = useParams()
    const newsId = params?.id as string
    const news = newsData[newsId]

    if (!news) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">News Not Found</h1>
                    <p className="text-gray-600 mb-8">The news article you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/news">
                        <Button className="bg-rose-500 hover:bg-rose-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to News
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
                    <Link href="/news">
                        <Button variant="ghost" className="text-gray-600 hover:text-rose-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to News
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] w-full">
                <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-0 right-0">
                    <div className="max-w-4xl mx-auto px-4 md:px-8">
                        <span className="inline-block px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-semibold capitalize mb-4">
                            {news.category.replace('-', ' ')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    {news.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-rose-500" />
                        <span>{news.date}</span>
                    </div>
                    {news.author && (
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-rose-500" />
                            <span>{news.author}</span>
                        </div>
                    )}
                    {news.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-rose-500" />
                            <span>{news.location}</span>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="bg-rose-50 border-l-4 border-rose-500 p-6 mb-8 rounded-r-lg">
                    <p className="text-lg text-gray-700 font-medium">
                        {news.summary}
                    </p>
                </div>

                {/* Main Content */}
                <div
                    className="prose prose-lg max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                    style={{
                        color: '#374151',
                    }}
                />

                {/* Tags */}
                {news.tags && news.tags.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <Tag className="w-5 h-5 text-rose-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {news.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium hover:bg-rose-200 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Share Section */}
                <div className="border-t border-b border-gray-200 py-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Share2 className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-900 font-semibold">Share this article:</span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
                                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                                aria-label="Share on Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${news.title}`, '_blank')}
                                className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
                                aria-label="Share on Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
                                className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-colors"
                                aria-label="Share on LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back to News Button */}
                <div className="text-center">
                    <Link href="/news">
                        <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to All News
                        </Button>
                    </Link>
                </div>
            </article>

            {/* Add CSS for prose content */}
            <style jsx global>{`
                .prose h2 {
                    font-size: 1.875rem;
                    font-weight: 700;
                    color: #111827;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                }
                .prose h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin-top: 2rem;
                    margin-bottom: 0.75rem;
                }
                .prose p {
                    margin-bottom: 1.25rem;
                    line-height: 1.75;
                }
                .prose ul, .prose ol {
                    margin-bottom: 1.25rem;
                    padding-left: 1.5rem;
                }
                .prose li {
                    margin-bottom: 0.5rem;
                    line-height: 1.75;
                }
                .prose ul li {
                    list-style-type: disc;
                }
                .prose ol li {
                    list-style-type: decimal;
                }
                .prose strong {
                    font-weight: 600;
                    color: #111827;
                }
            `}</style>
        </div>
    )
}

export default NewsDetailPage
