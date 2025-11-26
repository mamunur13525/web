"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SingleProject from "./SingleProject";
import { projects } from "@/data/demo/projects";
import { ProjectType } from "@/types/types";

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


const ProjectsList = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => setIsDesktop(mq.matches);
    // run once to set initial value on the client
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const [activeBtn, setActiveBtn] = useState("");
  const filteredProjects =
    activeBtn && activeBtn !== ""
      ? projects.filter((p) => p.type && p.type.includes(activeBtn))
      : projects;
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
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-1 lg:gap-10 mt-10"
        )}
      >
        {filteredProjects.map((project: ProjectType, index: number) => {
          return (
            <SingleProject
              key={project.id}
              project={project}
              index={index}
              view={isDesktop ? "row" : "column"}
              className={isDesktop && index % 2 === 1 ? "flex-row-reverse" : "last:md:col-span-2 last:lg:col-span-1"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsList;
