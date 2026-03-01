import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import PostCard from "@/components/blog/PostCard";
import { getPosts } from "@/lib/sanity.queries";
import { isSanityConfigured } from "@/lib/sanity.client";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative">
      <AnimatedBackground />
      <Navbar />

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 md:px-16 pt-32 md:pt-40 pb-12 md:pb-20 text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-foreground/40 mb-4">ML Laboratory Journal</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-4 md:mb-6">
          Ideas, experimentos y
          <span className="italic font-light opacity-80"> comunidad viva</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-foreground/60 font-light max-w-3xl mx-auto">
          Publicaciones creadas por el colectivo para compartir avances, aprendizajes y desafios reales.
        </p>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 md:px-16 pb-20 md:pb-32">
        {!isSanityConfigured && (
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center text-foreground/60 font-light">
            Configura Sanity para mostrar las publicaciones del blog.
          </div>
        )}

        {isSanityConfigured && posts.length === 0 && (
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center text-foreground/60 font-light">
            Aun no hay publicaciones. Muy pronto compartiremos nuevas ideas.
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
