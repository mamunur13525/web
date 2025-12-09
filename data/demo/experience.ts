import { ExperienceGroup } from "@/types/types";

const experienceData: ExperienceGroup[] = [
  {
    id: "work-1",
    organization: "W3Dev: IT Services & Product Engineering",
    logo: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/w3dev-1_kKSbvNbR8.webp?updatedAt=1762666916361",
    list: [
      {
        id: "work-1",
        title: "Full Stack Developer",
        organization: "W3Dev: IT Services & Product Engineering",
        period: "Dec 2020 - Nov 2025 . 5 Years",
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
    ],
  },
  {
    id: "freelance-1",
    organization: "Freelance",
    logo: "",
    list: [
      {
        id: "freelance-1",
        title: "Front End Developer",
        organization: "Freelance",
        period: "08.2021 - 2022",
        description: [
          {
            text: "Developed responsive frontend features using React and Ionic, contributing to the timely release of product updates.",
          },
          {
            text: "Collaborated with backend teams to integrate APIs, ensuring seamless data flow and application stability.",
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
          "React",
          "CSS", 
          "Tailwind CSS",
          "Zustand",
        ],
        type: "freelance",
      },
    ],
  },
  {
    id: "edu-2",
    organization: "Education",
    logo: "",
    list: [
      {
        id: "edu-2",
        title: "Khan Bahadur Ahsanullah University",
        organization: "Khan Bahadur Ahsanullah University",
        period: "2016 - 2022",
        description: [
          {
            text: "Completed a Bachelor's degree in Information Systems.",
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
    ],
  },
];

export default experienceData;
