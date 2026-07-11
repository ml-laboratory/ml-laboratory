# Departamentos y Demo Day — Design

## Contexto

ML Laboratory necesita en la web:
1. Una sección que presente los tres squads/departamentos: Ciencia de Datos, IA, Automatización.
2. El evento "Demo Day" (18 de julio, 4-6pm, virtual vía Microsoft Teams, registro en Luma) con sus 6 charlas y speakers, mostrado dentro del sistema de eventos existente (`EventsSection`, alimentado por Sanity CMS).

## 1. Sección Departamentos

Nuevo componente `src/components/sections/DepartmentsSection.tsx`, siguiendo el patrón visual/animación de `AboutSection.tsx` (framer-motion, `glass-card`, tipografía existente).

- Contenido estático (sin CMS), 3 tarjetas:
  - **Ciencia de Datos** — icono + descripción corta (1-2 líneas).
  - **IA** — icono + descripción corta.
  - **Automatización** — icono + descripción corta.
- Se monta en `src/app/page.tsx` como import dinámico (`next/dynamic`), igual que las demás secciones, ubicado después de `TeamSection`.
- No lleva conteo de miembros ni proyectos — solo nombre + descripción, según lo acordado.

## 2. Demo Day (evento + charlas)

### Schema Sanity

Extender `sanity/schemaTypes/event.ts` agregando un campo `talks` (array de objetos inline), sin crear un nuevo document type:

```ts
defineField({
  name: "talks",
  title: "Charlas",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "talk",
      fields: [
        defineField({ name: "talkTitle", title: "Titulo de la charla", type: "string" }),
        defineField({ name: "speakerName", title: "Nombre del speaker", type: "string" }),
        defineField({ name: "squad", title: "Squad", type: "string" }), // ej: "Squad Data", "Squad IA", "Squad Automatización", "AI Agent Engineer"
        defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
        defineField({ name: "timeRange", title: "Horario", type: "string" }), // ej: "4:00 pm - 4:15 pm"
      ],
    }),
  ],
})
```

### Tipos y queries

- `SanityEvent` en `src/lib/sanity.types.ts`: agregar `talks?: SanityTalk[]`, con nuevo tipo:
  ```ts
  export type SanityTalk = {
    talkTitle: string;
    speakerName: string;
    squad?: string;
    photo?: SanityImage;
    timeRange?: string;
  };
  ```
- GROQ query en `src/lib/sanity.queries.ts` (`getEvents`): incluir `talks[]{talkTitle, speakerName, squad, photo, timeRange}`.

### UI — `EventsSection.tsx`

- Cuando `event.talks` existe y no está vacío, renderizar un grid de tarjetas de speaker dentro de la card del evento (reusa estilo `glass-card`, similar a las tarjetas de las imágenes de referencia: foto circular, nombre, squad, horario).
- Solo se muestra dentro de eventos marcados `isPrimary` — no cambia el layout de eventos sin charlas.

### Carga de datos

- El evento Demo Day se crea manualmente en Sanity Studio (no vía seed/migration): título "Demo Day", fecha `2026-07-18`, `timeLabel` "4:00 pm - 6:00 pm", `location` "Virtual · Microsoft Teams", `isPrimary: true`, `ctaLabel` "Registrarse", `ctaUrl` link de Luma, y las 6 `talks` con los datos de las imágenes (David Huaqui, Marcio Zinanyuca ×2, Jhosting Diaz ×2, Paul Campos, Henry Kening).

## Fuera de alcance

- No se automatiza la carga del contenido del Demo Day (se ingresa manual en Studio).
- No se conecta Departamentos con datos reales de miembros/proyectos.
- No se crea un document type `talk` reusable — se mantiene como objeto inline del evento.
