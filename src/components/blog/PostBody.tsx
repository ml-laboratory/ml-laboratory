import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { SanityPost } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";

type PostBodyProps = {
  post: SanityPost;
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value)?.width(1400).height(800).url();
      if (!imageUrl) return null;
      return (
        <div className="relative w-full h-64 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden glass-card my-10">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            fill
            sizes="(min-width: 768px) 640px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl sm:text-2xl font-serif mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg sm:text-xl font-serif mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-base sm:text-lg text-foreground/70 font-light leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l border-white/20 pl-4 italic text-foreground/70 my-6">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ value, children }: any) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <a
          href={value?.href}
          className="text-accent hover:text-foreground transition-colors underline underline-offset-4"
          rel={isExternal ? "noreferrer noopener" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 space-y-2 text-foreground/70 mb-6">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 space-y-2 text-foreground/70 mb-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-base sm:text-lg font-light">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-base sm:text-lg font-light">{children}</li>
    ),
  },
};

export default function PostBody({ post }: PostBodyProps) {
  if (!post.content || post.content.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-8 md:px-16 pb-24 text-foreground/60">
        Este articulo aun no tiene contenido.
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-8 md:px-16 pb-24">
      <PortableText value={post.content as any} components={components} />
    </section>
  );
}
