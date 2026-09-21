import { Skeleton } from "@/components/base/skeleton";
import { Card } from "@/components/base/card";
import { Separator } from "@/components/base/separator";

export default function Loading() {
  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeaderSkeleton />

      <Separator />

      <SortSectionSkeleton />

      <ReposSectionSkeleton />
    </div>
  );
}
function PageHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-15 w-3/4 md:h-8 md:w-130 mx-auto" />
    </div>
  );
}

function SortSectionSkeleton() {
  return (
    <div className="flex items-center justify-between ">
      <div className="hidden w-2/3 md:flex md:flex-wrap items-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-18 rounded-md" />
        ))}
      </div>

      <Skeleton className="h-9 w-28 rounded-md md:hidden" />

      <Skeleton className="h-9 w-30 rounded-md" />
    </div>
  );
}

function ReposSectionSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="w-full p-4 flex items-start justify-between gap-4"
        >
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <Skeleton className="w-14 h-14 rounded-full shrink-0" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>

          <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12" />
          </div>
        </Card>
      ))}

      <Skeleton className="h-4 w-52 my-1" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-8 rounded-md" />
        <Skeleton className="h-6 w-8 rounded-md" />
        <Skeleton className="h-6 w-8 rounded-md" />
        <Skeleton className="h-6 w-8 rounded-md" />
        <Skeleton className="h-6 w-8 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
    </div>
  );
}
