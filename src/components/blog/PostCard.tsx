"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { SanityPostPreview } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";
import { formatLongDate } from "@/lib/format";
import AuthorBadge from "@/components/blog/AuthorBadge";
import CategoryPill from "@/components/blog/CategoryPill";

type PostCardProps = {
  post: SanityPostPreview;
  index?: number;
};

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const coverUrl = post.coverImage ? urlFor(post.coverImage)?.width(1200).height(800).url() : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative glass-card rounded-3xl overflow-hidden border border-primary/15 hover:border-primary/40 transition-[border-color,box-shadow] duration-200"
    >
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 556px, (min-width: 1024px) calc((100vw - 168px) / 2), (min-width: 768px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
            className="object-contain bg-surface-muted opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-surface-muted to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {post.categories?.slice(0, 2).map((category) => (
            <CategoryPill key={category.slug} category={category} />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-3">
            {formatLongDate(post.publishedAt)}
          </p>
          <h3 className="text-2xl md:text-3xl font-serif italic mb-3">{post.title}</h3>
          {post.excerpt && (
            <p className="text-sm md:text-base text-foreground/60 font-light leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <AuthorBadge author={post.author} />
          {post.slug ? (
            <Link
              href={`/blog/${post.slug}`}
              className="text-[10px] uppercase tracking-[0.3em] text-foreground/65 hover:text-primary-strong transition-colors duration-200"
            >
              Leer
            </Link>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              Sin slug
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
