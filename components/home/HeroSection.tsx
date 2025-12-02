"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import RippleEffect from "../ui/ripple-effect";
import CalBooker from "../contacts/CalAI";

const HeroSection = () => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between pr-10">
        <div className="mb-8 space-y-6 md:px-0">
          <h1 className="flex flex-col md:flex-row items-start md:items-center gap-2 text-4xl md:text-5xl font-bold tracking-wide font-stack">
            <span>Hi, I&rsquo;m</span>
            <div className="flex items-center gap-2">
              <Image
                src="https://media.licdn.com/dms/image/v2/D5603AQGCmkiyiJMlKw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1681583591352?e=2147483647&v=beta&t=asvcXjfWGNconjGn8DfiFJXjVNY18Uikd62VJnnBzT8"
                width={80}
                height={80}
                alt="profile"
                className="border-4 -rotate-6 border-white rounded-[20px] saturate-0 w-16 md:w-20 h-auto"
              />
              <span>Mamun Ahmed!</span>
            </div>
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide font-stack">
            <span className="text-muted-foreground">I&rsquo;m a</span>{" "}
            <span className="text-4xl md:text-5xl px-2 rounded-lg">
              Full Stack
            </span>{" "}
            Developer <span className="text-muted-foreground">at</span>
          </h1>
          <div className="flex items-start md:items-center gap-4 md:gap-8 font-stack">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-orange-600 dark:text-orange-500">
              W3Dev Com.
            </h1>
            <Button
              className="rounded-full relative flex items-center gap-4 py-5 md:py-6 px-5 md:px-6 border border-zinc-200/70 shadow-none inset-shadow-2xs light:inset-shadow-white active:scale-100 cursor-default hover:bg-white"
              variant={"outline"}
              type="button"
            >
              <RippleEffect />
              <span>Open to work</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:px-0">
        <CalBooker />
        <div className="mt-4 md:mt-0">
          <p>Feel free to explore my portfolio and reach out </p>
          <p className="flex items-start pl-7 relative">
            <span className="font-serif font-bold absolute left-0 -top-1.5">
              ___
            </span>
            I&rsquo;d love to connect!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
