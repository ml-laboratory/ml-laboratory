# Sanity CMS for Blog and Events

## Goal
Add a community blog and manage upcoming events via Sanity while preserving the current site visual language. Provide a simple publishing workflow for non-developers and keep the existing layout/animation style intact.

## Scope
- Blog: listing page + post detail page.
- Events: replace the hardcoded events array with CMS-driven data.
- Content modeling: categories and authors for posts.
- Styling: reuse existing visual system (glass cards, serif titles, accent colors).
- Optional: home teaser for the two latest posts.

## Non-Goals
- User accounts or comments.
- Advanced search, tagging analytics, or multi-language content.

## Architecture
- Sanity as a headless CMS.
- Next.js App Router fetches content using `@sanity/client` and GROQ queries.
- Server Components for fetching blog/events data.
- Portable Text renderer for post bodies with custom style mappings.

## Content Model (Sanity)
- `post`: title, slug, excerpt, coverImage, content (Portable Text), publishedAt, author (ref), categories (refs), readingTime (optional).
- `author`: name, role, photo, bio, links.
- `category`: title, slug, description.
- `event`: title, slug, date, time, description, location, tag, isPrimary, ctaLabel (optional), ctaUrl (optional).

## Frontend Components
- `src/app/blog/page.tsx`: blog listing with hero + grid.
- `src/app/blog/[slug]/page.tsx`: post detail page.
- `src/components/blog/PostCard.tsx`, `PostHeader.tsx`, `PostBody.tsx`, `AuthorBadge.tsx`, `CategoryPill.tsx`.
- `src/components/sections/EventsSection.tsx`: updated to receive `events` from Sanity.
- `src/app/page.tsx`: fetch events and (optional) latest posts teaser.

## Data Flow
1. Server component executes GROQ query via `@sanity/client`.
2. Data is mapped into UI components using existing styling utilities.
3. Portable Text renders with custom components for headings, links, lists, and images.

## UX and Visual Consistency
- Reuse `glass-card`, `liquid-orb`, and current accent colors.
- Serif typography for headlines, light body text, consistent spacing.
- Hero image treatment aligned with `ProjectsCarousel` (gradient mask + overlay).

## Error Handling and Empty States
- If no content, show a subtle “Aun no hay publicaciones” message with existing style tokens.
- If fetch fails, render a fallback message and log server errors.

## Testing / Validation
- Validate `/blog` and `/blog/[slug]` routes.
- Confirm events render identical layout with CMS data.
- Visual QA to ensure typography/colors match existing site.

## Implementation Notes
- Store Sanity credentials in `.env.local` (projectId, dataset, token if needed).
- Use read-only dataset access for public content.
- Consider ISR via `revalidate` on blog/events pages.
