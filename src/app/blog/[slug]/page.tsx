import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import PostHeader from "@/components/blog/PostHeader";
import PostBody from "@/components/blog/PostBody";
import { getPostBySlug } from "@/lib/sanity.queries";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative">
      <AnimatedBackground />
      <Navbar />

      <PostHeader post={post} />
      <PostBody post={post} />

      <Footer />
    </main>
  );
}
