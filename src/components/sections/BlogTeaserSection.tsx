"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { SanityPostPreview } from "@/lib/sanity.types";
import PostCard from "@/components/blog/PostCard";

type BlogTeaserSectionProps = {
  posts: SanityPostPreview[];
};

export default function BlogTeaserSection({ posts }: BlogTeaserSectionProps) {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-16 md:py-32" id="blog">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 md:mb-16"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-foreground/40 mb-3">Diario de la Comunidad</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic">Lecturas Recientes</h2>
        </div>
        <Link
          href="/blog"
          className="text-[10px] uppercase tracking-[0.3em] text-foreground/65 hover:text-primary-strong transition-colors duration-200"
        >
          Ver todo el blog
        </Link>
      </motion.div>

      {posts.length === 0 ? (
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center text-foreground/60 font-light">
          Aun no hay publicaciones. Muy pronto compartiremos nuevas ideas.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
