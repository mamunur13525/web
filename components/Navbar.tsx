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

const Navbar = () => {
  const navigate = useRouter();
  return (
    <header className="container max-w-6xl mx-auto fixed top-10 left-1/2 -translate-x-1/2 flex items-start justify-between md:px-0">
      <nav className="flex flex-col md:flex-row items-start md:items-end gap-1 md:gap-3 mb-6 md:mb-10">
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
