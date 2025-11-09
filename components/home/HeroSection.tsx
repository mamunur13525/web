"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import RippleEffect from "../ui/ripple-effect";
import CalBooker from "../contacts/CalAI";

const HeroSection = () => {
  return (
    <>
      <div className="mb-10 space-y-3">
        <h1 className="flex items-center gap-2 text-4xl font-bold tracking-wide font-stack">
          <span>Hi, I&rsquo;m</span>
          <Image
            src="https://media.licdn.com/dms/image/v2/D5603AQGCmkiyiJMlKw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1681583591352?e=2147483647&v=beta&t=asvcXjfWGNconjGn8DfiFJXjVNY18Uikd62VJnnBzT8"
            width={80}
            height={80}
            alt="profile"
            className="border-4  -rotate-6 border-white rounded-[20px] saturate-0 "
          />
          <span>Mamun Ahmed!</span>
        </h1>
        <h1 className="text-4xl font-bold tracking-wide font-stack">
          <span className="text-[#bdbdbd]">I&rsquo;m a</span> Full Stack
          Developer <span className="text-[#bdbdbd]">at</span>
        </h1>
        <div className="flex items-center gap-8 font-stack">
          <h1 className="text-4xl font-bold tracking-wide text-[#eb5d04]">
            W3Dev Com.
          </h1>
          <Button
            className="rounded-2xl cursor-pointer relative flex items-center gap-4 py-6 px-6 hover:bg-white shadow-none border border-zinc-200/70"
            variant={"outline"}
            type='button'
          >
            <RippleEffect />
            <span>Open to work</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CalBooker />
        <div>
          <p>Feel free to explore my portfolio and reach out </p>
          <p className="flex items-start pl-7 relative">
            <span className="font-serif font-bold absolute left-0 -top-1.5">
              ___
            </span>
            I&rsquo;d love to connect!
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
