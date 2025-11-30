"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GraduationCap, Briefcase } from "lucide-react";
import AccordionIcon from "../ui/accordion-icon";
import SectionTitle from "../ui/section-title";
import { DescriptionItem } from "@/types/types";
import experienceData from "@/data/demo/experience";

const DescriptionList = ({ items }: { items: DescriptionItem[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <ul className="space-y-2 mb-4  text-zinc-800">
      {items.map((item, index) => (
        <li key={index}>
          <div className="flex items-start gap-2">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
            <span>{item.text}</span>
          </div>
          {item.subItems && (
            <div className="ml-4 mt-2">
              <DescriptionList items={item.subItems} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const ExperienceSection = () => {
  return (
    <SectionTitle title="Experience & Education">
      <div className="space-y-12">
        {experienceData.map((orgGroup) => (
          <div key={orgGroup.id}>
            <h2 className="text-lg font-medium mb-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-border" />
              {orgGroup.organization}
            </h2>

            <div className="relative border-l border-border ml-4">
              <Accordion
                type="multiple"
                className="w-full space-y-6"
                defaultValue={["work-1"]}
              >
                {orgGroup.list.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="relative border-none pl-5"
                  >
                    <div className="absolute -left-[15px] top-2 bg-[#f4f4f5] p-1.5 rounded-full border border-border shadow">
                      {item.type === "experience" ? (
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>

                    <AccordionTrigger
                      className="group hover:no-underline pr-4 hover:bg-zinc-200/30 py-2 px-2 rounded-lg"
                      icon={<AccordionIcon />}
                    >
                      <div className="flex flex-col items-start text-left w-full">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <span className="text-sm text-muted-foreground mt-1 font-normal">
                          {item.period}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-4 pb-6">
                      <DescriptionList items={item.description} />

                      {item.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-0.5 rounded-full bg-secondary text-zinc-700 text-xs font-medium border border-border"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </SectionTitle>
  );
};

export default ExperienceSection;
