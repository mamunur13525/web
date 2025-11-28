import NestedNavbar from "@/components/NestedNavbar";
import PageTitle from "@/components/PageTitle";
import WhatReadingDetails from "@/components/reading/WhatReadingDetails";

export default function Home() {
  return (
    <section className="bg-[#f8f8f8] overflow-y-auto h-screen w-screen">
      <section className="container max-w-5xl mx-auto py-10 lg:py-20 px-7 lg:px-0">
        <NestedNavbar />
        <section className="pt-10 mb-5">
          <PageTitle title="What I'm Reading" />
        </section>
        <WhatReadingDetails />
      </section>
    </section>
  );
}
