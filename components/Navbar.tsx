import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./logo";
import { Button } from "./ui/button";
import { CloudDownload, ListMinus } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-end gap-3 mb-10">
        <Logo />
        <a
          href="mailto:mamun.ahmed135255@gmail.com"
          className="underline underline-offset-3 text-sm text-zinc-800 pb-1"
        >
          mamun.ahmed13525@gmail.com
        </a>
      </nav>
      <Button className="group items-center justify-start px-6 py-3 rounded-2xl cursor-pointer bg-[#000000] hidden md:flex  duration-300 transition-all hover:w-46 w-10 relative">
        <CloudDownload />
        <span className="absolute right-2.5 top-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full duration-300 transition-all">Download Resume</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"icon"}
            variant={"outline"}
            className="border-none cursor-pointer rounded-2xl md:hidden"
          >
            <ListMinus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 px-4 py-8 space-y-2 rounded-4xl" align="end">
            <DropdownMenuItem className="px-4 py-4 cursor-pointer flex items-center rounded-2xl">
              <CloudDownload />
              Download Resume
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-4 cursor-pointer flex items-center rounded-2xl">
              <CloudDownload />
              Download Resume
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-4 cursor-pointer flex items-center rounded-2xl">
              <CloudDownload />
              Download Resume
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Navbar;
