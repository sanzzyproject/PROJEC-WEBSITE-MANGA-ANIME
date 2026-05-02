'use client';

import React, { useRef, useState, useEffect } from 'react';

interface ScrollingTitleProps {
  text: string;
  className?: string;
}

export function ScrollingTitle({ text, className = '' }: ScrollingTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        setIsOverflowing(textRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden w-full bounce-container ${className}`}
      style={{
        maskImage: isOverflowing ? 'linear-gradient(90deg, #000 0%, #000 85%, transparent 100%)' : 'none',
        WebkitMaskImage: isOverflowing ? 'linear-gradient(90deg, #000 0%, #000 85%, transparent 100%)' : 'none',
      }}
    >
      <div
        ref={textRef}
        className={`whitespace-nowrap ${isOverflowing ? 'animate-bounce-text' : 'truncate'}`}
        style={{
          display: 'inline-block',
          width: isOverflowing ? 'max-content' : '100%',
          minWidth: '100%',
        }}
      >
        {text}
      </div>
    </div>
  );
}
