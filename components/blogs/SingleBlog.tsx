"use client";

import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectProps {
  id: number;
  image: {
    thumbnail: string;
    full_screen: string;
  };
  title: string;
  description: string;
  slug: string;
  live: {
    preview: string;
    git: string;
  };
  type: string[];
}
const SingleBlog = ({
  project,
  className = "",
  index = 0,
}: {
  project: ProjectProps;
  className?: string;
  index?: number;
}) => {
  const {
    title,
    description,
    image: { thumbnail },
    slug,
    live: { preview },
    type,
  } = project;
  return (
    <div
      className={cn(
        "bg-white rounded-4xl  relative  animate-fade-up animate-duration-500 pb-2",
        "flex flex-col h-full ",
        `animate-delay-${(index + 1) * 100}`,
        className
      )}
    >
      <Link
        href={preview}
        rel="noopener noreferrer"
        target="_blank"
        className={"w-full"}
      >
        <Card
          className={cn(
            "relative border-4 p-0 border-white shadow-2xl shadow-zinc-400/20 rounded-4xl min-h-[270px] h-auto w-full bg-[#f6f6f6] cursor-pointer hover:-translate-y-2 hover:scale-[101%] hover:shadow-zinc-400/40 duration-300 transition-all overflow-hidden"
          )}
        >
          <div
            className={cn("w-full bg-cover bg-center bg-no-repeat", "h-62")}
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
          ></div>
        </Card>
      </Link>
      <div
        className={cn(
          "flex flex-col justify-between gap-3",
          "flex-1 py-3 px-5"
        )}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-start gap-2">
            {type.map((typ: string) => (
              <div
                key={typ}
                className="bg-[#dbdbdb] uppercase border w-fit px-2 py-0 rounded-full text-[10px] font-medium"
              >
                {typ}
              </div>
            ))}
          </div>
          <Link
            href={preview}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full"
          >
            <h2 className={cn("bg-white py-3 w-fit ", "text-xl font-medium")}>
              {title}
            </h2>
          </Link>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
        <div className="gap-5">
          <Link
            href={preview}
            rel="noopener noreferrer"
            target="_blank"
            className="w-fit"
          >
            <Button
              className={cn(
                "flex-1 cursor-pointer w-36 rounded-full hover:bg-zinc-800 hover:text-white duration-300"
              )}
            >
              <ExternalLink />
              View Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
