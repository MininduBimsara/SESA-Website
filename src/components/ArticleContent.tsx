'use client'

import React from 'react'

interface ArticleContentProps {
    content: string
    className?: string
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content, className = '' }) => {
    return (
        <>
            <div
                className={`prose prose-lg max-w-none mb-8 ${className}`}
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                    color: '#374151',
                }}
            />
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
        </>
    )
}
