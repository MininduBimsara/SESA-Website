'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

interface BlogDetail {
    id: number
    title: string
    excerpt: string
    content: string
    author: string
    date: string
    readTime: string
    category: string
    tags: string[]
    image: string
}

// This would typically come from a database or API
const blogData: Record<string, BlogDetail> = {
    '1': {
        id: 1,
        title: "Getting Started with React and Next.js: A Beginner's Guide",
        excerpt: "Learn the fundamentals of React and Next.js, two of the most popular frameworks for building modern web applications.",
        content: `
            <p>React and Next.js have revolutionized the way we build modern web applications. In this comprehensive guide, we'll explore the fundamentals of both technologies and help you understand why they've become essential tools for web developers worldwide.</p>

            <h2>What is React?</h2>
            <p>React is a JavaScript library for building user interfaces, developed and maintained by Facebook (now Meta). It allows developers to create reusable UI components and manage the state of their applications efficiently.</p>

            <p>Key features of React include:</p>
            <ul>
                <li><strong>Component-Based Architecture:</strong> Build encapsulated components that manage their own state</li>
                <li><strong>Virtual DOM:</strong> Efficient rendering and updates for better performance</li>
                <li><strong>JSX Syntax:</strong> Write HTML-like code within JavaScript</li>
                <li><strong>Unidirectional Data Flow:</strong> Predictable state management</li>
                <li><strong>Rich Ecosystem:</strong> Extensive libraries and tools available</li>
            </ul>

            <h2>Why Next.js?</h2>
            <p>Next.js is a React framework that provides additional features and optimizations out of the box. Built by Vercel, it has become the go-to choice for building production-ready React applications.</p>

            <p>Advantages of Next.js:</p>
            <ul>
                <li><strong>Server-Side Rendering (SSR):</strong> Improved SEO and initial page load performance</li>
                <li><strong>Static Site Generation (SSG):</strong> Pre-render pages at build time</li>
                <li><strong>File-Based Routing:</strong> Automatic routing based on file structure</li>
                <li><strong>API Routes:</strong> Build backend API endpoints within your Next.js app</li>
                <li><strong>Image Optimization:</strong> Automatic image optimization and lazy loading</li>
                <li><strong>TypeScript Support:</strong> Built-in TypeScript configuration</li>
            </ul>

            <h2>Setting Up Your First Next.js Project</h2>
            <p>Getting started with Next.js is straightforward. Here's how to create your first project:</p>

            <h3>Step 1: Install Node.js</h3>
            <p>Make sure you have Node.js installed on your machine. You can download it from the official website. We recommend using the LTS (Long Term Support) version.</p>

            <h3>Step 2: Create a New Next.js App</h3>
            <p>Open your terminal and run the following command:</p>
            <pre><code>npx create-next-app@latest my-first-app</code></pre>

            <p>This will create a new Next.js project with all the necessary dependencies and configuration files.</p>

            <h3>Step 3: Navigate to Your Project</h3>
            <pre><code>cd my-first-app</code></pre>

            <h3>Step 4: Start the Development Server</h3>
            <pre><code>npm run dev</code></pre>

            <p>Your application will be available at <code>http://localhost:3000</code></p>

            <h2>Understanding the Project Structure</h2>
            <p>A typical Next.js project includes the following structure:</p>
            <ul>
                <li><strong>app/:</strong> Contains your application pages and layouts (App Router)</li>
                <li><strong>public/:</strong> Static assets like images and fonts</li>
                <li><strong>components/:</strong> Reusable React components</li>
                <li><strong>package.json:</strong> Project dependencies and scripts</li>
                <li><strong>next.config.js:</strong> Next.js configuration file</li>
            </ul>

            <h2>Creating Your First Component</h2>
            <p>Let's create a simple React component:</p>

            <pre><code>export default function Welcome() {
  return (
    &lt;div className="welcome"&gt;
      &lt;h1&gt;Welcome to Next.js!&lt;/h1&gt;
      &lt;p&gt;Start building amazing applications&lt;/p&gt;
    &lt;/div&gt;
  )
}</code></pre>

            <h2>Working with State and Props</h2>
            <p>React components can have state (internal data) and receive props (external data). Here's an example of a component using both:</p>

            <pre><code>import { useState } from 'react'

export default function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount)
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  )
}</code></pre>

            <h2>Next Steps</h2>
            <p>Now that you understand the basics, here are some topics to explore next:</p>
            <ul>
                <li>Learn about React Hooks (useState, useEffect, useContext)</li>
                <li>Explore Next.js routing and navigation</li>
                <li>Understand data fetching methods in Next.js</li>
                <li>Practice building real-world projects</li>
                <li>Join the SESA community workshops and hackathons</li>
            </ul>

            <h2>Resources</h2>
            <p>Here are some valuable resources to continue your learning journey:</p>
            <ul>
                <li>Official React Documentation: <a href="https://react.dev" target="_blank">react.dev</a></li>
                <li>Official Next.js Documentation: <a href="https://nextjs.org/docs" target="_blank">nextjs.org/docs</a></li>
                <li>SESA Workshops and Tutorials</li>
                <li>Online courses on platforms like Udemy and Coursera</li>
            </ul>

            <h2>Conclusion</h2>
            <p>React and Next.js are powerful tools that can help you build modern, performant web applications. Start with the basics, practice regularly, and don't hesitate to experiment with new features. Remember, the best way to learn is by building real projects!</p>

            <p>Join our SESA community for more tutorials, workshops, and hands-on learning opportunities. Happy coding!</p>
        `,
        author: "Hasinthaka Piyumal",
        date: "January 15, 2025",
        readTime: "8 min read",
        category: "tutorials",
        tags: ["React", "Next.js", "Web Development", "JavaScript", "Tutorial"],
        image: "/modern-tech-workspace-with-coding-screens-and-coll.jpg"
    },
    '2': {
        id: 2,
        title: "RealHack 4.0: Our Journey to Innovation",
        excerpt: "A recap of our biggest hackathon event, featuring stories from participants, judges, and organizers.",
        content: `
            <p>RealHack 4.0, SESA's flagship hackathon event, concluded successfully last month with unprecedented participation and groundbreaking innovations. This year's event brought together over 150 talented students from universities across Sri Lanka, making it our largest and most successful hackathon to date.</p>

            <h2>Event Overview</h2>
            <p>RealHack 4.0 was a 48-hour intensive hackathon that challenged participants to develop innovative solutions to real-world problems. The event was held at the University of Kelaniya and featured mentorship from industry experts, workshops, and networking opportunities.</p>

            <h2>The Theme: Technology for Social Impact</h2>
            <p>This year's theme focused on creating technology solutions that address social challenges in Sri Lanka. Participants were encouraged to think beyond commercial applications and consider how technology can improve lives and communities.</p>

            <h3>Problem Statements</h3>
            <p>Teams could choose from five problem statements:</p>
            <ul>
                <li><strong>Healthcare Access:</strong> Improving healthcare delivery in rural areas</li>
                <li><strong>Education Technology:</strong> Enhancing online learning experiences</li>
                <li><strong>Environmental Sustainability:</strong> Solutions for waste management and conservation</li>
                <li><strong>Agricultural Innovation:</strong> Technology to support farmers and agriculture</li>
                <li><strong>Financial Inclusion:</strong> Digital solutions for unbanked populations</li>
            </ul>

            <h2>The Winning Projects</h2>

            <h3>First Place: HealthBridge</h3>
            <p>The championship went to Team Phoenix with their project "HealthBridge" - an AI-powered telemedicine platform that connects rural patients with healthcare professionals. The solution includes:</p>
            <ul>
                <li>Mobile app for patients and doctors</li>
                <li>AI-based symptom checker</li>
                <li>Appointment scheduling and video consultations</li>
                <li>Integration with government health records</li>
                <li>Support for Sinhala and Tamil languages</li>
            </ul>

            <h3>Second Place: EduConnect</h3>
            <p>Team Innovators developed an interactive learning platform that adapts to each student's learning style and pace. Key features included gamification, progress tracking, and peer collaboration tools.</p>

            <h3>Third Place: GreenCycle</h3>
            <p>This waste management solution uses computer vision to identify and sort recyclable materials, making recycling more efficient and accessible for communities.</p>

            <h2>Behind the Scenes</h2>
            <p>Organizing RealHack 4.0 required months of planning and coordination. Our organizing committee worked tirelessly to ensure every aspect of the event ran smoothly.</p>

            <h3>The Organizing Team</h3>
            <p>Special thanks to our dedicated team members:</p>
            <ul>
                <li>Event Coordinators: Managing logistics and schedules</li>
                <li>Technical Team: Setting up infrastructure and troubleshooting</li>
                <li>Media Team: Capturing moments and managing social media</li>
                <li>Hospitality Team: Ensuring participant comfort and needs</li>
                <li>Mentor Coordinators: Connecting teams with expert guidance</li>
            </ul>

            <h2>Industry Partnerships</h2>
            <p>RealHack 4.0 wouldn't have been possible without our incredible sponsors and partners:</p>
            <ul>
                <li>TechCorp Solutions - Platinum Sponsor</li>
                <li>DataMinds Analytics - Gold Sponsor</li>
                <li>CloudWave Technologies - Silver Sponsor</li>
                <li>University of Kelaniya - Venue Partner</li>
                <li>Various tech companies providing mentors and judges</li>
            </ul>

            <h2>Participant Experiences</h2>
            <p><em>"RealHack 4.0 was an incredible learning experience. Working under time pressure with my team taught me so much about collaboration and problem-solving."</em> - Sarah Fernando, Participant</p>

            <p><em>"The mentorship and workshops provided during the event were invaluable. I gained insights I couldn't have learned in a classroom."</em> - Dinesh Kumar, First Runner-up</p>

            <h2>Workshops and Sessions</h2>
            <p>Throughout the 48 hours, we conducted several workshops:</p>
            <ul>
                <li>Introduction to Design Thinking</li>
                <li>Rapid Prototyping Techniques</li>
                <li>Pitching Your Ideas Effectively</li>
                <li>Cloud Deployment and Scaling</li>
                <li>UI/UX Best Practices</li>
            </ul>

            <h2>Impact and Statistics</h2>
            <ul>
                <li>150+ participants from 15+ universities</li>
                <li>35 teams competing</li>
                <li>48 hours of non-stop innovation</li>
                <li>20+ industry mentors</li>
                <li>15+ workshop sessions</li>
                <li>LKR 500,000 in prizes distributed</li>
                <li>100% participant satisfaction rate</li>
            </ul>

            <h2>Looking Ahead: RealHack 5.0</h2>
            <p>The success of RealHack 4.0 has set high expectations for next year's event. We're already planning RealHack 5.0 with exciting new features:</p>
            <ul>
                <li>International participation and collaboration</li>
                <li>Hybrid format with virtual tracks</li>
                <li>Expanded problem statements</li>
                <li>Post-event incubation program for top teams</li>
                <li>Partnership with startup accelerators</li>
            </ul>

            <h2>How You Can Get Involved</h2>
            <p>Interested in participating in future hackathons? Here's how to stay connected:</p>
            <ul>
                <li>Follow SESA on social media for announcements</li>
                <li>Join our workshops to build your skills</li>
                <li>Form or join a team early</li>
                <li>Practice by participating in online hackathons</li>
                <li>Attend our pre-hackathon bootcamps</li>
            </ul>

            <h2>Final Thoughts</h2>
            <p>RealHack 4.0 demonstrated the incredible talent and creativity of Sri Lankan students. It proved that when given the right platform and support, our students can develop solutions that can truly make a difference in society.</p>

            <p>Thank you to all participants, sponsors, mentors, volunteers, and supporters who made RealHack 4.0 a resounding success. We can't wait to see you at RealHack 5.0!</p>
        `,
        author: "Imansha Dilshan",
        date: "January 10, 2025",
        readTime: "6 min read",
        category: "events",
        tags: ["Hackathon", "RealHack", "Innovation", "Event", "SESA"],
        image: "/tech-workshop-and-coding-event-with-students.jpg"
    },
    '3': {
        id: 3,
        title: "Preparing for Technical Interviews: Tips from Industry Experts",
        excerpt: "Essential strategies and common questions to help you ace your next software engineering interview.",
        content: `
            <p>Landing your dream job in software engineering requires more than just technical skills. In this comprehensive guide, we've compiled advice from industry experts and successful SESA alumni to help you prepare for technical interviews.</p>

            <h2>Understanding the Interview Process</h2>
            <p>Most tech companies follow a similar interview structure:</p>
            <ol>
                <li><strong>Initial Screening:</strong> Resume review and phone screening</li>
                <li><strong>Online Assessment:</strong> Coding challenges and problem-solving tests</li>
                <li><strong>Technical Interviews:</strong> Algorithm and system design questions</li>
                <li><strong>Behavioral Interviews:</strong> Culture fit and soft skills assessment</li>
                <li><strong>Final Round:</strong> Meeting with senior engineers or managers</li>
            </ol>

            <h2>Preparing Your Foundation</h2>

            <h3>Data Structures and Algorithms</h3>
            <p>Master these fundamental concepts:</p>
            <ul>
                <li><strong>Arrays and Strings:</strong> Two-pointer techniques, sliding window</li>
                <li><strong>Linked Lists:</strong> Fast and slow pointers, reversal</li>
                <li><strong>Trees and Graphs:</strong> DFS, BFS, traversals</li>
                <li><strong>Hash Maps:</strong> Efficient lookups and counting</li>
                <li><strong>Stacks and Queues:</strong> LIFO and FIFO operations</li>
                <li><strong>Heaps:</strong> Priority queues and k-way merge</li>
                <li><strong>Dynamic Programming:</strong> Memoization and tabulation</li>
            </ul>

            <h3>Time and Space Complexity</h3>
            <p>Always analyze your solutions using Big O notation. Understand the trade-offs between time and space complexity.</p>

            <h2>Common Interview Question Patterns</h2>

            <h3>1. Two Pointer Pattern</h3>
            <p>Used for problems involving sorted arrays or finding pairs:</p>
            <pre><code>// Example: Two Sum in sorted array
function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left &lt; right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum &lt; target) left++;
        else right--;
    }
    return [-1, -1];
}</code></pre>

            <h3>2. Sliding Window Pattern</h3>
            <p>Effective for substring or subarray problems:</p>
            <pre><code>// Example: Maximum sum subarray of size k
function maxSumSubarray(arr, k) {
    let maxSum = 0, windowSum = 0;
    
    for (let i = 0; i &lt; arr.length; i++) {
        windowSum += arr[i];
        if (i &gt;= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];
        }
    }
    return maxSum;
}</code></pre>

            <h3>3. BFS for Tree/Graph Problems</h3>
            <p>Level-order traversal and shortest path problems:</p>
            <pre><code>// Example: Level order traversal
function levelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    
    while (queue.length) {
        const level = [];
        const size = queue.length;
        
        for (let i = 0; i &lt; size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}</code></pre>

            <h2>System Design Interviews</h2>
            <p>For senior positions, you'll need to demonstrate system design knowledge:</p>

            <h3>Key Concepts to Study</h3>
            <ul>
                <li>Scalability and Load Balancing</li>
                <li>Database Design (SQL vs NoSQL)</li>
                <li>Caching Strategies (Redis, Memcached)</li>
                <li>API Design (REST, GraphQL)</li>
                <li>Microservices Architecture</li>
                <li>Message Queues (RabbitMQ, Kafka)</li>
                <li>CDN and Content Delivery</li>
                <li>Security Best Practices</li>
            </ul>

            <h3>Approach to System Design Questions</h3>
            <ol>
                <li><strong>Clarify Requirements:</strong> Ask about scale, features, and constraints</li>
                <li><strong>Estimate Scale:</strong> Calculate users, requests, and storage needs</li>
                <li><strong>High-Level Design:</strong> Draw major components and their interactions</li>
                <li><strong>Deep Dive:</strong> Detail critical components based on interviewer interest</li>
                <li><strong>Discuss Trade-offs:</strong> Explain pros and cons of your decisions</li>
            </ol>

            <h2>Behavioral Interview Tips</h2>
            <p>Use the STAR method (Situation, Task, Action, Result) for behavioral questions:</p>

            <h3>Common Behavioral Questions</h3>
            <ul>
                <li>Tell me about a challenging project you worked on</li>
                <li>Describe a time you disagreed with a team member</li>
                <li>How do you handle tight deadlines?</li>
                <li>Tell me about a time you failed and what you learned</li>
                <li>Why do you want to work for our company?</li>
            </ul>

            <h2>Practice Resources</h2>
            <p>Recommended platforms and resources:</p>
            <ul>
                <li><strong>LeetCode:</strong> Extensive problem set with company-specific questions</li>
                <li><strong>HackerRank:</strong> Practice problems and challenges</li>
                <li><strong>CodeSignal:</strong> Realistic interview assessments</li>
                <li><strong>System Design Primer:</strong> GitHub repository with system design topics</li>
                <li><strong>Cracking the Coding Interview:</strong> Classic book by Gayle McDowell</li>
                <li><strong>AlgoExpert:</strong> Video explanations for common problems</li>
            </ul>

            <h2>Day Before the Interview</h2>
            <ul>
                <li>Review your resume and projects thoroughly</li>
                <li>Practice explaining your projects clearly</li>
                <li>Prepare questions to ask the interviewer</li>
                <li>Test your equipment for virtual interviews</li>
                <li>Get a good night's sleep</li>
                <li>Don't try to learn new concepts</li>
            </ul>

            <h2>During the Interview</h2>
            <p>Key strategies for success:</p>
            <ul>
                <li><strong>Think Out Loud:</strong> Explain your thought process</li>
                <li><strong>Ask Clarifying Questions:</strong> Understand the problem fully</li>
                <li><strong>Start with Brute Force:</strong> Then optimize</li>
                <li><strong>Test Your Code:</strong> Walk through examples</li>
                <li><strong>Communicate Trade-offs:</strong> Discuss time/space complexity</li>
                <li><strong>Stay Calm:</strong> If stuck, take a moment to think</li>
                <li><strong>Be Honest:</strong> Admit if you don't know something</li>
            </ul>

            <h2>After the Interview</h2>
            <ul>
                <li>Send a thank-you email within 24 hours</li>
                <li>Reflect on what went well and what to improve</li>
                <li>Continue practicing regardless of outcome</li>
                <li>Follow up politely if you don't hear back</li>
            </ul>

            <h2>SESA Interview Prep Resources</h2>
            <p>Take advantage of SESA's offerings:</p>
            <ul>
                <li>Weekly coding practice sessions</li>
                <li>Mock interview workshops</li>
                <li>Industry mentor connections</li>
                <li>Resume review services</li>
                <li>Alumni networking events</li>
            </ul>

            <h2>Final Thoughts</h2>
            <p>Remember, interview preparation is a marathon, not a sprint. Start early, practice consistently, and don't get discouraged by rejections. Every interview is a learning opportunity that brings you closer to your goal.</p>

            <p>Good luck with your interviews! The SESA community is here to support you every step of the way.</p>
        `,
        author: "Yasiru Upananda",
        date: "January 5, 2025",
        readTime: "10 min read",
        category: "career",
        tags: ["Career", "Interviews", "Tips", "Job Search", "Coding"],
        image: "/professional-software-engineering-career-developme.jpg"
    }
}

