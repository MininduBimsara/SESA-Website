'use client';

import React from 'react';

interface NewsContentProps {
    content: string;
    className?: string;
}

/**
 * Reusable component to display HTML news content with proper styling
 * Can be used in both public news pages and admin preview
 */
const NewsContent: React.FC<NewsContentProps> = ({ content, className = '' }) => {
    return (
        <div
            className={`prose prose-lg max-w-none ${className}`}
            style={{
                // Typography styles
                color: '#1f2937',
                lineHeight: '1.75',
            }}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default NewsContent;

// Add global styles for the HTML content
export const newsContentStyles = `
  .prose {
    font-family: 'Georgia', 'Times New Roman', serif;
  }

  .prose h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #111827;
    line-height: 1.2;
  }

  .prose h2 {
    font-size: 1.875rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.875rem;
    color: #1f2937;
    line-height: 1.3;
  }

  .prose h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    color: #374151;
    line-height: 1.4;
  }

  .prose p {
    margin-bottom: 1rem;
    color: #4b5563;
  }

  .prose ul,
  .prose ol {
    margin-top: 0.75rem;
    margin-bottom: 1rem;
    padding-left: 1.75rem;
  }

  .prose li {
    margin-bottom: 0.5rem;
    color: #4b5563;
  }

  .prose strong {
    font-weight: 600;
    color: #111827;
  }

  .prose em {
    font-style: italic;
  }

  .prose a {
    color: #f43f5e;
    text-decoration: underline;
  }

  .prose a:hover {
    color: #e11d48;
  }

  .prose code {
    background-color: #f3f4f6;
    color: #e11d48;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-family: 'Courier New', monospace;
  }

  .prose pre {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .prose pre code {
    background-color: transparent;
    color: inherit;
    padding: 0;
    font-size: 0.875rem;
    line-height: 1.7;
  }

  .prose blockquote {
    border-left: 4px solid #f43f5e;
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
    color: #6b7280;
  }

  .prose img {
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .prose hr {
    border-top: 2px solid #e5e7eb;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;
