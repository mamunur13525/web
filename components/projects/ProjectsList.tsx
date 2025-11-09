"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SingleProject from "./SingleProject";

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

const projects = [
  {
    id: 1,
    thumbnail:
      "https://visionic.agency/wp-content/uploads/2025/11/fontora-tham-1536x1152.webp",
    title: "Fontora Icons- 5000+ Open Source icon Library",
    description:
      "FontoraIcons is a large library of over 5000 open-source vector icons designed for designers and developers. It offers a wide variety of styles and formats (SVG, EPS, PSD, etc.) and aims to be a comprehensive resource for icon needs.",
    slug: "",
    links: {
      git: "https://visionic.agency/visionic-product/fontora-icons-5000-open-source-icon-library/",
      live: "https://www.figma.com/design/wDDxYdqO0ZikkUC6dXUOxZ/Fontora-Icons---Prev?node-id=32-5726&t=En0rmcefPmQPB1YO-1",
    },
    type: ["full_stack", "web_app"],
  },
  {
    id: 2,
    thumbnail:
      "https://visionic.agency/wp-content/uploads/2025/09/splito_branding_3-1536x1152.webp",
    title: "Splitto – Share Expenses, Made Simple",
    description:
      "Keep track of group expenses without the hassle. Splitto helps you record costs, divide them fairly among friends, and stay clear on who owes what. No payments, just simple tracking to keep everyone on the same page.",
    slug: "",
    links: {
      git: "https://visionic.agency/visionic-product/fontora-icons-5000-open-source-icon-library/",
      live: "https://www.figma.com/design/wDDxYdqO0ZikkUC6dXUOxZ/Fontora-Icons---Prev?node-id=32-5726&t=En0rmcefPmQPB1YO-1",
    },
    type: ["full_stack", "web_app"],
  },
  {
    id: 3,
    thumbnail:
      "https://visionic.agency/wp-content/uploads/2025/09/Talash-ai-heroo-1536x1152.webp",
    title: "Talash Ai – Solution of Missing Child",
    description:
      "Keep track of group expenses without the hassle. Splitto helps you record costs, divide them fairly among friends, and stay clear on who owes what. No payments, just simple tracking to keep everyone on the same page.",
    slug: "",
    links: {
      git: "https://visionic.agency/visionic-product/fontora-icons-5000-open-source-icon-library/",
      live: "https://www.figma.com/design/wDDxYdqO0ZikkUC6dXUOxZ/Fontora-Icons---Prev?node-id=32-5726&t=En0rmcefPmQPB1YO-1",
    },
    type: ["full_stack", "web_app"],
  },
];

type ProjectType = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  slug: string;
  links: {
    git: string;
    live: string;
  };
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
          return <SingleProject key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
};

export default ProjectsList;
