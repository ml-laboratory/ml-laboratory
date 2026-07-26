import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { departments } from "@/data/departments";

export default function DepartmentsSection() {
  return (
    <section id="departamentos" className="relative z-10 scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 md:scroll-mt-24 md:py-32">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-3 font-serif text-base tracking-wide text-primary-strong md:text-lg">
            Tres squads, un propósito
          </p>
          <h2 className="mb-4 text-3xl leading-[1.1] text-balance sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
            Nuestros <span className="text-primary-strong">Departamentos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
            Construyendo soluciones que generan impacto real desde la inteligencia colectiva.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {departments.map((department) => {
            const Icon = department.icon;

            return (
              <Link
                key={department.slug}
                href={`/departamentos/${department.slug}`}
                className="ui-card group relative flex min-h-72 flex-col overflow-hidden rounded-3xl p-8 focus-visible:outline-primary-strong md:p-10"
                aria-describedby={`${department.slug}-description`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${department.accentClassName}`} />
                <div className="mb-6 inline-flex w-fit rounded-2xl border border-primary/20 bg-surface-muted p-4 text-primary-strong transition-[background-color,border-color,transform] duration-200 group-hover:translate-x-1 group-hover:border-primary/50 group-hover:bg-white">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl tracking-tight md:text-2xl">{department.title}</h3>
                <p id={`${department.slug}-description`} className="flex-grow text-sm leading-relaxed text-foreground/75 md:text-base">
                  {department.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-strong">
                  Conocer el departamento
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
