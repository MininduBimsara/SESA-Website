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

const createPlaceholderImage = (label: string, accent = "#EC1640") => {
  const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
            <defs>
                <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#0f172a" />
                    <stop offset="55%" stop-color="#111827" />
                    <stop offset="100%" stop-color="#1e293b" />
                </linearGradient>
            </defs>
            <rect width="1200" height="800" fill="url(#background)" />
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
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(236,22,64,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[#EC1640]" />
          <p className="text-sm font-medium text-slate-500">
            Loading blog articles...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(236,22,64,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-6">
        <div className="max-w-sm space-y-4 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
          <h2 className="text-xl font-semibold text-slate-900">
            Error Loading Blogs
          </h2>
          <p className="text-sm leading-relaxed text-slate-500">{error}</p>
          <Button
            onClick={() => globalThis.location.reload()}
            className="rounded-xl bg-[#EC1640] px-5 py-2 text-xs font-semibold text-white hover:bg-[#d61237]"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(236,22,64,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] text-slate-950">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 pb-10 pt-24 md:px-6 md:pt-28 lg:px-10">
        <section className="relative overflow-hidden rounded-4xl border border-slate-200 bg-slate-950 text-white shadow-[0_30px_80px_-24px_rgba(15,23,42,0.35)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,22,64,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:p-12">
            <div className="flex flex-col justify-center gap-6">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[#EC1640]">
                  Articles
                </span>
                <span>{activePosts.length} published posts</span>
                <span>{totalReadTime} with read time</span>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                  Discover SESA Blog
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                  Insights, tutorials, and stories from the Software Engineering
                  community, curated in a magazine-style layout.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categoryCounts.slice(0, 4).map((category) => (
                  <button
                    key={category.value}
                    onClick={() =>
                      setSelectedCategory(category.value as BlogCategory)
                    }
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      selectedCategory === category.value
                        ? "border-[#EC1640] bg-[#EC1640] text-white shadow-lg shadow-[#EC1640]/20"
                        : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <category.icon className="h-3.5 w-3.5" />
                    {category.label}
                    <span className="text-[10px] opacity-70">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles by title, excerpt, tag, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-white/8 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-400 focus:border-[#EC1640] focus:ring-2 focus:ring-[#EC1640]/20"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <div className="relative aspect-16/11 w-full">
                  <Image
                    src={
                      featuredStory?.image ||
                      createPlaceholderImage("Featured Story")
                    }
                    alt={featuredStory?.title || "Featured story"}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4 space-y-3">
                    {featuredStory?.category && (
                      <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-900">
                        {featuredStory.category}
                      </span>
                    )}
                    <h2 className="text-2xl font-semibold leading-tight text-white line-clamp-3">
                      {featuredStory?.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-[#EC1640]" />
                        {featuredStory?.author}
                      </span>
                      {featuredStory?.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#EC1640]" />
                          {featuredStory.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {(spotlightPosts.length > 0
                  ? spotlightPosts
                  : activePosts.slice(1, 3)
                ).map((post) => (
                  <article
                    key={post.id}
                    className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-white backdrop-blur"
                  >
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                      <span>{post.category || "Blog"}</span>
                      <span>{post.readTime || "5 min read"}</span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
                      {post.excerpt ||
                        "A short editorial teaser to round out the layout and keep the page visually balanced."}
                    </p>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#EC1640] hover:underline"
                    >
                      Read article <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)] xl:gap-8">
          <div className="space-y-6">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.3)] md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                    Latest articles
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "article" : "articles"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                    Featured: {featuredPosts.length}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                    Categories: {categories.length - 1}
                  </span>
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-slate-200" />

              {filteredPosts.length === 0 ? (
                <div className="py-16 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    No articles found
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="group overflow-hidden rounded-3xl border-slate-200 bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={
                            post.image ||
                            createPlaceholderImage(post.category || "Article")
                          }
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                        <div className="absolute left-3 top-3 flex gap-2">
                          {post.category && (
                            <span className="rounded-full bg-white/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-900">
                              {post.category}
                            </span>
                          )}
                          {post.featured && (
                            <span className="rounded-full bg-[#EC1640] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      <CardHeader className="space-y-3 p-5">
                        <CardTitle className="line-clamp-2 text-xl font-semibold leading-snug text-slate-950 transition-colors group-hover:text-[#EC1640]">
                          {post.title}
                        </CardTitle>
                        {post.excerpt && (
                          <CardDescription className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                            {post.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>

                      <CardContent className="space-y-3 px-5 pb-4 text-sm text-slate-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-[#EC1640]" />
                            <span className="line-clamp-1">{post.author}</span>
                          </span>
                          {post.readTime && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-[#EC1640]" />
                              {post.readTime}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <Calendar className="h-3.5 w-3.5 text-[#EC1640]" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={`${post.id}-${tag}`}
                                className="rounded-full border border-[#EC1640]/10 bg-rose-50 px-2.5 py-1 text-[10px] font-semibold text-[#EC1640]"
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
                            className="flex w-full items-center justify-center gap-1.5 rounded-xl border-slate-200 text-xs font-semibold transition-all group-hover:border-transparent group-hover:bg-[#EC1640] group-hover:text-white"
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
          </div>

          <aside className="space-y-6">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.3)]">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-950">
                  Popular posts
                </h3>
                <span className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#EC1640]">
                  Trending
                </span>
              </div>
              <ul className="mt-5 space-y-4">
                {sidebarPosts.map((post) => (
                  <li
                    key={post.id}
                    className="flex gap-3 rounded-2xl border border-slate-200/80 p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
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
                      <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-950">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {post.readTime || "5 min read"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.3)]">
              <h3 className="text-base font-semibold text-slate-950">
                Categories
              </h3>
              <ul className="mt-4 divide-y divide-slate-200">
                {categoryCounts.map((category) => (
                  <li key={category.value}>
                    <button
                      onClick={() =>
                        setSelectedCategory(category.value as BlogCategory)
                      }
                      className={`flex w-full items-center justify-between py-3 text-sm transition-colors ${selectedCategory === category.value ? "text-[#EC1640]" : "text-slate-600 hover:text-[#EC1640]"}`}
                    >
                      <span>{category.label}</span>
                      <span className="text-slate-400">{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_60px_-36px_rgba(15,23,42,0.3)]">
              <h3 className="text-base font-semibold">Stay in the loop</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
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
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-[#EC1640] focus:ring-2 focus:ring-[#EC1640]/20"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#EC1640] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d61237]"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-xs text-slate-400">
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
