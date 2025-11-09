import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { markdownFileToHtml } from "../../lib/markdown";

const WhatReadingDetails = () => {
  return (
    <div>
      <div className="mb-20">
        <Card
          className={
            "border-4 border-white shadow-2xl shadow-zinc-400/20 rounded-4xl min-h-[270px] h-auto w-full overflow-hidden mt-10 relative group p-6 flex justify-center items-center"
          }
        >
          <div className="absolute left-0 top-0 w-full h-full bg-black/30 duration-500 opacity-0 group-hover:opacity-100">
            <Link
              href={"/#"}
              rel="noopener noreferrer"
              target="_blank"
              className="h-42 w-42 flex items-center justify-center absolute top-1/2 left-1/2 -translate-1/2 rounded-full cursor-pointer duration-500 scale-90 group-hover:scale-120 text-sm gap-2 bg-[radial-gradient(circle,rgba(255,255,255,1)_65%,rgba(255,255,255,0.49)_68%)]"
              type="button"
            >
              <CreditCard className="w-4 h-4" />
              Buy Book
            </Link>
          </div>
          <Image
            className="h-96 w-fit shadow-xl shadow-black/20"
            src={
              "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/1024778_deep-work-book-by-cal-newport-premium-quality-_PABO8k6Fg.jpeg?updatedAt=1762589288733"
            }
            alt={"deep work book"}
            width={500}
            height={500}
          />
        </Card>
        <h1 className="text-4xl font-bold   mt-10">Deep Work</h1>
        <h1 className="text-xl font-bold mt-3 mb-2">
          Rules for focued success in a distracted workd
        </h1>
        <div className="flex items-center gap-2 mb-5">
          Writer:
          <div className="bg-[#dbdbdb] uppercase border w-fit px-3 py-1 rounded-full ">
            Cal Newport
          </div>
        </div>
       
        <div className="text-zinc-700 mt-10">
          {/* Render markdown contnt from data/demo/deepwork.md */}
          <div
            dangerouslySetInnerHTML={{
              __html: markdownFileToHtml("data/demo/deepwork.md"),
            }}
          />
        </div>
         <Link href={"/"} target="_blank" rel="noopener noreferrer">
          <Button className="flex-1 rounded-4xl cursor-pointer w-52 py-7 mt-10">
            <CreditCard />
            Buy This Book
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WhatReadingDetails;
