import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomeProjects = () => {
  return (
    <Link
      href={"/projects"}
      className="p-6 pt-20 pb-6 flex flex-col items-center h-full overflow-hidden"
    >
      <div className="relative w-full -space-x-6 mb-4 mt-5 ">
        <div className="absolute top-0 left-5 -rotate-45 -translate-x-1/2 translate-y-6 w-28 h-32 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-10 ">
          <Image
            src="https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/netflix-clone_TgDbP-00r.png?updatedAt=1762599897697"
            alt="cover1"
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-0 left-[30%] -rotate-12 -translate-x-1/2 w-28 h-32 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-20 ">
          <Image
            src="https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/fruits-e-commerce_SS17K5pM3.png?updatedAt=1762599897673"
            alt="cover1"
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-0 left-1/2  -translate-x-1/2 w-28 h-32 -translate-y-6 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-50">
          <Image
            src="https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/flowaistudio-1_MNqdrJgBP3.webp?updatedAt=1762756994858"
            alt="cover2"
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-0 right-[30%] rotate-12 translate-x-1/2  w-28 h-32 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-40 ">
          <Image
            src="https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/nexvioshort-1_P6Whb1owe.webp?updatedAt=1762758164846"
            alt="cover1"
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-0 right-5 rotate-45 translate-x-1/2 translate-y-6 w-28 h-32 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-30 ">
          <Image
            src="https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/portfolio_-4B21TasT.png?updatedAt=1762599897570"
            alt="cover1"
            fill
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0">
        <h3 className="text-lg font-bold">All Projects</h3>
        <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2 whitespace-nowrap">
          <Play className="w-4 h-4 text-sm text-amber-500" />
          Click to Open
        </p>
      </div>
      <div className="bg-transparent h-48 w-full"></div>
    </Link>
  );
};

export default HomeProjects;
