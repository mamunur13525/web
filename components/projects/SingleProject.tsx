"use client";

import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Eye, Link as IconLink } from "lucide-react";
import Link from "next/link";
import React from "react";

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
const SingleProject = ({
  project,
  className = "",
  index = 0,
  view = "column",
}: {
  project: ProjectProps;
  className?: string;
  index?: number;
  view?: string;
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
        "bg-white rounded-4xl  relative  animate-fade-up animate-duration-500",
        view === "row"
          ? "flex items-center  flex-row h-fit"
          : "flex flex-col h-full  border",
        `animate-delay-${(index + 1) * 100}`,
        className
      )}
    >
      <Link
        href={`/projects/${slug}`}
        className={view === "row" ? "w-6/12 " : "w-full"}
      >
        <Card
          className={cn(
            "relative border-4 p-0 border-white shadow-2xl shadow-zinc-400/20 rounded-4xl min-h-[270px] h-auto w-full bg-[#f6f6f6] cursor-pointer hover:-translate-y-2 hover:scale-[101%] hover:shadow-zinc-400/40 duration-300 transition-all overflow-hidden"
          )}
        >
          <div
            className={cn(
              "w-full bg-cover bg-center bg-no-repeat",
              view === "column" ? "h-72" : "h-112"
            )}
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
          ></div>
        </Card>
      </Link>
      <div
        className={cn(
          "flex flex-col justify-between gap-7",
          view === "row" ? "w-6/12 py-3 px-10" : "flex-1 py-3 px-5"
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
          <h2
            className={cn(
              "bg-white py-3 w-fit ",
              view === "row" ? "text-3xl font-bold" : "text-xl font-medium"
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              " text-zinc-500",
              view === "row" ? "" : "text-zinc-500"
            )}
          >
            {description}
          </p>
          <div>
            <p className="mt-3 text-sm font-medium text-zinc-800">
              Technology Use:{" "}
            </p>
            <div className="flex flex-wrap items-center justify-start gap-2">
              {type.map((typ: string, index: number) => (
                <React.Fragment key={typ}>
                  {index !== 0 && "|"}
                  <div
                    key={typ}
                    className="bg-[#dbdbdb] uppercase border w-fit px-2 py-0 rounded-full text-[10px] font-medium"
                  >
                    {typ}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex justify-center gap-5 pb-2",
            view === "row" ? "pt-4" : ""
          )}
        >
          <Link href={`/projects/${slug}`} className="w-full">
            <Button
              variant={"outline"}
              className={cn(
                "flex-1  cursor-pointer w-full rounded-full",
                view === "row" ? "py-5" : ""
              )}
            >
              <Eye /> View Details
            </Button>
          </Link>
          <Link
            href={preview}
            rel="noopener noreferrer"
            target="_blank"
            className="w-full"
          >
            <Button
              className={cn(
                "flex-1  cursor-pointer w-full rounded-full",
                view === "row" ? "py-5" : ""
              )}
            >
              <IconLink />
              Live View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
