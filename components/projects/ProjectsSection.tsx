"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, FileBracesCorner, Github, Link2 } from "lucide-react";
import AccordionIcon from "../ui/accordion-icon";
import { projects } from "@/data/demo/projects";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SectionTitle from "../ui/section-title";
import FullscreenImage from "../ui/fullscreen-image";
import { Button } from "../ui/button";
import React from "react";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  const [visibleCount, setVisibleCount] = React.useState(5);
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <SectionTitle title="Projects">
      <div className="relative">
        {visibleProjects.map((project, index) => (
          <Accordion
            key={project.id}
            type="multiple"
            className="relative  w-full"
            defaultValue={[`project-8`]}
          >
            <AccordionItem value={`project-${project.id}`} className="">
              <AccordionTrigger
                className={cn(
                  "group hover:no-underline pr-4  rounded-none hover:bg-accent/50 py-6 px-2 flex items-center justify-between border border-t-transparent data-[state=open]:bg-white",
                  index === 0 ? "border-t-border" : ""
                )}
                icon={<AccordionIcon />}
              >
                <div className="rounded-lg  w-9 h-8 bg-white overflow-hidden border border-border">
                  {project.icon ? (
                    <Image
                      src={project.icon || ""}
                      alt={project.title}
                      width={36}
                      height={32}
                      className="w-full h-full"
                    />
                  ) : (
                    <span className="w-full h-full bg-white shadow-lg flex items-center justify-center">
                      <FileBracesCorner className="w-5 h-5 text-[#353537]" />
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start text-left w-full">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className="text-sm text-muted-foreground mt-1 font-normal">
                    {project.date}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  {project.live.preview && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={project.live.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.live.preview, "_blank");
                          }}
                        >
                          <Link2 className="-rotate-60 w-4 h-4 text-muted-foreground" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Live Preview</TooltipContent>
                    </Tooltip>
                  )}
                  {project.live.git && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={project.live.git}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.live.git, "_blank");
                          }}
                        >
                          <Github className="w-4 h-4 text-zinc-600" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Frontend</TooltipContent>
                    </Tooltip>
                  )}
                  {project.live.backend && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={project.live.backend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.live.backend, "_blank");
                          }}
                        >
                          <Github className="w-4 h-4 text-zinc-600" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Backend</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-6 px-8 border border-t-0 bg-white">
                <div className="space-y-4">
                  {/* Markdown Content */}
                  {project.content && (
                    <div className="prose prose-zinc max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-sm font-medium uppercase tracking-wider  mb-3 mt-6"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p
                              className=" leading-relaxed mb-4 text-[15px]"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="space-y-2 mb-4" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="flex items-start gap-2.5 text-[15px] ">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                              <span className="leading-relaxed" {...props} />
                            </li>
                          ),
                        }}
                      >
                        {project.content}
                      </ReactMarkdown>
                    </div>
                  )}

                  {project.image.thumbnail && (
                    <FullscreenImage
                      src={project.image.thumbnail}
                      alt={project.title}
                      className="object-cover border border-border shadow-lg hover:shadow-none"
                    />
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.type.map((type, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium border border-border"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        {visibleCount < projects.length && (
          <div
            className="absolute bottom-0 w-full h-24 flex items-end pb-8 justify-center mt-8"
            style={{
              background:
                "linear-gradient(180deg,rgba(248, 248, 248, 0) 0%, rgba(248, 248, 248, 1) 56%)",
            }}
          >
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="min-w-[120px] cursor-pointer"
            >
              Load More <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </SectionTitle>
  );
};

export default ProjectsSection;
