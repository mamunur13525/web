"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a short, pleasant click sound
      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently fail if Web Audio API is not supported
    }
  };

  const toggleTheme = () => {
    setIsAnimating(true);
    playClickSound();
    setTheme(theme === "dark" ? "light" : "dark");

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  if (!mounted) {
    return (
      <Button
        size="icon"
        variant="outline"
        className="w-10 h-10 rounded-full border"
        disabled
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="outline"
      className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border relative overflow-hidden group"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="w-5 h-5 relative flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={cn(
            "absolute left-1/2 top-1/2 -translate-1/2 h-5 w-5 transition-all duration-500 ease-in-out",
            theme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
            isAnimating && "animate-spin"
          )}
        />
        {/* Moon Icon */}
        <Moon
          className={cn(
            "absolute left-1/2 top-1/2 -translate-1/2 h-5 w-5 transition-all duration-500 ease-in-out",
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
            isAnimating && "animate-spin"
          )}
        />
      </div>
    </Button>
  );
}
