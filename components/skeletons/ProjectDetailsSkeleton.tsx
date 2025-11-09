import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailsSkeleton() {
  return (
    <div className="">
      {/* type pill */}
      <Skeleton className="h-10 w-32 rounded-full mb-4" />

      <Skeleton className="h-10 w-9/12 rounded-md mb-5" />

      {/* description */}
      <Skeleton className="h-4 w-11/12 rounded-md mb-2" />
      <Skeleton className="h-4 w-full rounded-md mb-2" />
      <Skeleton className="h-4 w-5/6 rounded-md mb-5" />

      <Skeleton className="h-12 w-44 rounded-full  mb-10" />
      <Skeleton className="h-112 w-full rounded-md mb-2" />
      <Skeleton className="h-10 w-96 rounded-md mb-10 mt-20" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((item: number) => {
          return (
            <div key={item}>
              <Skeleton className="h-50 w-full rounded-md mb-4" />
              <Skeleton className="h-8 w-32 rounded-md mb-4" />
              <Skeleton className="h-8 w-full rounded-md mb-4" />
              <Skeleton className="h-3 w-full rounded-md mb-2" />
              <Skeleton className="h-3 w-full rounded-md mb-2" />
              <Skeleton className="h-3 w-full rounded-md mb-2" />
              <Skeleton className="h-3 w-10/12 rounded-md mb-2" />
              <div className="grid grid-cols-2 gap-3 mt-5">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
