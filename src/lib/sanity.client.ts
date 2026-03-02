import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-15";
const token = process.env.SANITY_API_TOKEN;

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: !token,
  token,
};

export const isSanityConfigured = Boolean(projectId && dataset);

export const sanityClient = isSanityConfigured ? createClient(sanityConfig) : null;
