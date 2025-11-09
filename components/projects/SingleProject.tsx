import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Eye, Link as IconLink } from "lucide-react";
import Link from "next/link";

interface ProjectProps {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  slug: string;
  live: string;
  type: string[];
}
const SingleProject = ({
  project,
  className = "",
}: {
  project: ProjectProps;
  className?: string;
}) => {
  const { title, description, thumbnail, slug, live, type } = project;
  return (
    <div
      className={cn(
        "bg-white rounded-2xl h-full relative flex flex-col",
        className
      )}
    >
      <Card
        className={cn(
          "relative border-4 p-0 border-white shadow-2xl shadow-zinc-400/20 rounded-4xl min-h-[270px] h-auto  w-full bg-[#f6f6f6] cursor-pointer hover:-translate-y-2 hover:scale-[101%] hover:shadow-zinc-400/40 duration-300 transition-all overflow-hidden"
        )}
      >
        <div
          className="w-full h-72 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        ></div>
      </Card>
      <div className="flex flex-col justify-between flex-1 py-3 px-5 gap-7">
        <div className="flex-1">
          <div className="bg-[#dbdbdb] uppercase border w-fit px-3 py-1 rounded-full ">
            {type[0]}
          </div>
          <h2 className="bg-white py-3 w-fit rounded-2xl text-xl font-medium">
            {title}
          </h2>
          <p className="text-zinc-500">{description}</p>
        </div>
        <div className="flex justify-center gap-5">
          <Link href={`/projects/${slug}`} className="w-full">
            <Button className="flex-1 rounded-2xl cursor-pointer w-full">
              <IconLink /> View Details
            </Button>
          </Link>
          <Link href={live} className="w-full">
            <Button
              className="flex-1 rounded-2xl cursor-pointer w-full"
              variant={"outline"}
            >
              <Eye />
              Live View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
