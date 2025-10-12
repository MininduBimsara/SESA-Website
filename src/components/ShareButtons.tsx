'use client'

import React from 'react'
import { Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

interface ShareButtonsProps {
    url: string
    title: string
    className?: string
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, className = '' }) => {
    return (
        <div className={`border-t border-b border-gray-200 py-6 mb-8 ${className}`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900 font-semibold">Share this article:</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                        aria-label="Share on Facebook"
                    >
                        <Facebook className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
                        aria-label="Share on Twitter"
                    >
                        <Twitter className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')}
                        className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-colors"
                        aria-label="Share on LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
