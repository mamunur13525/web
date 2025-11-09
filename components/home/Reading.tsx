import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

const Reading = () => {
  return (
    <Link
      href={"/reading"}
      className="bottom-0 p-5 pb-0 pt-20 overflow-hidden"
    >
      <h1 className=" md:pt-0 text-base font-semibold leading-5">
        Rules for focued success in a distracted workd
      </h1>
      <p className="text-zinc-500 text-xs font-medium mb-4">Cal Newport</p>
      <Card className="relative border-4  p-0 pt-7 border-white shadow-2xl shadow-zinc-400/20 rounded-tl-4xl rounded-tr-4xl rounded-b-none bg-[#e9e8ed] border-b-0 flex items-center justify-center w-full">
        <Image
          src="https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/1024778_deep-work-book-by-cal-newport-premium-quality-_PABO8k6Fg.jpeg?updatedAt=1762589288733"
          alt="book"
          width={100}
          height={100}
          className="shadow-xl border"
        />
      </Card>
    </Link>
  );
};

export default Reading;
