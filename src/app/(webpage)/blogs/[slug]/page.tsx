"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { ArticleContent } from "@/components/ArticleContent";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorCard } from "@/components/AuthorCard";
import { TagsSection } from "@/components/TagsSection";
import type { Blog } from "@/types/blog";

const createPlaceholderImage = (label: string, accent = "#32324E") => {
  const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${label}">
            <rect width="1600" height="900" fill="#11112A" />
            <circle cx="1320" cy="120" r="240" fill="${accent}" fill-opacity="0.18" />
            <circle cx="240" cy="720" r="200" fill="#ffffff" fill-opacity="0.08" />
            <rect x="120" y="620" width="540" height="20" rx="10" fill="#ffffff" fill-opacity="0.22" />
            <rect x="120" y="660" width="340" height="12" rx="6" fill="#ffffff" fill-opacity="0.16" />
            <text x="120" y="260" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700">${label}</text>
            <text x="120" y="330" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500">SESA Blog</text>
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
    return <LoadingAnimation text="Loading blog post..." size="lg" />;
  }

  if (error || !blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FCFCFC] px-4">
        <div className="max-w-md rounded-4xl border border-[#D2D2D2] bg-[#FCFCFC] p-8 text-center shadow-sm">
          <BookOpen className="mx-auto mb-4 h-14 w-14 text-[#D2D2D2]" />
          <h2 className="text-2xl font-bold font-sans text-[#11112A]">
            Blog Post Not Found
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#32324E]">
            {error || "The blog post you are looking for does not exist."}
          </p>
          <Link href="/blogs" className="mt-6 inline-flex">
            <Button className="rounded-xl bg-[#11112A] px-5 py-2.5 font-semibold text-[#FCFCFC] hover:bg-[#32324E]">
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
      image: createPlaceholderImage("Archive Stories", "#11112A"),
    },
    {
      title: "Practical guides for builders",
      label: "Guides",
      description:
        "Short, useful breakdowns designed to be easy to scan and apply.",
      image: createPlaceholderImage("Practical Guides", "#32324E"),
    },
    {
      title: "Stories from the community",
      label: "Community",
      description:
        "Highlights, lessons, and events from people shaping the work around SESA.",
      image: createPlaceholderImage("Community Stories", "#11112A"),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FCFCFC] px-3 pt-24 pb-12 md:px-6 lg:px-8 md:pt-32 flex flex-col gap-6 md:gap-8 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 md:gap-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/blogs">
            <Button
              variant="ghost"
              className="rounded-full border border-[#D2D2D2] bg-[#FCFCFC]/90 px-4 text-sm font-semibold text-[#32324E] shadow-sm hover:bg-[#FCFCFC] hover:text-[#11112A]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blogs
            </Button>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-[#D2D2D2] bg-[#FCFCFC]/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#32324E] md:flex">
            <Sparkles className="h-3.5 w-3.5 text-[#11112A]" />
            Published article
          </div>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-[#D2D2D2] bg-[#FCFCFC] shadow-sm">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-80 overflow-hidden bg-slate-950 lg:min-h-full">
              <img
                src={heroImage}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/60" />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                {blog.category && (
                  <span className="rounded-full bg-[#FCFCFC]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#11112A] backdrop-blur border border-[#D2D2D2]/50">
                    {blog.category}
                  </span>
                )}
                <span className="rounded-full bg-[#11112A] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FCFCFC]">
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
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#32324E]">
                <span className="rounded-full border border-[#D2D2D2] bg-[#FCFCFC] px-3 py-1 text-[#11112A]">
                  Article
                </span>
                {blog.featured && (
                  <span className="rounded-full border border-[#32324E]/20 bg-[#D2D2D2]/20 px-3 py-1 text-[#32324E]">
                    Featured
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#11112A] md:text-5xl lg:text-6xl">
                  {blog.title}
                </h1>
                {blog.excerpt && (
                  <p className="max-w-2xl text-base leading-relaxed text-[#32324E]/95 md:text-lg">
                    {blog.excerpt}
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-[#D2D2D2] bg-[#FCFCFC] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#32324E]">
                    <User className="h-3.5 w-3.5 text-[#11112A]" />
                    Author
                  </div>
                  <p className="mt-2 text-sm font-bold text-[#11112A]">
                    {blog.author}
                  </p>
                </div>

                <div className="rounded-3xl border border-[#D2D2D2] bg-[#FCFCFC] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#32324E]">
                    <Calendar className="h-3.5 w-3.5 text-[#11112A]" />
                    Published
                  </div>
                  <p className="mt-2 text-sm font-bold text-[#11112A]">
                    {formatDate(blog.createdAt)}
                  </p>
                </div>

                <div className="rounded-3xl border border-[#D2D2D2] bg-[#FCFCFC] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#32324E]">
                    <Clock className="h-3.5 w-3.5 text-[#11112A]" />
                    Read time
                  </div>
                  <p className="mt-2 text-sm font-bold text-[#11112A]">
                    {readTime}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href="/blogs">
                  <Button className="rounded-xl bg-[#11112A] px-5 py-2.5 font-semibold text-[#FCFCFC] hover:bg-[#32324E]">
                    Explore more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="rounded-xl border-[#D2D2D2] px-5 py-2.5 font-semibold text-[#32324E] hover:bg-[#D2D2D2]/20"
                >
                  <Tag className="mr-2 h-4 w-4 text-[#11112A]" />
                  {blog.tags.length} tags
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-t border-[#D2D2D2]/50 p-6 md:p-8 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:p-10 xl:p-12">
            <div className="space-y-8">
              <div className="rounded-4xl border border-[#D2D2D2] bg-[#FCFCFC] p-5 md:p-6">
                <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#32324E]">
                  <BookOpen className="h-3.5 w-3.5 text-[#11112A]" />
                  Article body
                </div>
                <ArticleContent content={blog.content} />
              </div>

              {blog.tags.length > 0 && (
                <div className="rounded-4xl border border-[#D2D2D2] bg-[#FCFCFC] p-5 md:p-6">
                  <TagsSection tags={blog.tags} />
                </div>
              )}

              <div className="rounded-4xl border border-[#D2D2D2] bg-[#FCFCFC] p-5 md:p-6">
                <AuthorCard
                  name={blog.author}
                  bio={`Written by ${blog.author}`}
                />
              </div>

              <div className="rounded-4xl border border-[#D2D2D2]/30 bg-[#11112A] p-5 text-[#FCFCFC] md:p-6">
                <ShareButtons url={shareUrl} title={blog.title} />
              </div>

              <div className="flex justify-between gap-3 border-t border-[#D2D2D2]/50 pt-2">
                <Link href="/blogs">
                  <Button
                    variant="ghost"
                    className="rounded-full px-0 text-sm font-semibold text-[#32324E] hover:bg-transparent hover:text-[#11112A]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all blogs
                  </Button>
                </Link>
                <Link href="/blogs">
                  <Button className="rounded-full bg-[#11112A] px-5 py-2.5 text-sm font-semibold text-[#FCFCFC] hover:bg-[#32324E]">
                    View archive
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2rem] border border-[#D2D2D2] bg-[#FCFCFC] p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#11112A]">
                    Article snapshot
                  </h2>
                  <Sparkles className="h-4 w-4 text-[#11112A]" />
                </div>
                <div className="mt-5 space-y-3 text-sm text-[#32324E]">
                  <div className="flex items-center justify-between rounded-2xl bg-[#FCFCFC] border border-[#D2D2D2] px-4 py-3">
                    <span className="flex items-center gap-2 font-medium text-[#32324E]">
                      <User className="h-4 w-4 text-[#11112A]" />
                      Author
                    </span>
                    <span className="font-semibold text-[#11112A]">
                      {blog.author}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-[#FCFCFC] border border-[#D2D2D2] px-4 py-3">
                    <span className="flex items-center gap-2 font-medium text-[#32324E]">
                      <Calendar className="h-4 w-4 text-[#11112A]" />
                      Date
                    </span>
                    <span className="font-semibold text-[#11112A]">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-[#FCFCFC] border border-[#D2D2D2] px-4 py-3">
                    <span className="flex items-center gap-2 font-medium text-[#32324E]">
                      <Clock className="h-4 w-4 text-[#11112A]" />
                      Read
                    </span>
                    <span className="font-semibold text-[#11112A]">
                      {readTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#D2D2D2]/20 bg-[#11112A] p-6 text-[#FCFCFC] shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold">Tags</h2>
                  <Tag className="h-4 w-4 text-[#FCFCFC]" />
                </div>
                {blog.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.map((tagName) => (
                      <span
                        key={tagName}
                        className="rounded-full border border-[#FCFCFC]/10 bg-[#FCFCFC]/5 px-3 py-1 text-[11px] font-semibold text-[#D2D2D2]"
                      >
                        #{tagName}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-[#D2D2D2]/80">
                    No tags available for this post.
                  </p>
                )}
              </div>

              <div className="rounded-[2rem] border border-[#D2D2D2] bg-[#FCFCFC] p-6 shadow-sm">
                <h2 className="text-base font-bold text-[#11112A]">
                  More to read
                </h2>
                <div className="mt-4 space-y-4">
                  {relatedDrafts.map((item) => (
                    <div
                      key={item.title}
                      className="group overflow-hidden rounded-3xl border border-[#D2D2D2] bg-[#FCFCFC] transition-transform hover:-translate-y-0.5"
                    >
                      <div className="relative h-36 overflow-hidden bg-[#11112A]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-2 p-4">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#32324E]/70">
                          {item.label}
                        </div>
                        <h3 className="text-sm font-bold leading-snug text-[#11112A]">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#32324E]/80">
                          {item.description}
                        </p>
                        <Link
                          href="/blogs"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#11112A] hover:underline"
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

        <section className="mt-6 rounded-[2rem] border border-[#D2D2D2] bg-[#FCFCFC] p-6 md:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#11112A] md:text-3xl">
                More Articles
              </h2>
              <p className="mt-1 text-sm text-[#32324E]/80">
                Continue browsing the SESA archive for more featured stories and
                guides.
              </p>
            </div>
            <Link href="/blogs">
              <Button className="rounded-full bg-[#11112A] px-5 py-2.5 font-semibold text-[#FCFCFC] hover:bg-[#32324E]">
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
