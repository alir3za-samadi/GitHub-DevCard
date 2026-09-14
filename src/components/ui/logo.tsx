import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Logo({
  className,
  hasLink = true,
}: {
  className?: string;
  hasLink?: boolean;
}) {
  const content = (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <LogoImage hasLink={false} />
      <LogoText hasLink={false} />
    </div>
  );

  return hasLink ? <Link href="/">{content}</Link> : content;
}

export function LogoImage({
  className,
  hasLink = true,
}: {
  className?: string;
  hasLink?: boolean;
}) {
  const imageElement = (
    <Image
      src="/logo.webp"
      alt="DevCard Logo"
      width={40}
      height={40}
      priority
      className={cn("h-11 w-11 object-contain", className)}
    />
  );

  return hasLink ? <Link href="/">{imageElement}</Link> : imageElement;
}

export function LogoText({
  className,
  hasLink = true,
}: {
  className?: string;
  hasLink?: boolean;
}) {
  const textElement = (
    <span className={cn("text-lg font-bold", className)}>DevCard</span>
  );

  return hasLink ? <Link href="/">{textElement}</Link> : textElement;
}
