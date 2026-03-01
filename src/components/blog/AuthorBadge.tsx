"use client";

import Image from "next/image";
import type { SanityAuthor } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";
import { cn } from "@/lib/utils";

type AuthorBadgeProps = {
  author?: SanityAuthor;
  className?: string;
};

function getInitials(name?: string) {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AuthorBadge({ author, className }: AuthorBadgeProps) {
  if (!author) return null;
  const imageUrl = author.photo ? urlFor(author.photo)?.width(120).height(120).url() : null;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {imageUrl ? (
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
          <Image src={imageUrl} alt={author.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[11px] uppercase tracking-widest text-foreground/70 bg-white/5">
          {getInitials(author.name)}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-[0.2em] text-foreground/60">{author.name}</span>
        {author.role && <span className="text-[10px] text-foreground/40">{author.role}</span>}
      </div>
    </div>
  );
}
