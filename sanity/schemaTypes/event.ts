import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "date",
    }),
    defineField({
      name: "timeLabel",
      title: "Hora (label)",
      description: "Ejemplo: 18:00 UTC",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descripcion",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "location",
      title: "Ubicacion",
      type: "string",
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
    }),
    defineField({
      name: "isPrimary",
      title: "Evento principal",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "Etiqueta del CTA",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "URL del CTA",
      type: "url",
    }),
    defineField({
      name: "talks",
      title: "Charlas",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "talk",
          fields: [
            defineField({
              name: "talkTitle",
              title: "Titulo de la charla",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "speakerName",
              title: "Nombre del speaker",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "squad",
              title: "Squad",
              type: "string",
              description: "Ejemplo: Squad Data, Squad IA, Squad Automatización, AI Agent Engineer",
            }),
            defineField({
              name: "photo",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "timeRange", title: "Horario", type: "string" }),
          ],
          preview: {
            select: { title: "talkTitle", subtitle: "speakerName" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
    },
  },
});
