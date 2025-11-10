import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/demo/projects";
import SingleProject from "./SingleProject";
import ProjectViewDialog from "./ProjectViewDialog";

type ProjectType = {
  id: number;
  image: {
    thumbnail: string;
    full_screen: string;
  };
  title: string;
  description: string;
  slug: string;
  live: {
    preview: string;
    git: string;
  };
  type: string[];
};
const ProjectDetails = ({ project }: { project: ProjectType }) => {
  const {
    id,
    title,
    image: { thumbnail, full_screen },
    description,
    slug,
    type,
    live: { preview },
  } = project;
  return (
    <div>
      <div className="mb-20">
        <div className="bg-[#dbdbdb] uppercase border w-fit px-3 py-1 rounded-full ">
          {type[0]}
        </div>
        <h1 className="text-4xl font-bold mt-4 mb-4">{title}</h1>
        <p className="text-zinc-500">{description}</p>
        <Link href={preview} target="_blank" rel="noopener noreferrer">
          <Button className="flex-1 rounded-4xl cursor-pointer w-52 py-7 mt-5">
            <Eye />
            Live View
          </Button>
        </Link>
        <Card
          className={
            "border-4 p-0 border-white shadow-2xl shadow-zinc-400/20 rounded-4xl min-h-[270px] h-auto w-full overflow-hidden mt-10 relative group"
          }
        >
          <div className="absolute left-0 top-0 w-full h-full bg-black/30 duration-500 opacity-0 group-hover:opacity-100">
            <ProjectViewDialog fullImage={full_screen} slug={slug} />
          </div>
          <Image
            className="w-full"
            src={thumbnail}
            alt={slug}
            width={500}
            height={500}
          />
        </Card>
      </div>

      <div>
        <h1 className="text-4xl font-bold mt-8 mb-4">Recent Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {projects
            .filter((prj) => prj.id !== id)
            .slice(0, 3)
            .map((project: ProjectType) => {
              return <SingleProject key={project.id} project={project} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
