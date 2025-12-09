"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = React.useRef<HTMLPreElement>(null);
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = async () => {
    if (!preRef.current) return;

    const text = preRef.current.innerText;
    // Remove default tailwind/prose styling side-effects if needed, usually innerText is fine.
    // Sometimes text has extra newlines at the end.
    const cleanedText = text.replace(/\n$/, "");

    try {
      await navigator.clipboard.writeText(cleanedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group mb-6">
      <pre
        ref={preRef}
        className={cn("overflow-x-auto rounded-lg", className)}
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute right-2 top-2 p-2 rounded-md w-8 h-8",
          "bg-zinc-700/50 hover:bg-zinc-700 text-zinc-100",
          "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
          "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-400",
          "border border-zinc-600/50 backdrop-blur-sm"
        )}
        aria-label="Copy code"
        title="Copy code"
      >
        <Check
          className={cn(
            "absolute left-1/2 top-1/2 -translate-1/2 h-4 w-4 duration-300 transition-opacity",
            isCopied ? "opacity-100" : "opacity-0"
          )}
        />
        <Copy
          className={cn(
            "absolute left-1/2 top-1/2 -translate-1/2 h-4 w-4 duration-300 transition-opacity",
            isCopied ? "opacity-0" : "opacity-100"
          )}
        />
      </button>
    </div>
  );
}
