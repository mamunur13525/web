"use client";

import Logo from "./logo";
import { Button } from "./ui/button";
import {
  ArrowUpRight,
  CloudDownload,
  ExternalLink,
  ListMinus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const SCROLL_THRESHOLD = 50; // px

const MENU_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
  { label: "Blogs", href: "/#blogs" },
  { label: "Contact", href: "/contact" },
];

const MENU_PANEL_DURATION = 300; // ms, should match CSS duration
const MENU_ITEM_STAGGER = 160; // ms between each item

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Check for scrollable section elements first (since that's the actual scroll container)
      const scrollableSection = document.querySelector(
        'section[class*="overflow-y-auto"]'
      );

      if (scrollableSection) {
        // Use the scrollable section's scrollTop
        const scrollTop = scrollableSection.scrollTop;
        setIsScrolled(scrollTop > SCROLL_THRESHOLD);
      } else {
        // Fallback to window scroll
        const scrollY = window.scrollY || window.pageYOffset;
        setIsScrolled(scrollY > SCROLL_THRESHOLD);
      }
    };

    // Initial check
    handleScroll();

    // Find the scrollable section
    const scrollableSection = document.querySelector(
      'section[class*="overflow-y-auto"]'
    );

    // Listen to scroll events on the scrollable section (primary)
    if (scrollableSection) {
      scrollableSection.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    // Also listen to window scroll events as fallback
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollableSection) {
        scrollableSection.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={cn(
        "fixed z-200 top-0 left-0 transition-all duration-500 ease-in-out    w-full",
        isScrolled ? "pt-4" : "pt-10"
      )}
    >
      <div
        className={cn(
          "flex items-start justify-between origin-center transition-all duration-500 ease-in-out container mx-auto  py-3 rounded-full border",
          isScrolled
            ? "bg-[#747475]/10 backdrop-blur-lg max-w-[90%] lg:max-w-4xl px-6"
            : "max-w-5xl px-7 xl:px-0 border-transparent bg-transparent"
        )}
      >
        <nav className="flex items-end gap-1 md:gap-3 ">
          <Link href="/#home">
            <Logo />
          </Link>
          <a
            href="mailto:mamun.ahmed135255@gmail.com"
            className="underline underline-offset-3 text-xs md:text-sm dark:text-zinc-200 text-zinc-800 hover:text-orange-600 whitespace-nowrap flex-1 pb-2"
          >
            mamun.ahmed13525@gmail.com
          </a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/blogs"
            className="hidden sm:flex text-xs sm:text-sm dark:text-zinc-200 text-zinc-800 hover:text-orange-600 whitespace-nowrap flex-1"
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className="hidden sm:flex text-xs sm:text-sm dark:text-zinc-200 text-zinc-800 hover:text-orange-600 whitespace-nowrap flex-1"
          >
            Contact
          </Link>
          <Button
            className="group items-center justify-start px-4 md:px-6 py-2 md:py-3 rounded-full cursor-pointer bg-[#000000] hidden md:flex duration-300 transition-all hover:w-46 w-10 relative"
            type="button"
          >
            <CloudDownload className="text-zinc-300 group-hover:dark:text-zinc-900" />
            <span className="absolute right-3.5 top-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full duration-300 transition-all pointer-events-none group-hover:pointer-events-auto">
              Download Resume
            </span>
          </Button>

          <ThemeToggle />

          <Button
            size={"icon"}
            variant={"outline"}
            className="w-10 h-10 cursor-pointer rounded-full border"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="navbar-menu-sheet"
            onClick={handleMenuToggle}
          >
            <ListMinus />
          </Button>
        </div>
      </div>

      <div
        id="navbar-menu-sheet"
        className={cn(
          "pointer-events-none fixed inset-0 z-400 flex justify-center overflow-hidden bg-white/0 transition-opacity duration-500 ease-out md:justify-end backdrop-blur-xl",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        )}
      >
        <div
          className={cn(
            "menu-sheet-panel flex h-full w-full flex-col justify-between  px-6 py-10  sm:px-10 md:w-[500px] bg-white dark:bg-zinc-900",
            isMenuOpen ? "menu-sheet-panel-open" : "menu-sheet-panel-closed"
          )}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 ">
              Navigation
            </p>
            <Button
              size={"icon"}
              variant={"outline"}
              className="h-14 w-14 cursor-pointer rounded-full border border-transparent bg-white text-zinc-900 dark:text-zinc-800 transition-colors hover:bg-zinc-100"
              type="button"
              aria-label="Close menu"
              onClick={handleMenuToggle}
            >
              <X className="h-8! w-8! dark:text-zinc-200" />
            </Button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-4">
            {MENU_ITEMS.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "menu-item-animate block rounded-full border border-transparent bg-zinc-900/95 dark:bg-zinc-50/95 px-8 py-5 text-lg font-semibold uppercase tracking-wider text-white dark:text-zinc-800 transition-colors hover:border-zinc-800 hover:bg-white hover:text-zinc-900 dark:hover:bg-zinc-500/55 dark:hover:text-zinc-200",
                    isMenuOpen && "menu-item-visible"
                  )}
                  style={{
                    animationDelay: `${
                      MENU_PANEL_DURATION + index * MENU_ITEM_STAGGER
                    }ms`,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li
              className={cn(
                "menu-item-animate flex md:hidden items-center  gap-3 rounded-full border border-transparent bg-zinc-900/95 dark:bg-zinc-50/95 px-8 py-5 text-lg font-semibold uppercase tracking-wider text-white dark:text-zinc-800 transition-colors hover:border-zinc-800 hover:bg-white hover:text-zinc-900 dark:hover:bg-zinc-500/55 dark:hover:text-zinc-200",
                isMenuOpen && "menu-item-visible"
              )}
              style={{
                animationDelay: `${
                  MENU_PANEL_DURATION + 5 * MENU_ITEM_STAGGER
                }ms`,
              }}
            >
              <CloudDownload />
              Download Resume
            </li>
          </ul>

          <div className="flex flex-wrap md:flex-col items-center md:items-start gap-2 justify-between text-sm">
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              Based in Dhaka, Bangladesh
            </span>
            <a
              href="mailto:mamun.ahmed135255@gmail.com"
              className="group flex items-center gap-0 hover:gap-1 transition-all duration-300 font-medium text-zinc-800 dark:text-zinc-200 underline-offset-4 hover:underline"
            >
              mamun.ahmed13525@gmail.com
              <ArrowUpRight className="w-3.5! pt-1 group-hover:pt-0 duration-300 " />
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes menuItemEnter {
          from {
            opacity: 0;
            transform: translateX(2.5rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .menu-item-animate {
          opacity: 0;
          transform: translateX(2.5rem);
        }

        .menu-item-visible {
          animation: menuItemEnter 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .menu-sheet-panel {
          transform-origin: top center;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 1s ease;
        }

        .menu-sheet-panel-open {
          opacity: 1;
          transform: translateY(0);
        }

        .menu-sheet-panel-closed {
          opacity: 0;
          transform: translateY(-100%);
        }

        @media (min-width: 768px) {
          .menu-sheet-panel {
            transform-origin: center right;
          }

          .menu-sheet-panel-open {
            transform: translateX(0);
          }

          .menu-sheet-panel-closed {
            transform: translateX(100%);
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
