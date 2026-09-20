import Info from "@/features/profile/user-info/info-details";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { ProfileDetails } from "@/queries/profile";
export default function InformationSection({
  profile,
  className,
  infoClassName,
  childrenContainerClassName,
  children,
}: {
  profile: ProfileDetails;
  className?: string;
  infoClassName?: string;
  childrenContainerClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn("flex items-center justify-between pt-2 w-full", className)}
    >
      <Info profile={profile} className={infoClassName} />
      {children && (
        <div className={cn("flex justify-end", childrenContainerClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}
