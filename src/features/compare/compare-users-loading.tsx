import { Skeleton } from "@/components/base/skeleton";

export default function CompareUsersLoading() {
  return (
    <div className="w-full mx-auto space-y-6">
      <Skeleton className="h-9 w-full mx-auto rounded-md md:w-30" />

      <div className="flex flex-col gap-4 md:flex-row items-center">
        <UserInfoSkeleton />
        <Skeleton className="h-5 w-5 shrink-0 my-2 md:my-0 rounded-full" />
        <UserInfoSkeleton />
      </div>

      <HeadToHeadSkeleton />
    </div>
  );
}

function UserInfoSkeleton() {
  return (
    <div className="w-full p-5 border rounded-xl bg-card flex items-center gap-4 md:w-1/2">
      <Skeleton className="w-14 h-14 rounded-full shrink-0" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-5 w-28 rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-14 rounded-md" />
          <Skeleton className="h-4 w-14 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function HeadToHeadSkeleton() {
  return (
    <div className="p-6 border rounded-xl bg-card space-y-6 w-full">
      <Skeleton className="h-6 w-32 mx-auto rounded-md" />

      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-2">
            <div className="grid grid-cols-3 items-center">
              <Skeleton className="h-4 w-20 justify-self-start rounded-md" />
              <Skeleton className="h-4 w-24 justify-self-center rounded-md" />
              <Skeleton className="h-4 w-20 justify-self-end rounded-md" />
            </div>
            <Skeleton className="h-3.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
