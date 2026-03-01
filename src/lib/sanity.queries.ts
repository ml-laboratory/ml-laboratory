import { sanityClient } from "./sanity.client";
import type { SanityEvent, SanityPost, SanityPostPreview } from "./sanity.types";

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
  ctaUrl
}`;

export async function getPosts(): Promise<SanityPostPreview[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${postPreviewFields}`);
}

export async function getLatestPosts(limit = 2): Promise<SanityPostPreview[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...${limit}] ${postPreviewFields}`);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!slug) return null;
  if (!sanityClient) return null;
  return sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0] ${postFields}`, { slug });
}

export async function getEvents(): Promise<SanityEvent[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(`*[_type == "event"] | order(date asc) ${eventFields}`);
}
