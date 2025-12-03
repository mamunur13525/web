import NestedNavbar from "@/components/NestedNavbar";
import PageTitle from "@/components/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main>
      <NestedNavbar />
      <section className="pt-10 mb-5">
        <PageTitle title="All Blogs" />
      </section>

      <div>
        <div className="flex flex-wrap justify-between gap-2 bg-white dark:bg-gray-900 rounded-3xl md:rounded-full py-2 px-2 w-fit">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
