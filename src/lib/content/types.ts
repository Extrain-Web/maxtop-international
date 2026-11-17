// Shapes of the data served by the Express API (backend/).
import type { Dictionary } from "@/i18n/dictionaries/en";

export const CONTENT_LOCALES = ["en", "bn", "ar", "fa"] as const;
export type ContentLocale = (typeof CONTENT_LOCALES)[number];

export type SiteImageMap = Record<string, string>;

export interface SiteSettings {
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  contactEmail: string;
  contactPhone: string;
  whatsappUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  showStatsBanner: boolean;
  showGallery: boolean;
}

export interface ProductCategoryAsset {
  id: string;
  coverImg: string;
  bannerImg: string;
}

export interface ProductItemAsset {
  id: number;
  categoryId: string;
  audience: "men" | "women" | "kids";
  gsm: string;
  moq: string;
  image: string;
  colors: string[];
  sizes: string[];
  isFeatured?: boolean;
}

export interface ServiceAssetData {
  id: string;
  num: string;
  icon: string;
  image: string;
}

export interface IconAssetData {
  id: number;
  icon: string;
  stepNumber?: string;
}

export type Localized<T> = T & { id: string | number; t: Record<ContentLocale, Record<string, unknown>> };

export interface SiteContent {
  dictionaries: Record<ContentLocale, Dictionary>;
  assets: {
    productCategories: ProductCategoryAsset[];
    productItems: ProductItemAsset[];
    services: ServiceAssetData[];
    howWeWork: IconAssetData[];
    whyChooseUs: IconAssetData[];
  };
  localized: {
    stats: Localized<{ value: string }>[];
    galleryCategories: Localized<object>[];
    gallery: Localized<{ category: string; image: string }>[];
    recognizedBy: Localized<{ image: string }>[];
    partnerCerts: Localized<{ image: string }>[];
  };
  images: SiteImageMap;
  settings: SiteSettings;
  updatedAt?: string;
}
