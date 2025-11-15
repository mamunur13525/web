"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const HowWorks = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  return (
    <div className="pt-20 pb-6 relative px-5 flex flex-col justify-end gap-7 h-full ">
      <div className="space-y-2 px-2">
        <h1 className="text-xl font-semibold">01 Discovery Call</h1>
        <p className="text-zinc-500 text-sm">
          In this first statge, we&rsquo;ll have a Discovery Call to discuss
          your goals, needs, and project requirements. This helps us align our
          vision and set the foundation for a successful collaboration.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4  gap-y-4 gap-x-2 bg-white rounded-3xl md:rounded-full py-2 px-2">
        {[1, 2, 3, 4].map((btn: number) => {
          return (
            <Button
              key={btn}
              variant={activeBtn === btn ? "default" : "outline"}
              className={cn(
                "w-full rounded-full border px-3 sm:px-6 shadow-zinc-100 cursor-pointer shrink-0",
                activeBtn === btn
                  ? "border-black"
                  : "border-transparent hover:bg-white hover:border-zinc-200 hover:shadow-lg"
              )}
              onClick={() => setActiveBtn(btn)}
            >
              Step 0{btn}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default HowWorks;
