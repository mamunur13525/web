import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Techstacks } from "@/data/demo/stacks";
import SectionTitle from "./ui/section-title";
import { cn } from "@/lib/utils";

const StackSection = () => {
  return (
    <SectionTitle title="Stack">
      <div className="flex flex-wrap gap-4">
        {Techstacks.map((stack) => (
          <Tooltip key={stack.name}>
            <TooltipTrigger>
              <Link
                href={stack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Image
                  src={stack.icon}
                  alt={stack.name}
                  width={40}
                  height={40}
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10",
                    [
                      "react router",
                      "tanstack",
                      "shadcn/ui",
                      "radix ui",
                      "next.js",
                      "chatgpt",
                    ].includes(stack?.name?.toLowerCase() || "")
                      ? "dark:invert"
                      : ""
                  )}
                />
                <span className="text-xs sm:hidden">{stack.name}</span>
              </Link>
            </TooltipTrigger>

            {/* Tooltip */}
            <TooltipContent>{stack.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </SectionTitle>
  );
};

export default StackSection;
