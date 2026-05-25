"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Loader2,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { ArticleContent } from "@/components/ArticleContent";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorCard } from "@/components/AuthorCard";
import { TagsSection } from "@/components/TagsSection";
import type { Blog } from "@/types/blog";

const createPlaceholderImage = (label: string, accent = "#EC1640") => {
  const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${label}">
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#020617" />
                    <stop offset="55%" stop-color="#111827" />
                    <stop offset="100%" stop-color="#1f2937" />
                </linearGradient>
            </defs>
            <rect width="1600" height="900" fill="url(#bg)" />
            <circle cx="1320" cy="120" r="240" fill="${accent}" fill-opacity="0.18" />
            <circle cx="240" cy="720" r="200" fill="#ffffff" fill-opacity="0.08" />
            <rect x="120" y="620" width="540" height="20" rx="10" fill="#ffffff" fill-opacity="0.22" />
            <rect x="120" y="660" width="340" height="12" rx="6" fill="#ffffff" fill-opacity="0.16" />
            <text x="120" y="260" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700">${label}</text>
            <text x="120" y="330" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="500">SESA Blog</text>
        </svg>
    `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
};

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, "");
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
  };

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/slug/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Blog post not found");
          } else {
            throw new Error("Failed to fetch blog");
          }
          return;
        }

        const foundBlog: Blog = await response.json();

        if (!foundBlog.published) {
          setError("Blog post not found");
          return;
        }

        setBlog(foundBlog);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(236,22,64,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-14 w-14 animate-spin text-[#EC1640]" />
          <p className="text-base font-medium text-slate-500">
            Loading blog post...
          </p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(236,22,64,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-4">
        <div className="max-w-md rounded-4xl border border-slate-200 bg-white p-8 text-center shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)]">
          <BookOpen className="mx-auto mb-4 h-14 w-14 text-slate-300" />
          <h2 className="text-2xl font-semibold text-slate-950">
            Blog Post Not Found
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {error || "The blog post you are looking for does not exist."}
          </p>
          <Link href="/blogs" className="mt-6 inline-flex">
            <Button className="rounded-xl bg-[#EC1640] px-5 py-2.5 font-semibold text-white hover:bg-[#d61237]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const readTime = blog.readTime || calculateReadingTime(blog.content);
  const heroImage = blog.image || createPlaceholderImage(blog.title);
  const shareUrl = globalThis.window?.location?.href ?? "";
  const relatedDrafts = [
    {
      title: `More ${blog.category || "SESA"} insights`,
      label: "Featured archive",
      description:
        "Explore more articles with the same editorial tone and practical focus.",
      image: createPlaceholderImage("Archive Stories", "#0f172a"),
    },
    {
      title: "Practical guides for builders",
      label: "Guides",
      description:
        "Short, useful breakdowns designed to be easy to scan and apply.",
      image: createPlaceholderImage("Practical Guides", "#EC1640"),
    },
    {
      title: "Stories from the community",
      label: "Community",
      description:
        "Highlights, lessons, and events from people shaping the work around SESA.",
      image: createPlaceholderImage("Community Stories", "#1f2937"),
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(236,22,64,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] text-slate-950">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pb-12 pt-24 md:px-6 md:pt-28 lg:px-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/blogs">
            <Button
              variant="ghost"
              className="rounded-full border border-slate-200 bg-white/90 px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-white hover:text-[#EC1640]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blogs
            </Button>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:flex">
            <Sparkles className="h-3.5 w-3.5 text-[#EC1640]" />
            Published article
          </div>
        </div>

        <article className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_30px_80px_-24px_rgba(15,23,42,0.18)]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-80 overflow-hidden bg-slate-950 lg:min-h-full">
              <img
                src={heroImage}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/25 to-transparent" />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                {blog.category && (
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-900 backdrop-blur">
                    {blog.category}
                  </span>
                )}
                <span className="rounded-full bg-[#EC1640] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#EC1640]/20">
                  {readTime}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <p className="mb-3 max-w-xl text-sm leading-relaxed text-slate-200/90">
                  {blog.excerpt ||
                    "A featured article in the SESA editorial archive, presented in a cinematic, magazine-style layout."}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 p-6 md:p-8 lg:p-10 xl:p-12">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[#EC1640]">
                  Article
                </span>
                {blog.featured && (
                  <span className="rounded-full border border-[#EC1640]/10 bg-rose-50 px-3 py-1 text-[#EC1640]">
                    Featured
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                  {blog.title}
                </h1>
                {blog.excerpt && (
                  <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                    {blog.excerpt}
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <User className="h-3.5 w-3.5 text-[#EC1640]" />
                    Author
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-950">
                    {blog.author}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <Calendar className="h-3.5 w-3.5 text-[#EC1640]" />
                    Published
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-950">
                    {formatDate(blog.createdAt)}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-[#EC1640]" />
                    Read time
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-950">
                    {readTime}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href="/blogs">
                  <Button className="rounded-xl bg-[#EC1640] px-5 py-2.5 font-semibold text-white hover:bg-[#d61237]">
                    Explore more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-200 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Tag className="mr-2 h-4 w-4 text-[#EC1640]" />
                  {blog.tags.length} tags
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-t border-slate-200 p-6 md:p-8 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:p-10 xl:p-12">
            <div className="space-y-8">
              <div className="rounded-4xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <BookOpen className="h-3.5 w-3.5 text-[#EC1640]" />
                  Article body
                </div>
                <ArticleContent content={blog.content} />
              </div>

              {blog.tags.length > 0 && (
                <div className="rounded-4xl border border-slate-200 bg-white p-5 md:p-6">
                  <TagsSection tags={blog.tags} />
                </div>
              )}

              <div className="rounded-4xl border border-slate-200 bg-white p-5 md:p-6">
                <AuthorCard
                  name={blog.author}
                  bio={`Written by ${blog.author}`}
                />
              </div>

              <div className="rounded-4xl border border-slate-200 bg-slate-950 p-5 text-white md:p-6">
                <ShareButtons url={shareUrl} title={blog.title} />
              </div>

              <div className="flex justify-between gap-3 border-t border-slate-200 pt-2">
                <Link href="/blogs">
                  <Button
                    variant="ghost"
                    className="rounded-full px-0 text-sm font-semibold text-slate-600 hover:bg-transparent hover:text-[#EC1640]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all blogs
                  </Button>
                </Link>
                <Link href="/blogs">
                  <Button className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
                    View archive
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.28)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-950">
                    Article snapshot
                  </h2>
                  <Sparkles className="h-4 w-4 text-[#EC1640]" />
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-2 font-medium text-slate-500">
                      <User className="h-4 w-4 text-[#EC1640]" />
                      Author
                    </span>
                    <span className="font-semibold text-slate-950">
                      {blog.author}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-2 font-medium text-slate-500">
                      <Calendar className="h-4 w-4 text-[#EC1640]" />
                      Date
                    </span>
                    <span className="font-semibold text-slate-950">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-2 font-medium text-slate-500">
                      <Clock className="h-4 w-4 text-[#EC1640]" />
                      Read
                    </span>
                    <span className="font-semibold text-slate-950">
                      {readTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-4xl border border-slate-200 bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Tags</h2>
                  <Tag className="h-4 w-4 text-[#EC1640]" />
                </div>
                {blog.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.map((tagName) => (
                      <span
                        key={tagName}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200"
                      >
                        #{tagName}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    No tags available for this post.
                  </p>
                )}
              </div>

              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.28)]">
                <h2 className="text-base font-semibold text-slate-950">
                  More to read
                </h2>
                <div className="mt-4 space-y-4">
                  {relatedDrafts.map((item) => (
                    <div
                      key={item.title}
                      className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="relative h-36 overflow-hidden bg-slate-900">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-2 p-4">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {item.label}
                        </div>
                        <h3 className="text-sm font-semibold leading-snug text-slate-950">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                        <Link
                          href="/blogs"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#EC1640] hover:underline"
                        >
                          Browse more
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>

        <section className="mt-6 rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.22)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                More Articles
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Continue browsing the SESA archive for more featured stories and
                guides.
              </p>
            </div>
            <Link href="/blogs">
              <Button className="rounded-full bg-[#EC1640] px-5 py-2.5 font-semibold text-white hover:bg-[#d61237]">
                View all blogs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetailPage;
