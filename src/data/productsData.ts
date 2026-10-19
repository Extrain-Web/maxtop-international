// src/data/productsData.ts
// Non-translatable product assets. Translatable text (category name/fullName/desc
// and product name/desc/material) lives in the i18n dictionaries under
// `productCategories` and `productItems`, merged by index inside the components.

export interface ProductCategory {
  id: string;
  name: string;
  fullName: string;
  desc: string;
  coverImg: string;
  bannerImg: string;
}

export interface ProductItem {
  id: number;
  categoryId: string;
  audience: "men" | "women" | "kids";
  name: string;
  desc: string;
  material: string;
  gsm: string;
  moq: string;
  image: string;
  colors: string[];
  sizes: string[];
  isFeatured?: boolean;
}

export type ProductCategoryAsset = Pick<
  ProductCategory,
  "id" | "coverImg" | "bannerImg"
>;

export type ProductItemAsset = Omit<ProductItem, "name" | "desc" | "material">;

// ── ১. ১২টি ক্যাটাগরির অ্যাসেট (ছবি) ──
export const productCategoryAssets: ProductCategoryAsset[] = [
  {
    id: "knit",
    coverImg: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "woven",
    coverImg: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "denim",
    coverImg: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sweater",
    coverImg: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "outerwear",
    coverImg: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "workwear",
    coverImg: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "activewear",
    coverImg: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sportswear",
    coverImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "rainwear",
    coverImg: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "lingerie",
    coverImg: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "baggage",
    coverImg: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "handicraft",
    coverImg: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    bannerImg: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1600&q=80",
  },
];

