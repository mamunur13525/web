"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SingleProject from "./SingleProject";
import { projects } from "@/data/demo/projects";

const filterBtns = [
  {
    id: 1,
    name: "All",
    type: "",
  },
  {
    id: 2,
    name: "Full Stack",
    type: "full_stack",
  },
];

type ProjectType = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  slug: string;
  live: string;
  type: string[];
};
const ProjectsList = () => {
  const [activeBtn, setActiveBtn] = useState("");
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-2 bg-white rounded-2xl py-2 px-2 w-fit">
        {filterBtns.map((btn: { id: number; name: string; type: string }) => {
          const { id, name, type } = btn;
          const active = activeBtn === type;
          return (
            <Button
              key={id}
              variant={active ? "default" : "outline"}
              className={cn(
                "rounded-[14px] border-0 px-3 sm:px-6 shadow-zinc-100 cursor-pointer shrink-0",
                active
                  ? ""
                  : "hover:bg-white hover:shadow-zinc-200 hover:shadow-xl"
              )}
              onClick={() => setActiveBtn(type)}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        {projects.map((project: ProjectType) => {
          return (
            <SingleProject
              key={project.id}
              project={project}
              className="last:lg:col-span-2"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsList;
