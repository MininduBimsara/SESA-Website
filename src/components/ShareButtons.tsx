'use client'

import React from 'react'
import { Share2 } from 'lucide-react'
import { FacebookIcon, TwitterIcon, LinkedinIcon } from './icons/SocialIcons'

interface ShareButtonsProps {
    url: string
    title: string
    className?: string
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, className = '' }) => {
    return (
        <div className={`border-t border-b border-current/20 py-6 mb-8 w-full ${className}`}>
            <div className="flex items-center justify-between flex-wrap gap-4 text-current">
                <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-current opacity-80" />
                    <span className="font-bold font-sans text-current">Share this article:</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')}
                        className="w-10 h-10 rounded-full border border-current text-current hover:bg-current/10 flex items-center justify-center transition-all hover:scale-105"
                        aria-label="Share on Facebook"
                    >
                        <FacebookIcon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')}
                        className="w-10 h-10 rounded-full border border-current text-current hover:bg-current/10 flex items-center justify-center transition-all hover:scale-105"
                        aria-label="Share on Twitter"
                    >
                        <TwitterIcon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')}
                        className="w-10 h-10 rounded-full border border-current text-current hover:bg-current/10 flex items-center justify-center transition-all hover:scale-105"
                        aria-label="Share on LinkedIn"
                    >
                        <LinkedinIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
