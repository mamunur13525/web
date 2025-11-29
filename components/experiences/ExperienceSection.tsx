"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GraduationCap, Briefcase } from "lucide-react";
import AccordionIcon from "../ui/accordion-icon";

interface DescriptionItem {
  text: string;
  subItems?: DescriptionItem[];
}

interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: DescriptionItem[];
  skills: string[];
  type: "education" | "experience";
}

const experienceData: ExperienceItem[] = [
  {
    id: "work-1",
    title: "Full Stack Developer",
    organization: "W3Dev: IT Services & Product Engineering",
    period: "Dec 2020 - Nov 2025 . 5 Yrs",
    description: [
      {
        text: "Developed AI-powered document processing (Flow.ai), enabling professionals to automate complex workflows with speed and precision.",
      },
      {
        text: "Built intelligent form systems (FormGrid) that increased client data collection by 3.5x, delivering actionable business insights.",
      },
      {
        text: "Enhanced conversational AI tools (Zyber.ai, Landbot.ai), significantly improving user interaction flows and system performance.",
      },
      {
        text: "Created user-centric digital platforms (Scrapuncle) that drove engagement in sustainable recycling practices.",
      },
      {
        text: "Delivered scalable, high-performing web applications that directly contributed to client success and user satisfaction.",
      },
    ],
    skills: [
      "Full-Stack Development",
      "React JS",
      "Express JS",
      "PostgreSQL",
      "AI",
      "User Experience (UX)",
      "Tailwind CSS",
      "Zustand",
      "MongoDB",
      "Prompt Engineering",
      "Three JS",
      "Angular JS",
      "Vue JS",
      "Hono JS",
    ],
    type: "experience",
  },
  {
    id: "work-2",
    title: "Full Stack Developer Intern",
    organization: "W3Dev: IT Services & Product Engineering",
    period: "Dec 2020 - Jun 2021 . 6 Month",
    description: [
      {
        text: "Developed responsive frontend features using React and Ionic, contributing to the timely release of product updates.",
      },
      {
        text: "Collaborated with backend teams to integrate APIs, ensuring seamless data flow and application stability.",
      },
      {
        text: "Implemented modern UI/UX best practices, enhancing the overall quality and consistency of the application.",
      },
    ],
    skills: [
      "React",
      "CSS",
      "Ionic",
      "Tailwind CSS",
      "MongoDB",
      "Express",
      "Zustand",
    ],
    type: "experience",
  },
  {
    id: "edu-1",
    title: "University of Science",
    organization: "VNUHCM",
    period: "08.2018—2026",
    description: [
      {
        text: "Currently studying for a Bachelor's degree in Information Systems.",
      },
      {
        text: "Language Proficiency: B1 English Level.",
      },
      {
        text: "Achieved several awards, including:",
        subItems: [
          {
            text: "Bronze Medal — 10th Design, Manufacturing, and Application Award 2022",
          },
          {
            text: "2nd Prize — Business Startup Competition 2019",
          },
        ],
      },
    ],
    skills: [
      "C++",
      "Java",
      "Python",
      "Data Structures",
      "Algorithms",
      "Advanced Databases",
      "Systems Design",
      "Distributed Systems",
      "Software Engineering",
      "Self-learning",
      "Teamwork",
      "Presentation",
    ],
    type: "education",
  },
];

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
    <section className="py-12 md:py-16">
      <h1 className="flex flex-col md:flex-row items-start md:items-center gap-2 text-3xl md:text-4xl font-bold tracking-wide font-stack mb-8">
        Experience & Education
      </h1>

      <div className="space-y-12">
        {/* Work Experience Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-border" /> Work Experience
          </h2>
          <div className="relative border-l border-border ml-4 space-y-8">
            {experienceData
              .filter((item) => item.type === "experience")
              .map((item) => (
                <div key={item.id} className="relative pl-8 md:pl-10">
                  <div className="absolute -left-[15px] top-0 bg-background p-1.5 rounded-full border border-border">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue={item.id === "work-1" ? "work-1" : undefined}
                  >
                    <AccordionItem value={item.id} className="border-none">
                      <AccordionTrigger
                        className="group hover:no-underline pr-4 hover:bg-zinc-200/30 py-2 px-2"
                        icon={<AccordionIcon />}
                      >
                        <div className="flex flex-col items-start text-left w-full">
                          <h3 className="text-lg font-semibold">
                            {item.title}{" "}
                            {item.organization && `— ${item.organization}`}
                          </h3>
                          <span className="text-sm text-muted-foreground mt-1 font-normal">
                            {item.period}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
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
                  </Accordion>
                </div>
              ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-border" /> Education
          </h2>
          <div className="relative border-l border-border ml-4 space-y-8">
            {experienceData
              .filter((item) => item.type === "education")
              .map((item) => (
                <div key={item.id} className="relative pl-8 md:pl-10">
                  <div className="absolute -left-[15px] top-0 bg-background p-1.5 rounded-full border border-border">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue={item.id === "edu-1" ? "edu-1" : undefined}
                  >
                    <AccordionItem value={item.id} className="border-none">
                      <AccordionTrigger
                        className="group hover:no-underline pr-4 hover:bg-zinc-200/30 py-2 px-2"
                        icon={<AccordionIcon />}
                      >
                        <div className="flex flex-col items-start text-left w-full">
                          <h3 className="text-lg font-semibold">
                            {item.title}{" "}
                            {item.organization && `— ${item.organization}`}
                          </h3>
                          <span className="text-sm text-muted-foreground mt-1 font-normal">
                            {item.period}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <DescriptionList items={item.description} />

                        {item.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-0.5 rounded-full bg-secondary text-zinc-800 text-xs font-medium border border-border"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
