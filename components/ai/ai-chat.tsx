"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  ArrowDownCircle,
  ArrowDown,
} from "lucide-react";
import { generateChatResponse } from "@/app/actions/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const DEFAULT_MESSAGES: Message[] = [
  {
    id: "default-1",
    role: "assistant",
    content:
      "👋 Hi! I'm your AI assistant for this portfolio. Ask me anything about Mamun's work, skills, or projects!",
    timestamp: new Date(),
  },
];

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isBottom);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messages.length > 0) {
      // Only auto-scroll if we were already near bottom or it's a new message
      // For now, let's auto-scroll on new messages for better UX
      // scrollToBottom();
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [inputValue]);

  const handleToggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setTimeout(() => {
      scrollToBottom();
    }, 500);

    // Call Gemini API
    try {
      // Include the new user message in the history sent to the server
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const responseText = await generateChatResponse(conversationHistory);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: responseText || "Sorry, I couldn't generate a response.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: `ai-error-${Date.now()}`,
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button - Fixed Position */}
      <Button
        onClick={handleToggleChat}
        size="icon"
        className={cn(
          "fixed z-200 transition-[transform,opacity] duration-300 ease-out will-change-transform",
          "w-16 h-16 rounded-full shadow-2xl",
          "bg-zinc-900 dark:bg-white",
          "hover:bg-zinc-800 dark:hover:bg-zinc-100",
          "border border-zinc-700 dark:border-zinc-300",
          "hover:scale-110 active:scale-95",
          "backdrop-blur-md",
          // Position based on screen size
          "bottom-6 right-6 md:bottom-8 md:right-8 cursor-pointer",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open AI Chat"
      >
        <Bot className="w-7! h-7! text-white dark:text-zinc-900" />
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-200 transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          // Mobile: Full screen
          "inset-0 md:inset-auto",
          // Desktop: Bottom right with size
          "md:bottom-8 md:right-8 md:w-[420px] md:h-[600px]",
          "md:rounded-2xl overflow-hidden",
          "shadow-2xl",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none translate-y-4"
        )}
      >
        {/* Background with glassmorphism */}
        <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-2xl" />

        {/* Subtle border */}
        <div className="absolute inset-0 border border-zinc-200/50 dark:border-zinc-800/50 md:rounded-2xl" />

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="relative">
            {/* Header background with subtle gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-zinc-50/50 to-transparent dark:from-zinc-900/50 dark:to-transparent" />

            <div className="relative flex items-center justify-between p-5 md:p-5 md:py-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {/* Animated pulse ring */}
                  <div className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white animate-ping opacity-20" />
                  <div className="relative w-12 h-12 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center shadow-lg">
                    <Bot className="w-6! h-6! text-white dark:text-zinc-900" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-950 shadow-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white tracking-tight">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online now
                  </p>
                </div>
              </div>
              <Button
                onClick={handleToggleChat}
                size="icon"
                variant="ghost"
                className="w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 hover:rotate-90"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 relative scroll-smooth"
          >
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "message-animate flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-5 pb-3.5 shadow-lg backdrop-blur-sm",
                    "transition-all duration-300 hover:shadow-xl",
                    "border",
                    message.role === "user"
                      ? "bg-zinc-900/95 dark:bg-zinc-300/95 text-white dark:text-zinc-900 rounded-br-sm border-zinc-700 dark:border-zinc-300"
                      : "bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-white rounded-bl-sm border-zinc-200 dark:border-zinc-700"
                  )}
                >
                  <div
                    className={cn(
                      "text-sm leading-relaxed font-medium prose dark:prose-invert prose-p:my-1 prose-pre:my-1 prose-pre:bg-zinc-800 prose-pre:p-2 prose-pre:rounded-lg",
                      message.role === "user"
                        ? "text-white dark:text-zinc-900"
                        : "text-zinc-900 dark:text-white"
                    )}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          />
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] mt-2 block font-medium",
                      message.role === "user"
                        ? "text-white/60 dark:text-zinc-900/60"
                        : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start message-animate">
                <div className="bg-zinc-100/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-lg border border-zinc-200 dark:border-zinc-700">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 bg-zinc-900 dark:bg-white rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2.5 h-2.5 bg-zinc-900 dark:bg-white rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2.5 h-2.5 bg-zinc-900 dark:bg-white rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 md:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <div className="flex gap-3 items-center">
              <div className="flex-1 relative">
                {/* Scroll to bottom button */}
                <div
                  className={cn(
                    "absolute -top-20 left-1/2 translate-x-[30%] transition-all duration-300 z-10",
                    showScrollButton
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  )}
                >
                  <Button
                    onClick={scrollToBottom}
                    size="icon"
                    variant="secondary"
                    className="border rounded-full w-10 h-10 bg-white/90 dark:bg-zinc-800/90 shadow-lg border-zinc-200 dark:border-zinc-700 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <ArrowDown className="w-6! h-6! text-zinc-900 dark:text-white" />
                  </Button>
                </div>
                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className={cn(
                    "w-full min-h-[48px] max-h-[150px] rounded-2xl px-5 py-3",
                    "bg-white dark:bg-zinc-900",
                    "border-2 border-zinc-200 dark:border-zinc-700",
                    "focus-visible:border-zinc-900 dark:focus-visible:border-white",
                    "focus-visible:ring-4 focus-visible:ring-zinc-900/10 dark:focus-visible:ring-white/10",
                    "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                    "text-zinc-900 dark:text-white font-medium",
                    "transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "resize-none overflow-y-auto scrollbar-hide"
                  )}
                  disabled={isLoading}
                  rows={1}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputValue.trim() || isLoading}
                className={cn(
                  "w-12 h-12 rounded-2xl shrink-0",
                  "bg-zinc-900 dark:bg-white",
                  "hover:bg-zinc-800 dark:hover:bg-zinc-100",
                  "border-2 border-zinc-900 dark:border-white",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "transition-all duration-300 hover:scale-105 active:scale-95",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                <Send className="w-5 h-5 text-white dark:text-zinc-900" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes messageEnter {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .message-animate {
          animation: messageEnter 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
          will-change: transform, opacity;
        }

        /* Custom scrollbar for chat */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .dark .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
};

export default AIChat;
