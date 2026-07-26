import Image from "next/image";
import type { SanityPost } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";
import { formatLongDate } from "@/lib/format";
import AuthorBadge from "@/components/blog/AuthorBadge";
import CategoryPill from "@/components/blog/CategoryPill";

type PostHeaderProps = {
  post: SanityPost;
};

export default function PostHeader({ post }: PostHeaderProps) {
  const coverUrl = post.coverImage ? urlFor(post.coverImage)?.width(1600).height(900).url() : null;

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-16 pt-32 md:pt-36 pb-12 md:pb-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-background to-background" />

      <div className="mb-8 md:mb-10">
        <p className="text-[11px] uppercase tracking-[0.5em] text-foreground/40 mb-4">
          {formatLongDate(post.publishedAt)}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 font-light leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex flex-col gap-3">
          <AuthorBadge author={post.author} className="text-foreground/70" />
          {post.author?.links && post.author.links.length > 0 && (
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              {post.author.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1 rounded-full border border-primary/15 hover:border-primary/50 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.categories?.map((category) => (
            <CategoryPill key={category.slug} category={category} />
          ))}
        </div>
      </div>

      {coverUrl && (
        <div className="relative mt-10 md:mt-12 h-64 sm:h-80 md:h-[420px] rounded-3xl overflow-hidden glass-card">
          <Image
            src={coverUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 896px, (min-width: 768px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
            className="object-contain bg-surface-muted opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>
      )}
    </section>
  );
}
