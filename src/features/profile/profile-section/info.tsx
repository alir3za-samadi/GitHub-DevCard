import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ProfileDetails } from "@/queries/profile/types";

export default function Information({
  profile,
  className,
}: {
  profile: ProfileDetails;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Image
        src={profile.avatarUrl}
        alt={`${profile.username}-avatar`}
        width={56}
        height={56}
        className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-border bg-foreground"
      />

      <div className="flex flex-col">
        <h1 className="text-[17px] font-semibold text-foreground leading-tight">
          {profile.name}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {profile.location || "Unknown Location"}
        </p>
      </div>
    </div>
  );
}
