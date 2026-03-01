import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "./sanity.types";
import { sanityClient } from "./sanity.client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImage | Record<string, unknown>) {
  if (!builder) return null;
  return builder.image(source as SanityImage);
}
