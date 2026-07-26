import { BrainCircuit, Database, Workflow, type LucideIcon } from "lucide-react";

export type Department = {
  slug: "ciencia-de-datos" | "ia" | "automatizacion";
  title: "Ciencia de Datos" | "IA" | "Automatización";
  description: string;
  icon: LucideIcon;
  accentClassName: string;
};

export const departments: readonly Department[] = [
  {
    slug: "ciencia-de-datos",
    title: "Ciencia de Datos",
    description: "Análisis, visualización y modelado de datos para resolver problemas reales con evidencia.",
    icon: Database,
    accentClassName: "from-primary/30 via-secondary/20 to-transparent",
  },
  {
    slug: "ia",
    title: "IA",
    description: "Agentes inteligentes, automatización cognitiva y soluciones basadas en modelos de lenguaje.",
    icon: BrainCircuit,
    accentClassName: "from-accent/25 via-primary/15 to-transparent",
  },
  {
    slug: "automatizacion",
    title: "Automatización",
    description: "Optimización de procesos y flujos de trabajo mediante herramientas y sistemas automatizados.",
    icon: Workflow,
    accentClassName: "from-secondary/35 via-primary/15 to-transparent",
  },
];

export function getDepartment(slug: string) {
  return departments.find((department) => department.slug === slug);
}
