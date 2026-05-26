"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  Clock,
  Code,
  Lightbulb,
  Loader2,
  Search,
  TrendingUp,
  Users,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Blog } from "@/types/blog";

type BlogCategory =
  | "all"
  | "technical"
  | "career"
  | "events"
  | "tutorials"
  | "community";

const categories = [
  { value: "all", label: "All Posts", icon: BookOpen },
  { value: "technical", label: "Technical", icon: Code },
  { value: "tutorials", label: "Tutorials", icon: Lightbulb },
  { value: "career", label: "Career", icon: Briefcase },
  { value: "events", label: "Events", icon: TrendingUp },
  { value: "community", label: "Community", icon: Users },
];

const createPlaceholderImage = (label: string, accent = "#32324E") => {
  const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
            <rect width="1200" height="800" fill="#11112A" />
            <circle cx="960" cy="120" r="220" fill="${accent}" fill-opacity="0.2" />
            <circle cx="180" cy="620" r="180" fill="#ffffff" fill-opacity="0.07" />
            <rect x="84" y="590" width="340" height="14" rx="7" fill="#ffffff" fill-opacity="0.25" />
            <rect x="84" y="630" width="260" height="10" rx="5" fill="#ffffff" fill-opacity="0.14" />
            <text x="84" y="220" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700">${label}</text>
            <text x="84" y="280" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500">SESA Blog</text>
        </svg>
    `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
};

const fallbackBlogs: Blog[] = [
  {
    id: "fallback-1",
    title:
      "The Future of Work: 5 Strategies for Building Resilient, High-Performing Teams",
    content:
      "<p>Explore practical strategies to help your organization adapt, collaborate, and thrive.</p>",
    excerpt:
      "Explore practical strategies to help your organization adapt, collaborate, and thrive in an ever-changing world of work.",
    slug: "future-of-work-strategies-for-resilient-teams",
    author: "SESA Editorial Team",
    featured: true,
    published: true,
    image: createPlaceholderImage("Future of Work"),
    category: "career",
    tags: ["leadership", "culture", "strategy"],
    readTime: "6 min read",
    createdAt: new Date("2026-05-12"),
    updatedAt: new Date("2026-05-12"),
  },
  {
    id: "fallback-2",
    title: "Streamlining Operations: How Automation Drives Scalable Growth",
    content:
      "<p>Discover how automation can eliminate manual tasks and reduce costs.</p>",
    excerpt:
      "Discover how automation can eliminate manual tasks, reduce costs, and create the foundation for long-term, sustainable growth.",
    slug: "streamlining-operations-automation-drives-growth",
    author: "SESA Editorial Team",
    featured: true,
    published: true,
    image: createPlaceholderImage("Automation"),
    category: "technical",
    tags: ["automation", "systems", "ops"],
    readTime: "5 min read",
    createdAt: new Date("2026-05-08"),
    updatedAt: new Date("2026-05-08"),
  },
  {
    id: "fallback-3",
    title:
      "Turning Data Into Decisions: A Practical Guide for Business Leaders",
    content:
      "<p>Learn how to build a data-driven culture and make faster business decisions.</p>",
    excerpt:
      "Learn how to build a data-driven culture and leverage analytics to make smarter, faster business decisions.",
    slug: "turning-data-into-decisions-business-leaders",
    author: "SESA Editorial Team",
    featured: false,
    published: true,
    image: createPlaceholderImage("Data & Analytics"),
    category: "events",
    tags: ["data", "analytics", "insight"],
    readTime: "7 min read",
    createdAt: new Date("2026-05-03"),
    updatedAt: new Date("2026-05-03"),
  },
  {
    id: "fallback-4",
    title: "Building a Culture of Innovation That Lasts",
    content:
      "<p>Innovation is more than ideas; it is the environment that makes ideas possible.</p>",
    excerpt:
      "Innovation isn't just about ideas—it's about creating an environment where people feel empowered to experiment and grow.",
    slug: "building-culture-of-innovation-that-lasts",
    author: "SESA Editorial Team",
    featured: false,
    published: true,
    image: createPlaceholderImage("Innovation"),
    category: "community",
    tags: ["innovation", "people", "growth"],
    readTime: "4 min read",
    createdAt: new Date("2026-04-28"),
    updatedAt: new Date("2026-04-28"),
  },
];

const BlogsPage = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blogs");

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        const publishedBlogs = Array.isArray(data)
          ? data.filter((item: Blog) => item.published)
          : [];
        setBlogPosts(publishedBlogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const activePosts = blogPosts.length > 0 ? blogPosts : fallbackBlogs;
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    return activePosts.filter((post) => {
      const postCategory = (post.category ?? "").toLowerCase();
      const matchesCategory =
        selectedCategory === "all" || postCategory === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        (post.excerpt ?? "").toLowerCase().includes(normalizedSearch) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch)) ||
        post.author.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activePosts, normalizedSearch, selectedCategory]);

  const featuredPosts = useMemo(() => {
    const featured = activePosts.filter((post) => post.featured);
    return featured.length > 0 ? featured.slice(0, 3) : activePosts.slice(0, 3);
  }, [activePosts]);

  const featuredStory = featuredPosts[0] ?? activePosts?.[0];
  const spotlightPosts = featuredPosts.slice(1, 3);
  const sidebarPosts = (
    filteredPosts.length > 0 ? filteredPosts : activePosts
  ).slice(0, 4);

  const categoryCounts = categories.map((category) => {
    const count =
      category.value === "all"
        ? activePosts.length
        : activePosts.filter(
            (post) => (post.category ?? "").toLowerCase() === category.value,
          ).length;

    return {
      ...category,
      count,
    };
  });

  const totalReadTime = activePosts.reduce((count, post) => {
    if (!post.readTime) {
      return count;
    }

    return count + 1;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[#11112A]" />
          <p className="text-sm font-medium text-[#32324E]">
            Loading blog articles...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FCFCFC] p-6">
        <div className="max-w-sm space-y-4 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-[#D2D2D2]" />
          <h2 className="text-xl font-bold font-sans text-[#11112A]">
            Error Loading Blogs
          </h2>
          <p className="text-sm leading-relaxed text-[#32324E]">{error}</p>
          <Button
            onClick={() => globalThis.location.reload()}
            className="rounded-xl bg-[#11112A] px-5 py-2 text-xs font-semibold text-[#FCFCFC] hover:bg-[#32324E]"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FCFCFC] px-3 pt-24 pb-12 md:px-6 lg:px-8 md:pt-32 flex flex-col gap-6 md:gap-8 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
        
        {/* Hero Section */}
        <section 
          className="relative w-full rounded-[32px] overflow-hidden border border-[#D2D2D2] shadow-sm bg-cover bg-center py-20 px-6 md:px-10 lg:px-12 text-center flex flex-col items-center justify-center min-h-[400px]"
          style={{ backgroundImage: `url('/tech_watercolor_bg.png')` }}
        >
          <div className="absolute inset-0 bg-[#FCFCFC]/35 pointer-events-none backdrop-blur-[1px]" />
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#11112A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#11112A] animate-pulse" />
              ARTICLES
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-sans text-[#11112A] leading-[1.15] tracking-tight max-w-2xl mx-auto">
              Discover SESA Blog
            </h1>
            <p className="text-sm md:text-base text-[#32324E] max-w-xl mx-auto font-medium mt-4">
              Insights, tutorials, and stories from the Software Engineering community, curated in a magazine-style layout.
            </p>
          </div>
        </section>

        {/* Featured Stories & Search section */}
        <section className="bg-[#FCFCFC] rounded-[2rem] border border-[#D2D2D2] shadow-sm p-6 md:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left Column: Featured and Spotlight Posts */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#11112A]/20 bg-[#11112A]/5 px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#11112A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#11112A] animate-pulse" />
                  Featured Story
                </span>
              </div>
              
              {featuredStory && (
                <div className="overflow-hidden rounded-3xl border border-[#D2D2D2] bg-[#FCFCFC] shadow-sm">
                  <div className="relative aspect-16/9 w-full">
                    <Image
                      src={
                        featuredStory.image ||
                        createPlaceholderImage("Featured Story")
                      }
                      alt={featuredStory.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-slate-950/60" />
                    <div className="absolute left-6 right-6 bottom-6 space-y-3">
                      {featuredStory.category && (
                        <span className="inline-flex rounded-full bg-[#11112A] text-[#FCFCFC] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                          {featuredStory.category}
                        </span>
                      )}
                      <h2 className="text-xl md:text-3xl font-bold font-sans leading-tight text-white line-clamp-2">
                        <Link href={`/blogs/${featuredStory.slug}`} className="hover:underline">
                          {featuredStory.title}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-[#D2D2D2]" />
                          {featuredStory.author}
                        </span>
                        {featuredStory.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-[#D2D2D2]" />
                            {featuredStory.readTime}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#D2D2D2]" />
                          {formatDate(featuredStory.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Spotlight list and Filters */}
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D2] bg-[#FCFCFC] px-3.5 py-1.5 text-[0.675rem] font-bold uppercase tracking-[0.2em] text-[#32324E]">
                  Spotlight
                </span>
                <div className="grid gap-4">
                  {(spotlightPosts.length > 0
                    ? spotlightPosts
                    : activePosts.slice(1, 3)
                  ).map((post) => (
                    <article
                      key={post.id}
                      className="rounded-2xl border border-[#D2D2D2] bg-[#FCFCFC] p-5 shadow-sm hover:border-[#11112A]/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        <span className="text-[#11112A]">{post.category || "Blog"}</span>
                        <span>{post.readTime || "5 min read"}</span>
                      </div>
                      <h3 className="mt-2 line-clamp-2 text-base font-bold text-[#11112A] leading-snug hover:text-[#32324E] transition-colors">
                        <Link href={`/blogs/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#32324E]/80">
                        {post.excerpt ||
                          "A short editorial teaser to round out the layout and keep the page visually balanced."}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {/* Search & Categories */}
              <div className="space-y-4 border-t border-[#D2D2D2]/50 pt-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-[#D2D2D2] bg-[#FCFCFC] py-2.5 pl-11 pr-4 text-xs text-[#11112A] outline-none placeholder:text-slate-400 focus:border-[#11112A] focus:ring-2 focus:ring-[#11112A]/10 transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {categoryCounts.map((category) => (
                    <button
                      key={category.value}
                      onClick={() =>
                        setSelectedCategory(category.value as BlogCategory)
                      }
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        selectedCategory === category.value
                          ? "border-[#11112A] bg-[#11112A] text-[#FCFCFC] shadow-sm"
                          : "border-[#D2D2D2] bg-[#FCFCFC] text-[#32324E] hover:bg-[#D2D2D2]/25"
                      }`}
                    >
                      {category.label}
                      <span className="text-[9px] opacity-70">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)] xl:gap-8">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[#D2D2D2] bg-[#FCFCFC] p-6 md:p-10 lg:p-12 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#11112A] md:text-3xl">
                    Latest articles
                  </h2>
                  <p className="mt-1 text-sm text-[#32324E]/80">
                    Showing {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "article" : "articles"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#32324E]">
                  <span className="rounded-full border border-[#D2D2D2] bg-[#FCFCFC] px-3 py-1">
                    Featured: {featuredPosts.length}
                  </span>
                  <span className="rounded-full border border-[#D2D2D2] bg-[#FCFCFC] px-3 py-1">
                    Categories: {categories.length - 1}
                  </span>
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-[#D2D2D2]/50" />

              {filteredPosts.length === 0 ? (
                <div className="py-16 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-[#D2D2D2]" />
                  <h3 className="mt-4 text-xl font-bold text-[#11112A]">
                    No articles found
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-[#32324E]/80">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="group overflow-hidden rounded-3xl border-[#D2D2D2] bg-[#FCFCFC] shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-[#FCFCFC]">
                        <Image
                          src={
                            post.image ||
                            createPlaceholderImage(post.category || "Article")
                          }
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-950/45" />
                        <div className="absolute left-3 top-3 flex gap-2">
                          {post.category && (
                            <span className="rounded-full bg-[#FCFCFC]/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#11112A] border border-[#D2D2D2]/50">
                              {post.category}
                            </span>
                          )}
                          {post.featured && (
                            <span className="rounded-full bg-[#11112A] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FCFCFC]">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      <CardHeader className="space-y-3 p-5">
                        <CardTitle className="line-clamp-2 text-xl font-bold leading-snug text-[#11112A] transition-colors group-hover:text-[#32324E]">
                          {post.title}
                        </CardTitle>
                        {post.excerpt && (
                          <CardDescription className="line-clamp-3 text-sm leading-relaxed text-[#32324E]/90">
                            {post.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>

                      <CardContent className="space-y-3 px-5 pb-4 text-sm text-[#32324E]/80">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-[#11112A]" />
                            <span className="line-clamp-1">{post.author}</span>
                          </span>
                          {post.readTime && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-[#11112A]" />
                              {post.readTime}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#32324E]/70">
                          <Calendar className="h-3.5 w-3.5 text-[#11112A]" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={`${post.id}-${tag}`}
                                className="rounded-full border border-[#32324E]/20 bg-[#D2D2D2]/25 px-2.5 py-1 text-[10px] font-semibold text-[#32324E]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="px-5 pb-5 pt-0">
                        <Link href={`/blogs/${post.slug}`} className="w-full">
                          <Button
                            variant="outline"
                            className="flex w-full items-center justify-center gap-1.5 rounded-xl border-[#D2D2D2] text-[#11112A] text-xs font-semibold transition-all hover:bg-[#11112A] hover:text-[#FCFCFC] hover:border-[#11112A]"
                          >
                            Read Article
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-[#D2D2D2] bg-[#FCFCFC] p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#11112A]">
                  Popular posts
                </h3>
                <span className="rounded-full bg-[#11112A]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#11112A]">
                  Trending
                </span>
              </div>
              <ul className="mt-5 space-y-4">
                {sidebarPosts.map((post) => (
                  <li
                    key={post.id}
                    className="flex gap-3 rounded-2xl border border-[#D2D2D2] p-3 transition-colors hover:bg-[#D2D2D2]/10"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#FCFCFC]">
                      <Image
                        src={
                          post.image ||
                          createPlaceholderImage(post.category || "Story")
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-semibold leading-snug text-[#11112A]">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#32324E]/70">
                        {post.readTime || "5 min read"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-[#D2D2D2] bg-[#FCFCFC] p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#11112A]">
                Categories
              </h3>
              <ul className="mt-4 divide-y divide-[#D2D2D2]/50">
                {categoryCounts.map((category) => (
                  <li key={category.value}>
                    <button
                      onClick={() =>
                        setSelectedCategory(category.value as BlogCategory)
                      }
                      className={`flex w-full items-center justify-between py-3 text-sm transition-colors ${selectedCategory === category.value ? "text-[#11112A] font-bold" : "text-[#32324E] hover:text-[#11112A]"}`}
                    >
                      <span>{category.label}</span>
                      <span className="text-[#32324E]/70">{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-[#D2D2D2]/20 bg-[#11112A] p-6 text-[#FCFCFC] shadow-sm">
              <h3 className="text-base font-bold">Stay in the loop</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#D2D2D2]">
                Get the latest insights and updates straight to your inbox.
              </p>
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-xl border-[#FCFCFC]/20 bg-[#FCFCFC]/5 px-3 py-2.5 text-sm text-[#FCFCFC] outline-none placeholder:text-[#D2D2D2]/60 focus:border-[#FCFCFC] focus:ring-2 focus:ring-[#FCFCFC]/20"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#FCFCFC] text-[#11112A] px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[#D2D2D2]"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-xs text-[#D2D2D2]/80">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default BlogsPage;
