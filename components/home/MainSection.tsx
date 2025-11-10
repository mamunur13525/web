"use client";

import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import RenderComponent from "./RenderComponent";

const cardlists = [
  {
    type: "experience",
    title: "My Experience",
  },
  {
    type: "projects",
    title: "My Projects",
  },
  {
    type: "reading",
    title: "What I'm reading",
  },
  {
    type: "map",
    title: "Map",
  },
  {
    type: "how_work",
    title: "How i work",
  },
];

const MainSection = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 py-10 md:py-20">
      {cardlists.map((card: { type: string; title: string }) => {
        const { type, title } = card;
        return (
          <Card
            key={type}
            className={cn(
              "relative border-4 p-0 border-white shadow-2xl shadow-zinc-400/20 rounded-4xl min-h-[270px] h-auto  w-full bg-[#f6f6f6] cursor-pointer hover:-translate-y-2 hover:scale-105 hover:shadow-zinc-400/40 duration-300 transition-all overflow-hidden",
              type === "how_work" ? "sm:col-span-2" : ""
            )}
          >
            <div className="absolute left-3 top-4">
              <span className="bg-white px-4 py-3 w-fit rounded-2xl text-xs font-medium">
                {title}
              </span>
            </div>
            <RenderComponent type={type} />
          </Card>
        );
      })}
    </section>
  );
};

export default MainSection;
