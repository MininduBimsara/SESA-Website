import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingAnimationProps {
  text?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  text = 'Loading...',
  fullScreen = true,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Custom Sleek Spinner */}
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full border-[3px] border-[#D2D2D2]/40" />
        <div className="absolute inset-0 rounded-full border-[3px] border-[#11112A] border-t-transparent animate-spin" />
        <div className="w-1.5 h-1.5 bg-[#11112A] rounded-full animate-pulse" />
      </div>
      
      {text && (
        <div className="flex flex-col items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#11112A]/10 bg-[#11112A]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#11112A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#11112A] animate-ping" />
                PROCESSING
            </span>
            <p className={`${textClasses[size]} font-medium text-[#32324E] max-w-xs text-center`}>
                {text}
            </p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center px-4 transition-colors duration-300">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="w-full py-12 flex items-center justify-center bg-transparent">
        {loaderContent}
    </div>
  );
};

export default LoadingAnimation;
