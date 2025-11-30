import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Techstacks } from "@/data/demo/stacks";
import SectionTitle from "./ui/section-title";

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
                className="block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Image
                  src={stack.icon}
                  alt={stack.name}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
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
