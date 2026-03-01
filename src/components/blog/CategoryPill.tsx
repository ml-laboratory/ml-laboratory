import type { SanityCategory } from "@/lib/sanity.types";

type CategoryPillProps = {
  category: SanityCategory;
};

export default function CategoryPill({ category }: CategoryPillProps) {
  return (
    <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.2em] text-foreground/50">
      {category.title}
    </span>
  );
}
