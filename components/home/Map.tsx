import Link from "next/link";
import React from "react";

const Map = () => {
  return (
    <Link
      href="https://www.google.com/maps/place/Bangladesh/@23.4270773,85.0428532,6z/data=!3m1!4b1!4m15!1m8!3m7!1s0x3755b8b087026b81:0x8fa563bbdd5904c2!2sDhaka!3b1!8m2!3d23.804093!4d90.4152376!16zL20vMGZuYjQ!3m5!1s0x30adaaed80e18ba7:0xf2d28e0c4e1fc6b!8m2!3d23.684994!4d90.356331!16zL20vMDE2MmI?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className=" pt-20 flex flex-col justify-end items-center h-full overflow-hidden "
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/Screenshot%20From%202025-11-08%2017-11-35_1I38SBQ0jn.png?updatedAt=1762600454006')",
      }}
    >
      <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.85)_16%,rgba(255,255,255,1)_25%)] w-full pt-6 pb-3 px-5">
        <h1 className="text-4xl tracking-[1rem] uppercase text-center text-zinc-800">
          Dhaka
        </h1>
        <p className="uppercase  text-center text-zinc-500 tracking-[0.5rem]">
          Bangladesh
        </p>
      </div>
    </Link>
  );
};

export default Map;
