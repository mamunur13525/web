import { Skeleton } from "@/components/ui/skeleton";
import NestedNavbar from "@/components/NestedNavbar";

export default function Loading() {
  return (
    <main>
      <div className="mb-4">
        <NestedNavbar />
      </div>

      <article>
        <div className="mb-6">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-10 md:h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="w-full h-[400px] md:h-[500px] rounded-lg mb-8" />

        <div className="space-y-4 max-w-none">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />

          <div className="py-4">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </article>
    </main>
  );
}
