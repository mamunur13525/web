"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.5, 4));
    } else {
      setScale((prev) => {
        const newScale = Math.max(prev - 0.5, 1);
        if (newScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return newScale;
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      e.preventDefault();
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const aspectRatioClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  }[aspectRatio];

  return (
    <Dialog onOpenChange={(open) => !open && resetZoom()}>
      <DialogTrigger asChild>
        <div
          className={`relative w-full ${aspectRatioClass} rounded-lg overflow-hidden cursor-zoom-in group ${className}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </DialogTrigger>

      <DialogContent
        className="max-w-none! w-screen! h-screen! border-none bg-black/95 shadow-none p-0 flex items-center justify-center dialog-content-fullscreen z-400"
        showCloseButton={false} // We'll add our own custom close button for better positioning
      >
        <DialogTitle className="sr-only">Fullscreen view of {alt}</DialogTitle>

        <DialogClose className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-100 cursor-pointer">
          <X className="w-6 h-6 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="relative w-[95vw] h-[95vh] max-w-7xl transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor:
                scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain pointer-events-none"
              quality={100}
              draggable={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
