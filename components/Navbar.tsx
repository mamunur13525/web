"use client";

import { useEffect, useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./logo";
import { Button } from "./ui/button";
import {
  CloudDownload,
  FolderOpenDot,
  ListMinus,
  MailPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";

const SCROLL_THRESHOLD = 50; // px

const Navbar = () => {
  const navigate = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  // useRef to guard rAF scheduling
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // prefer an explicit scroll container if present
    const explicit = document.getElementById("scroll-container");
    // fallback to document.scrollingElement (most browsers) or window
    const scrollingEl: (Window | Element) =
      explicit ?? document.scrollingElement ?? window;

    const getScrollY = () => {
      if (scrollingEl === window) return window.scrollY || 0;
      // Element
      return (scrollingEl as Element).scrollTop || 0;
    };

    const handleScroll = () => {
      console.log('hello scroll')
      // throttle with rAF
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        const y = getScrollY();
        const next = y > SCROLL_THRESHOLD;
        // debug - remove in production
        console.debug("scrollY:", y, "isScrolled:", next);
        setIsScrolled(next);
        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      });
    };

    // initial check (in case page loaded already scrolled)
    handleScroll();

    // add listener
    scrollingEl.addEventListener("scroll", handleScroll, { passive: true });

    // cleanup
    return () => {
      scrollingEl.removeEventListener("scroll", handleScroll as EventListener);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <header
      className={`fixed z-20 top-0 pt-10 pb-4 px-7 xl:px-0 left-1/2 -translate-x-1/2 flex items-start justify-between origin-center
        transition-all duration-300 ease-in-out bg-[#f8f8f8]
        ${isScrolled ? "max-w-3xl scale-95" : "max-w-6xl scale-100"}
        container mx-auto`}
    >
      <nav className="flex flex-col md:flex-row items-start md:items-end gap-1 md:gap-3 ">
        <Logo />
        <a
          href="mailto:mamun.ahmed135255@gmail.com"
          className="underline underline-offset-3 text-xs md:text-sm text-zinc-800 pb-1"
        >
          mamun.ahmed13525@gmail.com
        </a>
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          className="group items-center justify-start px-4 md:px-6 py-2 md:py-3 rounded-full cursor-pointer bg-[#000000] hidden md:flex duration-300 transition-all hover:w-46 w-10 relative"
          type="button"
        >
          <CloudDownload />
          <span className="absolute right-3.5 top-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full duration-300 transition-all pointer-events-none group-hover:pointer-events-auto">
            Download Resume
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="w-10 h-10 cursor-pointer rounded-full border"
              type="button"
            >
              <ListMinus />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 px-2 py-2 rounded-2xl shadow-none"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => navigate.push("/projects")}
              className="px-4 py-4 cursor-pointer flex items-center rounded-xl"
            >
              <FolderOpenDot />
              Projects
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate.push("/contact")}
              className="px-4 py-4 cursor-pointer flex items-center rounded-xl"
            >
              <MailPlus />
              Contact Us
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate.push("/projects")}
              className="px-4 py-4 cursor-pointer flex items-center rounded-full md:hidden"
            >
              <CloudDownload />
              Download Resume
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
