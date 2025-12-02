"use client";

import { ArrowBigLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NestedNavbar = ({ prevRoute = "" }: { prevRoute?: string }) => {
  const router = useRouter();
  const handleBack = () => {
    router.push(prevRoute || "/");
  };
  return (
    <div>
      <Button
        size={"icon"}
        variant={"outline"}
        className="cursor-pointer rounded-full bg-transparent md:flex  duration-300 transition-all hover:w-21 md:w-10 w-21 px-2.5 relative flex justify-start items-center group hover:bg-zinc-800 hover:border-zinc-800 "
        onClick={handleBack}
      >
        <ArrowBigLeft className="group-hover:text-white" />
        <span className="md:block absolute right-3 top-2 md:opacity-0 opacity-100 group-hover:opacity-100 group-hover:translate-x-0 translate-0 md:translate-x-full duration-300 transition-all md:text-white text-black group-hover:text-white dark:text-white">
          Back
        </span>
      </Button>
    </div>
  );
};

export default NestedNavbar;
