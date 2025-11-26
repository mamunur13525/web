"use client";

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
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 50; // px

const Navbar = () => {
  const navigate = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Check for scrollable section elements first (since that's the actual scroll container)
      const scrollableSection = document.querySelector('section[class*="overflow-y-auto"]');
      
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
    const scrollableSection = document.querySelector('section[class*="overflow-y-auto"]');
    
    // Listen to scroll events on the scrollable section (primary)
    if (scrollableSection) {
      scrollableSection.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Also listen to window scroll events as fallback
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollableSection) {
        scrollableSection.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (

    <header
      className={`fixed z-200 top-0  pb-4 px-7 xl:px-0 left-1/2 -translate-x-1/2  transition-all duration-500 ease-in-out ${isScrolled?'bg-[#747475]/10':'bg-transparent'}  backdrop-blur-lg w-full`}
    >
      <div className={`flex items-start justify-between origin-center transition-all duration-500 ease-in-out container mx-auto ${
        isScrolled ? 'max-w-6xl lg:px-6 pt-4 ' : 'pt-10 max-w-7xl'
      }
      `}>

      <nav className="flex items-end gap-1 md:gap-3 ">
        <Logo />
        <a
          href="mailto:mamun.ahmed135255@gmail.com"
          className="underline underline-offset-3 text-xs md:text-sm text-zinc-800 hover:text-orange-600 whitespace-nowrap flex-1 pb-2"
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
            className="w-56 px-2 py-2 rounded-2xl shadow-none z-300"
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
          </div>
    </header>
  );
};

export default Navbar;
