import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Avatar({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={`${alt}-avatar`}
      width={56}
      height={56}
      className={cn(
        "w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-border bg-foreground",
        className,
      )}
    />
  );
}
