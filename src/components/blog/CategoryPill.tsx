import type { SanityCategory } from "@/lib/sanity.types";

type CategoryPillProps = {
  category: SanityCategory;
};

export default function CategoryPill({ category }: CategoryPillProps) {
  return (
    <span className="px-3 py-1 rounded-full border border-primary/15 bg-white/80 text-[10px] uppercase tracking-[0.2em] text-foreground/70">
      {category.title}
    </span>
  );
}
