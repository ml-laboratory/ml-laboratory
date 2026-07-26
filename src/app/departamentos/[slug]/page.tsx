import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { departments, getDepartment } from "@/data/departments";
import { notFound } from "next/navigation";

type DepartmentPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return departments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartment(slug);

  if (!department) {
    return {};
  }

  return {
    title: department.title,
    description: department.description,
    alternates: {
      canonical: `/departamentos/${department.slug}`,
    },
  };
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = getDepartment(slug);

  if (!department) {
    notFound();
  }

  const Icon = department.icon;

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <section className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 pb-20 pt-32 sm:px-8 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-70" />
        <div className="ui-card w-full rounded-[2rem] p-8 md:rounded-[2.5rem] md:p-16">
          <Link href="/#departamentos" className="mb-12 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-strong transition-colors duration-200 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ver departamentos
          </Link>
          <div className="mb-8 inline-flex rounded-2xl border border-primary/20 bg-surface-muted p-5 text-primary-strong">
            <Icon className="h-10 w-10" aria-hidden="true" />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">Departamento</p>
          <h1 className="max-w-3xl text-4xl leading-tight text-balance sm:text-5xl md:text-6xl">{department.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80 md:text-xl">{department.description}</p>
          <div className="mt-12 border-t border-primary/15 pt-8">
            <h2 className="text-2xl">Qué exploramos</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-foreground/75">
              Exploramos ideas, preguntas y aplicaciones relacionadas con {department.title} dentro de ML Laboratory.
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link href="/" className="button-secondary inline-flex items-center justify-center px-6 py-3 text-sm">
              Volver al inicio
            </Link>
            <Link href="/#departamentos" className="button-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm">
              Explorar departamentos
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