const BlogDetailPage = () => {
    const params = useParams()
    const blogId = params?.id as string
    const blog = blogData[blogId]

    if (!blog) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
                    <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/blogs">
                        <Button className="bg-rose-500 hover:bg-rose-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blogs
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
                    <Link href="/blogs">
                        <Button variant="ghost" className="text-gray-600 hover:text-rose-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blogs
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] w-full">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-0 right-0">
                    <div className="max-w-4xl mx-auto px-4 md:px-8">
                        <span className="inline-block px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-semibold capitalize mb-4">
                            {blog.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    {blog.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-rose-500" />
                        <span className="font-medium">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-rose-500" />
                        <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-rose-500" />
                        <span>{blog.readTime}</span>
                    </div>
                </div>

                {/* Excerpt */}
                <div className="bg-rose-50 border-l-4 border-rose-500 p-6 mb-8 rounded-r-lg">
                    <p className="text-lg text-gray-700 font-medium italic">
                        {blog.excerpt}
                    </p>
                </div>

                {/* Main Content */}
                <div
                    className="prose prose-lg max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    style={{
                        color: '#374151',
                    }}
                />

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <Tag className="w-5 h-5 text-rose-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag: string, index: number) => (
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

                {/* Author Info */}
                <div className="bg-gradient-to-r from-rose-50 to-white border border-rose-200 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                            {blog.author.charAt(0)}
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">
                                Written by {blog.author}
                            </h4>
                            <p className="text-gray-600">
                                SESA Executive Board Member and passionate software engineer dedicated to sharing knowledge with the community.
                            </p>
                        </div>
                    </div>
                </div>

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
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`, '_blank')}
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

                {/* Back to Blogs Button */}
                <div className="text-center">
                    <Link href="/blogs">
                        <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to All Blogs
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
                .prose pre {
                    background: #1f2937;
                    color: #f3f4f6;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                }
                .prose code {
                    background: #1f2937;
                    color: #f3f4f6;
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-size: 0.875em;
                    font-family: 'Courier New', monospace;
                }
                .prose pre code {
                    background: transparent;
                    padding: 0;
                }
                .prose a {
                    color: #f43f5e;
                    text-decoration: underline;
                    font-weight: 500;
                }
                .prose a:hover {
                    color: #e11d48;
                }
                .prose em {
                    font-style: italic;
                    color: #4b5563;
                }
            `}</style>
        </div>
    )
}

export default BlogDetailPage
