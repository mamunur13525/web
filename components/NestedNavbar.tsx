"use client";

import { ArrowBigLeft, StepBack } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NestedNavbar = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        size={"icon"}
        variant={"outline"}
        className="cursor-pointer rounded-2xl bg-transparent md:flex  duration-300 transition-all hover:w-21 w-10 px-2.5 relative flex justify-start items-center group hover:bg-zinc-800 hover:border-zinc-800"
        onClick={router.back}
      >
        <ArrowBigLeft className="group-hover:text-white"/>
        <span className="absolute right-3 top-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full duration-300 transition-all text-white">Back</span>
      </Button>
    </div>
  );
};

export default NestedNavbar;
