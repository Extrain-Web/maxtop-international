import type { ContentLocale } from "@/lib/content/types";

export type FieldType = "text" | "textarea" | "number" | "image" | "icon" | "select" | "list" | "colors" | "checkbox";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  optionsFrom?: string;
}

export interface CollectionDef {
  key: string;
  label: string;
  description: string;
  group: string;
  dictPath: string[] | null;
  idType: "number" | "slug" | "none";
  fields: FieldDef[];
  textFields: FieldDef[];
  titleField: string;
  imageField?: string;
  iconField?: string;
}

export interface Meta {
  locales: ContentLocale[];
  localeLabels: Record<ContentLocale, string>;
  collections: Record<string, CollectionDef>;
  siteImages: { key: string; label: string; group: string; default: string }[];
  settingsFields: { name: string; label: string; type: "text" | "textarea" | "list" | "checkbox"; group: string }[];
  textSections: string[];
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  lastLoginAt?: string;
}

export interface CollectionItem {
  _id: string;
  id: string | number;
  t: Partial<Record<ContentLocale, Record<string, unknown>>>;
  [field: string]: unknown;
}

export interface MessageDoc {
  _id: string;
  source: "contact" | "rfq" | "product";
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  category?: string;
  quantity?: string;
  message?: string;
  status: "new" | "read" | "replied" | "archived";
  note?: string;
  createdAt: string;
}

export interface MediaDoc {
  _id: string;
  url: string;
  filename: string;
  originalName?: string;
  size: number;
  createdAt: string;
}

/** Collection pages in the sidebar (must match backend/src/content/collections.js) */
export const COLLECTION_NAV: { key: string; label: string; group: string }[] = [
  { key: "productItems", label: "Products", group: "Products" },
  { key: "productCategories", label: "Categories", group: "Products" },
  { key: "services", label: "Services", group: "Home Sections" },
  { key: "howWeWork", label: "How We Work", group: "Home Sections" },
  { key: "whyChooseUs", label: "Why Choose Us", group: "Home Sections" },
  { key: "faq", label: "FAQ", group: "Home Sections" },
  { key: "stats", label: "Stats", group: "Company" },
  { key: "gallery", label: "Gallery", group: "Company" },
  { key: "galleryCategories", label: "Gallery Categories", group: "Company" },
  { key: "recognizedBy", label: "Recognized By", group: "Company" },
  { key: "partnerCerts", label: "Partner Certifications", group: "Company" },
];
