"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface FullscreenImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
}

export default function FullscreenImage({
  src,
  alt,
  className = "",
  aspectRatio = "video",
}: FullscreenImageProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isFullscreen]);

  const aspectRatioClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  }[aspectRatio];

  return (
    <>
      <div
        className={`relative w-full ${aspectRatioClass} rounded-lg overflow-hidden cursor-zoom-in group ${className}`}
        onClick={() => setIsFullscreen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative w-[95vw] h-[95vh] max-w-7xl">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
}
