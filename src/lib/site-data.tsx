"use client";

// Gives client components the database-driven content (images, product
// assets, stats, gallery, logos, settings) in the exact shapes the original
// static `src/data/*` files had, resolved for the active language.

import { createContext, useContext, useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { iconOf } from "./content/icons";
import type { SiteContent } from "./content/types";
import type { ContentLocale } from "./content/types";

type Data = Omit<SiteContent, "dictionaries">;

const SiteDataContext = createContext<Data | null>(null);

export function SiteDataProvider({ data, children }: { data: Data; children: React.ReactNode }) {
  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

const txt = (item: { t: Record<string, Record<string, unknown>> }, locale: ContentLocale) =>
  (item.t[locale] ?? item.t.en ?? {}) as Record<string, string>;

export function useSiteData() {
  const data = useContext(SiteDataContext);
  if (!data) throw new Error("useSiteData must be used within <SiteDataProvider>");
  const { locale } = useI18n();

  return useMemo(() => {
    const withIcon = <T extends { icon: string }>(a: T) => ({ ...a, icon: iconOf(a.icon) as LucideIcon });
    const logo = (l: Data["localized"]["recognizedBy"][number]) => {
      const t = txt(l, locale);
      return { id: String(l.id), image: l.image, name: t.name ?? "", tooltip: t.tooltip ?? "" };
    };
    return {
      settings: data.settings,
      /** image for a fixed slot (see backend/src/content/images.js) */
      img: (key: string) => data.images[key] ?? "",

      productCategoryAssets: data.assets.productCategories,
      productAssets: data.assets.productItems,
      serviceAssets: data.assets.services.map(withIcon),
      howWeWorkAssets: data.assets.howWeWork.map((a) => ({ ...withIcon(a), stepNumber: a.stepNumber ?? String(a.id) })),
      whyChooseAssets: data.assets.whyChooseUs.map(withIcon),

      statsData: data.localized.stats.map((s) => {
        const t = txt(s, locale);
        return { id: Number(s.id), value: s.value, label: t.label ?? "", subLabel: t.subLabel || undefined };
      }),
      galleryCategories: data.localized.galleryCategories.map((c) => ({ id: String(c.id), label: txt(c, locale).label ?? "" })),
      galleryImages: data.localized.gallery.map((g) => {
        const t = txt(g, locale);
        return {
          id: String(g.id),
          category: g.category,
          image: g.image,
          title: t.title ?? "",
          categoryLabel: t.categoryLabel ?? "",
          location: t.location ?? "",
          machinery: t.machinery ?? "",
        };
      }),
      recognizedByLogos: data.localized.recognizedBy.map(logo),
      partnerCertificationsLogos: data.localized.partnerCerts.map(logo),
    };
  }, [data, locale]);
}
