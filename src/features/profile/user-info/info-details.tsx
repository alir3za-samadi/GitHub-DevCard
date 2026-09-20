import { cn } from "@/lib/utils";
import type { ProfileDetails } from "@/queries/profile";
import Avatar from "@/components/ui/avatar";

export default function Information({
  profile,
  className,
}: {
  profile: ProfileDetails;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Avatar src={profile.avatarUrl} alt={profile.username} />

      <div className="flex flex-col">
        <h1 className="text-[17px] font-semibold text-foreground leading-tight">
          {profile.name || profile.username}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {profile.location || "Unknown Location"}
        </p>
      </div>
    </div>
  );
}
