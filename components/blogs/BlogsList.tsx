"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { projects } from "@/data/demo/projects";
import SingleBlog from "./SingleBlog";
import { BlogType } from "@/types/types";

const filterBtns = [
  {
    id: 1,
    name: "All Category's",
    type: "",
  },
  {
    id: 2,
    name: "Full Stack",
    type: "full-stack",
  },
  {
    id: 3,
    name: "Front End",
    type: "front-end",
  },
  {
    id: 4,
    name: "AI App",
    type: "ai",
  },
];

const BlogsList = () => {
  const [activeBtn, setActiveBtn] = useState("");
  const blogEntries = projects as BlogType[];
  const filteredProjects =
    activeBtn && activeBtn !== ""
      ? blogEntries.filter((p) => p.type && p.type.includes(activeBtn))
      : blogEntries;

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-2 bg-white rounded-3xl md:rounded-full py-2 px-2 w-fit">
        {filterBtns.map((btn: { id: number; name: string; type: string }) => {
          const { id, name, type } = btn;
          const active = activeBtn === type;
          return (
            <Button
              key={id}
              variant={active ? "default" : "outline"}
              className={cn(
                "rounded-full border-0 px-3 sm:px-6 shadow-zinc-100 cursor-pointer shrink-0",
                active
                  ? "font-medium"
                  : "font-normal hover:bg-white hover:shadow-zinc-200 hover:shadow-xl"
              )}
              onClick={() => setActiveBtn(type)}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {filteredProjects.map((project: BlogType, index: number) => {
          return (
            <SingleBlog key={project.id} project={project} index={index} />
          );
        })}
      </div>
    </div>
  );
};

export default BlogsList;
