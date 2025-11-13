/* eslint-disable @next/next/no-img-element */

import { BadgeCheck, Check, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

type Work = {
  id: number;
  title: string;
  roll: string;
  location: string;
  position: string;
  time: string;
  description: string;
  skills: string[];
};

type Company = {
  id: number;
  company: string;
  company_link: string;
  image: string;
  work: Work[];
};

const expericeList: Company[] = [
  {
    id: 1,
    company: "W3Dev: IT Services & Product Engineering",
    company_link: "https://w3dev.in",
    image:
      "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/w3dev-1_kKSbvNbR8.webp?updatedAt=1762666916361",
    work: [
      {
        id: 1,
        title: "Full Stack Developer at W3Dev",
        location: "Noida, Uttar pradesh, India",
        roll: "Full Stack Developer",
        position: "Full-time",
        time: "Dec 2020 - Nov 2025 . 5 Yrs",
        description: `I have contributed to lots of projects, both AI-driven and non-AI, focusing on building scalable, high-performing, and user-centric web applications. It was a great and knowledgeable experience, working with some amazing people and learning a lot along the way.

AI Projects

Flow.ai – Worked on both frontend and backend to develop an AI-powered document processing and workflow automation system. Designed for professionals who think in systems, Flow.ai enables teams to create structured, scalable workflows with speed, control, and real-time collaboration.

FormGrid – Handled both frontend and backend development for an intelligent form system that helps businesses gain up to 3.5× more data from their forms. Similar to Typeform, FormGrid delivers engaging forms, surveys, and quizzes that increase response rates and provide actionable insights.

Zyber.ai, Landbot.ai, Chat.ai – Contributed to the development of conversational and automation tools, improving AI interaction flows, frontend architecture, and overall system performance.


Non-AI Projects

Scrapuncle – Contributed to frontend development for a digital platform that enables users to dispose of recyclables (Kabaad) responsibly and rewardingly. Focused on creating a clean UI and smooth user experience to encourage sustainable recycling practices.

It was a great and knowledgeable experience, working alongside some amazing people who made collaboration and learning truly enjoyable.`,
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
      },
      {
        id: 2,
        title: "Full Stack Developer at W3Dev",
        location: "Noida, Uttar pradesh, India",
        roll: "Full Stack Developer Intern",
        position: "InternShip",
        time: "Dec 2020 - Jun 2021 . 6 Month",
        description:
          "Worked on frontend features and UI using React, Ionic, Tailwind and modern CSS. Collaborated with backend on APIs.",
        skills: [
          "React",
          "CSS",
          "Ionic",
          "Tailwind CSS",
          "MongoDB",
          "Express",
          "Zustand",
        ],
      },
    ],
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/freelancing_ekWCWgG0V.webp?updatedAt=1762666810686",
    company_link: "#",
    company: "Freelancing & Outsourcing",
    work: [
      {
        id: 1,
        title: "Full Stack Developer at W3Dev",
        location: "Noida, Uttar pradesh, India",
        roll: "Frontend Developer",
        position: "Full-time",
        time: "Dec 2021 - Nov 2022 . 1 Yrs",
        description: `in this time we only work as frontend devleoper. i have complete multiple projects. using react, css, tailwind, react router, redux, etc

`,
        skills: [
          "React JS",
          "CSS",
          "SCSS",
          "Tailwind CSS",
          "React useform",
          "React Router",
          "Redux",
        ],
      },
    ],
  },
];

const WorkExperiences = () => {
  return (
    <section className="py-6">
      <div className="flex flex-col gap-16">
        {expericeList.map((company) => (
          <div key={company.id} className="relative">
            <div className="flex flex-col items-start">
              {/* left column: company icon + backbone line */}
              <div className="relative z-20 flex items-center gap-3">
                <Link
                  href={company.company_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-14 h-14 rounded-full bg-white border flex items-center justify-center duration-200 hover:shadow-lg shadow-black/20">
                    {company.image ? (
                      // keep simple img to avoid external loader config
                      <img
                        src={company.image}
                        alt={company.company ?? "company"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100" />
                    )}
                  </div>
                </Link>
                <Link
                  href={company.company_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <h5 className="text-xl font-semibold">{company.company}</h5>
                </Link>
              </div>

              {/* right column: roles */}
              <div className="pl-4.5 flex-1 flex items-stretch relative">
                {company.work?.length > 1 && (
                  <span className="w-[3px] bg-[#e4e4e6] absolute left-4.5 translate-x-[5px] h-[84%] md:h-[82%]"></span>
                )}
                <div className="pt-5 flex flex-col gap-20">
                  {company.work?.map((w: Work, idx: number) => {
                    return (
                      <div key={idx} className="relative pl-2">
                        <svg
                          className="absolute z-10 -top-14 left-[5px]"
                          width="30"
                          height="76"
                        >
                          <path
                            d="M 1 0 L 1 48 Q 1 72, 25 72 L 48 72"
                            stroke="#e4e4e6"
                            strokeWidth="3"
                            fill="none"
                          />
                        </svg>

                        {/* vertical small line connecting entries */}
                        <div className={`pl-9 ml-1`}>
                          <div className="flex items-center gap-3 first:pt-0 pt-10 ">
                            <h3 className="text-lg font-bold">
                              {w.roll ?? w.title}
                            </h3>
                            <BadgeCheck className="w-6 h-6 text-white  fill-green-500" />
                            <Star className="w-5 h-5 fill-[#ea8434] text-transparent" />
                          </div>

                          {w.time && (
                            <p className="text-base text-zinc-600 mt-1">
                              <span className="font-semibold">{w.time}</span>
                              <br />
                              {w.location ? `${w.location}` : ""}
                              <span className="text-green-700 font-semibold">
                                {w.position ? ` • ${w.position}` : ""}
                              </span>
                            </p>
                          )}

                          {w.description && (
                            <p className="text-base text-zinc-600 mt-3 whitespace-pre-line">
                              {w.description}
                            </p>
                          )}

                          {w.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {w.skills.slice(0, 12).map((s) => (
                                <span
                                  key={s}
                                  className="text-sm bg-gray-200 text-zinc-700 px-3 py-1 rounded-2xl"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperiences;
