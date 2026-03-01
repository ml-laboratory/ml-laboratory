export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type SanityCategory = {
  title: string;
  slug: string;
  description?: string;
};

export type SanityAuthorLink = {
  label: string;
  url: string;
};

export type SanityAuthor = {
  name: string;
  role?: string;
  photo?: SanityImage;
  bio?: string;
  links?: SanityAuthorLink[];
};

export type SanityPostPreview = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
  author?: SanityAuthor;
  categories?: SanityCategory[];
};

export type SanityPost = SanityPostPreview & {
  content?: unknown[];
};

export type SanityEvent = {
  _id: string;
  title: string;
  slug?: string;
  date?: string;
  timeLabel?: string;
  description?: string;
  location?: string;
  tag?: string;
  isPrimary?: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
};
