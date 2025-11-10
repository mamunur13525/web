import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomeBlogs = () => {
  return (
    <Link
      href={"/blogs"}
      className="p-6 pt-16 pb-10 flex flex-col items-center h-full overflow-hidden"
    >
      <div className="relative w-full -space-x-6 mb-4 mt-5 ">
        <div className="absolute top-0 left-10 -rotate-30 -translate-x-1/2 translate-y-6 w-40 h-44 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-10 ">
          <Image
            src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*vUT10lz3VA0BnxFwQcEeaQ.jpeg"
            alt="cover1"
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-0 left-[30%] -rotate-12 -translate-x-1/2 w-40 h-44 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-20 ">
          <Image
            src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*pL5QfoCEQUcQTrNetmmuFQ.png"
            alt="cover1"
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-0 left-1/2  -translate-x-1/2 w-40 h-44 -translate-y-6 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-50">
          <Image
            src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*OnUXHIQ74pc7aTEUxfKaUg.png"
            alt="cover2"
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-0 right-[30%] rotate-12 translate-x-1/2  w-40 h-44 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-40 ">
          <Image
            src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*2g_LYWtFABZePFiPfwAvpg.png"
            alt="cover1"
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-0 right-5 rotate-45 translate-x-1/2 translate-y-6 w-40 h-44 rounded-4xl overflow-hidden border-4 border-white shadow-xl z-30 ">
          <Image
            src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*N0RBkfRx1sncmNxS"
            alt="cover1"
            fill
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0">
        <h3 className="text-lg font-bold">All Blogs</h3>
        <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2 whitespace-nowrap">
          <Link2 className="w-4 h-4 text-sm text-amber-500" />
          Click to Open
        </p>
      </div>
      <div className="bg-transparent h-48 w-full"></div>
    </Link>
  );
};

export default HomeBlogs;