// ── ২. প্রোডাক্ট অ্যাসেট (ছবি, কালার, সাইজ, GSM — টেক্সট i18n ডিকশনারিতে) ──
export const productAssets: ProductItemAsset[] = [
  // 1. KNIT
  { id: 101, categoryId: "knit", audience: "men", gsm: "320 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80", colors: ["#1E293B", "#334155", "#64748B", "#0F172A"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 102, categoryId: "knit", audience: "women", gsm: "180 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80", colors: ["#FFFFFF", "#0F172A", "#F43F5E", "#E2E8F0"], sizes: ["XS", "S", "M", "L", "XL"], isFeatured: true },
  { id: 103, categoryId: "knit", audience: "men", gsm: "220 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80", colors: ["#FFFFFF", "#0B2B43", "#059669", "#DC2626", "#0F172A"], sizes: ["S", "M", "L", "XL", "2XL", "3XL"], isFeatured: true },
  { id: 104, categoryId: "knit", audience: "kids", gsm: "160 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80", colors: ["#38BDF8", "#F472B6", "#FBBF24", "#34D399", "#FFFFFF"], sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"], isFeatured: false },

  // 2. WOVEN
  { id: 201, categoryId: "woven", audience: "men", gsm: "160 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80", colors: ["#FFFFFF", "#93C5FD", "#FDBA74", "#CBD5E1"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 202, categoryId: "woven", audience: "women", gsm: "140 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80", colors: ["#FEF3C7", "#FFFFFF", "#A7F3D0", "#E2E8F0"], sizes: ["XS", "S", "M", "L", "XL"], isFeatured: false },
  { id: 203, categoryId: "woven", audience: "men", gsm: "260 GSM", moq: "800 Pcs", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80", colors: ["#D97706", "#1E293B", "#475569", "#78716C"], sizes: ["30", "32", "34", "36", "38"], isFeatured: true },
  { id: 204, categoryId: "woven", audience: "kids", gsm: "180 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80", colors: ["#DC2626", "#2563EB", "#059669"], sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"], isFeatured: false },

  // 3. DENIM
  { id: 301, categoryId: "denim", audience: "men", gsm: "13.5 oz / 380 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80", colors: ["#1E3A8A", "#172554", "#475569"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 302, categoryId: "denim", audience: "women", gsm: "10.5 oz / 300 GSM", moq: "800 Pcs", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80", colors: ["#1E3A8A", "#0F172A", "#64748B"], sizes: ["26", "28", "30", "32", "34"], isFeatured: false },
  { id: 303, categoryId: "denim", audience: "men", gsm: "12.5 oz / 350 GSM", moq: "800 Pcs", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80", colors: ["#1E40AF", "#1E293B", "#94A3B8"], sizes: ["30", "32", "34", "36", "38"], isFeatured: true },
  { id: 304, categoryId: "denim", audience: "kids", gsm: "9.5 oz / 270 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80", colors: ["#2563EB", "#1E3A8A"], sizes: ["4Y", "6Y", "8Y", "10Y"], isFeatured: false },

  // 4. SWEATER
  { id: 401, categoryId: "sweater", audience: "men", gsm: "420 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1578768079052-aa76e520028b?auto=format&fit=crop&w=800&q=80", colors: ["#D97706", "#1E293B", "#E2E8F0", "#78716C"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 402, categoryId: "sweater", audience: "women", gsm: "340 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80", colors: ["#F59E0B", "#FEF3C7", "#94A3B8", "#1E293B"], sizes: ["XS", "S", "M", "L"], isFeatured: false },
  { id: 403, categoryId: "sweater", audience: "kids", gsm: "300 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80", colors: ["#2563EB", "#DC2626", "#FBBF24"], sizes: ["4Y", "6Y", "8Y", "10Y"], isFeatured: false },

  // 5. OUTERWEAR
  { id: 501, categoryId: "outerwear", audience: "men", gsm: "380 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80", colors: ["#0F172A", "#1E3A8A", "#065F46", "#B91C1C"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 502, categoryId: "outerwear", audience: "women", gsm: "320 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80", colors: ["#F43F5E", "#FFFFFF", "#0F172A", "#D97706"], sizes: ["XS", "S", "M", "L"], isFeatured: false },
  { id: 503, categoryId: "outerwear", audience: "kids", gsm: "280 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80", colors: ["#2563EB", "#DC2626", "#059669"], sizes: ["4Y", "6Y", "8Y", "10Y"], isFeatured: false },

  // 6. WORKWEAR
  { id: 601, categoryId: "workwear", audience: "men", gsm: "320 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80", colors: ["#FACC15", "#FB923C"], sizes: ["S", "M", "L", "XL", "2XL", "3XL"], isFeatured: false },
  { id: 602, categoryId: "workwear", audience: "men", gsm: "280 GSM", moq: "800 Pcs", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80", colors: ["#1E293B", "#334155", "#78716C"], sizes: ["30", "32", "34", "36", "38", "40"], isFeatured: false },
  { id: 603, categoryId: "workwear", audience: "women", gsm: "260 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", colors: ["#0F172A", "#1E3A8A", "#78716C"], sizes: ["XS", "S", "M", "L", "XL"], isFeatured: false },

  // 7. ACTIVEWEAR
  { id: 701, categoryId: "activewear", audience: "women", gsm: "260 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80", colors: ["#0F172A", "#475569", "#7C3AED", "#059669"], sizes: ["XS", "S", "M", "L", "XL"], isFeatured: true },
  { id: 702, categoryId: "activewear", audience: "women", gsm: "240 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80", colors: ["#F43F5E", "#0F172A", "#FFFFFF", "#38BDF8"], sizes: ["XS", "S", "M", "L"], isFeatured: false },
  { id: 703, categoryId: "activewear", audience: "men", gsm: "150 GSM", moq: "800 Pcs", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80", colors: ["#0F172A", "#334155", "#059669", "#38BDF8"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },

  // 8. SPORTSWEAR
  { id: 801, categoryId: "sportswear", audience: "men", gsm: "160 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80", colors: ["#DC2626", "#2563EB", "#FFFFFF", "#0F172A"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: false },
  { id: 802, categoryId: "sportswear", audience: "kids", gsm: "220 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80", colors: ["#1E3A8A", "#0F172A", "#DC2626"], sizes: ["6Y", "8Y", "10Y", "12Y"], isFeatured: false },

  // 9. RAINWEAR
  { id: 901, categoryId: "rainwear", audience: "men", gsm: "280 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80", colors: ["#FACC15", "#0F172A", "#065F46"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: false },
  { id: 902, categoryId: "rainwear", audience: "kids", gsm: "240 GSM", moq: "600 Pcs", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80", colors: ["#FACC15", "#F43F5E", "#38BDF8"], sizes: ["2Y", "4Y", "6Y", "8Y"], isFeatured: false },

  // 10. LINGERIE
  { id: 1001, categoryId: "lingerie", audience: "women", gsm: "19 Momme", moq: "300 Pcs", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80", colors: ["#FBCFE8", "#FFFFFF", "#0F172A", "#93C5FD"], sizes: ["XS", "S", "M", "L", "XL"], isFeatured: false },
  { id: 1002, categoryId: "lingerie", audience: "women", gsm: "180 GSM", moq: "800 Pcs", image: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=800&q=80", colors: ["#FDE68A", "#FFFFFF", "#0F172A", "#CBD5E1"], sizes: ["XS", "S", "M", "L"], isFeatured: false },

  // 11. BAGGAGE
  { id: 1101, categoryId: "baggage", audience: "men", gsm: "3.2 KG Empty", moq: "300 Pcs", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80", colors: ["#0F172A", "#475569", "#D97706"], sizes: ["20 Inch", "24 Inch", "28 Inch"], isFeatured: false },
  { id: 1102, categoryId: "baggage", audience: "men", gsm: "450 GSM", moq: "400 Pcs", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", colors: ["#78716C", "#1E293B", "#065F46"], sizes: ["45 Liters", "55 Liters"], isFeatured: false },

  // 12. HANDICRAFT
  { id: 1201, categoryId: "handicraft", audience: "women", gsm: "380 GSM", moq: "500 Pcs", image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80", colors: ["#D97706", "#78716C", "#FEF3C7"], sizes: ["Standard", "Large"], isFeatured: false },
  { id: 1202, categoryId: "handicraft", audience: "women", gsm: "Handmade", moq: "400 Pcs", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", colors: ["#FEF3C7", "#D97706"], sizes: ["Medium", "Large"], isFeatured: false },
];
