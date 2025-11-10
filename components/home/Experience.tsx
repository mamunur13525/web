import Link from "next/link";

const expericeList = [
  {
    id: 1,
    title: "Full Stack Developer at W3Dev",
    time: "2021 - 2025 - Remote - Full time",
  },
  {
    id: 2,
    title: "Full Stack Developer at W3Dev",
    time: "2020 - 2021 - Remote - Intern",
  },
  {
    id: 3,
    title: "Frontend Developer, Freelancing",
    time: "2019 - 2021 - Remote",
  },
];
const Experience = () => {
  return (
    <Link href={"/experience"} className="pt-20 lg:pt-24 pb-14 w-full h-full flex items-center px-5">
      <div className="h-full w-full  flex flex-col justify-between space-y-4 relative">
        <span className="absolute top-4 left-[5px] z-0 block w-0.5 min-h-9/12 translate-y-2.5 bg-[#ababab]"></span>
        {expericeList.map(
          (exp: { id: number; title: string; time: string }) => {
            return (
              <div
                key={exp.id}
                className="flex items-center gap-3 relative z-10"
              >
                <span className="w-3 h-3 bg-black rounded-full block"></span>
                <div className="flex flex-col gap-0">
                  <p className="text-[15px]">{exp.title}</p>
                  <p className="text-[13px] text-zinc-500">{exp.time}</p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </Link>
  );
};

export default Experience;
