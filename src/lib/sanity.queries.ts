import type { QueryParams } from "@sanity/client";
import { sanityClient } from "./sanity.client";
import type { SanityEvent, SanityPost, SanityPostPreview } from "./sanity.types";

async function safeSanityFetch<T>(query: string, params?: QueryParams): Promise<T | null> {
  if (!sanityClient) return null;

  try {
    return params
      ? await sanityClient.fetch<T, QueryParams>(query, params)
      : await sanityClient.fetch<T>(query);
  } catch {
    return null;
  }
}

const postPreviewFields = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  "author": author->{name, role, photo},
  "categories": categories[]->{title, "slug": slug.current}
}`;

const postFields = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  content,
  "author": author->{name, role, photo, bio, links},
  "categories": categories[]->{title, "slug": slug.current, description}
}`;

const eventFields = `{
  _id,
  title,
  "slug": slug.current,
  date,
  timeLabel,
  description,
  location,
  tag,
  isPrimary,
  ctaLabel,
  ctaUrl,
  talks[]{talkTitle, speakerName, squad, photo, timeRange}
}`;

export async function getPosts(): Promise<SanityPostPreview[]> {
  return (await safeSanityFetch<SanityPostPreview[]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${postPreviewFields}`)) ?? [];
}

export async function getLatestPosts(limit = 2): Promise<SanityPostPreview[]> {
  return (await safeSanityFetch<SanityPostPreview[]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...${limit}] ${postPreviewFields}`)) ?? [];
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!slug) return null;
  return (await safeSanityFetch<SanityPost>(`*[_type == "post" && slug.current == $slug][0] ${postFields}`, { slug })) ?? null;
}

export async function getEvents(): Promise<SanityEvent[]> {
  return (await safeSanityFetch<SanityEvent[]>(`*[_type == "event"] | order(date asc) ${eventFields}`)) ?? [];
}
