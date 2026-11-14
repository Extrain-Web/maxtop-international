// src/data/productsData.ts
// Real Apparel & Sourcing Assets matching SiATEX-style OEM/ODM manufacturing standards.

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

// ── ১. ১২টি আসল গার্মেন্টস ক্যাটাগরির অ্যাসেট (ক্লিন স্টুডিও অ্যাপারেল ছবি) ──
export const productCategoryAssets: ProductCategoryAsset[] = [
  {
    id: "tshirts",
    coverImg: "/images/1.jpg",
    bannerImg: "/images/8.jpg",
  },
  {
    id: "polos",
    coverImg: "/images/5.jpg",
    bannerImg: "/images/10.jpg",
  },
  {
    id: "hoodies",
    coverImg: "/images/12.png",
    bannerImg: "/images/11.jpg",
  },
  {
    id: "woven",
    coverImg: "/images/13.jpg",
    bannerImg: "/images/13.jpg",
  },
  {
    id: "denim",
    coverImg: "/images/18.jpg",
    bannerImg: "/images/19.jpg",
  },
  {
    id: "pants",
    coverImg: "/images/21.jpg",
    bannerImg: "/images/20.jpg",
  },
  {
    id: "sweaters",
    coverImg: "/images/14.avif",
    bannerImg: "/images/15.avif",
  },
  {
    id: "outerwear",
    coverImg: "/images/24.jpg",
    bannerImg: "/images/24.jpg",
  },
  {
    id: "activewear",
    coverImg: "/images/22.jpg",
    bannerImg: "/images/22.jpg",
  },
  {
    id: "sleepwear",
    coverImg: "/images/23.jpg",
    bannerImg: "/images/23.jpg",
  },
  {
    id: "kids",
    coverImg: "/images/4.jpg",
    bannerImg: "/images/4.jpg",
  },
  {
    id: "workwear",
    coverImg: "/images/25.jpg",
    bannerImg: "/images/25.jpg",
  },
];

// ── ২. প্রোডাক্ট অ্যাসেট (ক্লিন হ্যাঙ্গার / ফ্ল্যাট-লে স্টুডিও ফটো, কোনো ফেস বা জিম বিশৃঙ্খলা নেই) ──
export const productAssets: ProductItemAsset[] = [
  // 1. T-SHIRTS & TANKS
  { id: 101, categoryId: "tshirts", audience: "men", gsm: "220 GSM", moq: "500 Pcs", image: "/images/1.jpg", colors: ["#0F172A", "#FFFFFF", "#334155", "#059669"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 102, categoryId: "tshirts", audience: "women", gsm: "180 GSM", moq: "500 Pcs", image: "/images/2.jpg", colors: ["#FFFFFF", "#F43F5E", "#E2E8F0", "#0F172A"], sizes: ["XS", "S", "M", "L", "XL"], isFeatured: true },
  { id: 103, categoryId: "tshirts", audience: "men", gsm: "260 GSM", moq: "600 Pcs", image: "/images/3.jpg", colors: ["#18181B", "#27272A", "#52525B", "#FFFFFF"], sizes: ["S", "M", "L", "XL", "2XL", "3XL"], isFeatured: true },
  { id: 104, categoryId: "tshirts", audience: "kids", gsm: "160 GSM", moq: "500 Pcs", image: "/images/4.jpg", colors: ["#38BDF8", "#F472B6", "#FBBF24", "#FFFFFF"], sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"], isFeatured: false },

  // 2. POLO SHIRTS
  { id: 201, categoryId: "polos", audience: "men", gsm: "220 GSM", moq: "500 Pcs", image: "/images/5.jpg", colors: ["#0B2B43", "#FFFFFF", "#B91C1C", "#047857"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 202, categoryId: "polos", audience: "men", gsm: "180 GSM", moq: "600 Pcs", image: "/images/9.jpg", colors: ["#1E293B", "#38BDF8", "#FFFFFF", "#64748B"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: false },
  { id: 203, categoryId: "polos", audience: "women", gsm: "200 GSM", moq: "500 Pcs", image: "/images/10.jpg", colors: ["#FFFFFF", "#F43F5E", "#0F172A", "#CBD5E1"], sizes: ["XS", "S", "M", "L"], isFeatured: false },

  // 3. HOODIES & SWEATSHIRTS
  { id: 301, categoryId: "hoodies", audience: "men", gsm: "340 GSM", moq: "500 Pcs", image: "/images/11.jpg", colors: ["#1E293B", "#475569", "#78716C", "#0F172A"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 302, categoryId: "hoodies", audience: "women", gsm: "300 GSM", moq: "500 Pcs", image: "/images/12.png", colors: ["#FEF3C7", "#F1F5F9", "#0F172A", "#FB7185"], sizes: ["XS", "S", "M", "L"], isFeatured: true },
  { id: 303, categoryId: "hoodies", audience: "men", gsm: "360 GSM", moq: "500 Pcs", image: "/images/6.jpg", colors: ["#0F172A", "#1E3A8A", "#065F46"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: false },

  // 4. WOVEN SHIRTS
  { id: 401, categoryId: "woven", audience: "men", gsm: "140 GSM", moq: "600 Pcs", image: "/images/13.jpg", colors: ["#FFFFFF", "#93C5FD", "#CBD5E1", "#FDBA74"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 402, categoryId: "woven", audience: "men", gsm: "120 GSM", moq: "600 Pcs", image: "/images/7.jpg", colors: ["#FFFFFF", "#E2E8F0", "#1E3A8A"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 403, categoryId: "woven", audience: "women", gsm: "160 GSM", moq: "500 Pcs", image: "/images/16.avif", colors: ["#FEF3C7", "#FFFFFF", "#A7F3D0"], sizes: ["XS", "S", "M", "L"], isFeatured: false },

  // 5. DENIM & JEANS
  { id: 501, categoryId: "denim", audience: "men", gsm: "13.5 oz / 380 GSM", moq: "500 Pcs", image: "/images/18.jpg", colors: ["#1E3A8A", "#172554", "#475569"], sizes: ["30", "32", "34", "36", "38"], isFeatured: true },
  { id: 502, categoryId: "denim", audience: "women", gsm: "10.5 oz / 300 GSM", moq: "600 Pcs", image: "/images/19.jpg", colors: ["#1E3A8A", "#0F172A", "#64748B"], sizes: ["26", "28", "30", "32", "34"], isFeatured: true },
  { id: 503, categoryId: "denim", audience: "men", gsm: "12.5 oz / 350 GSM", moq: "500 Pcs", image: "/images/20.jpg", colors: ["#1E40AF", "#1E293B", "#94A3B8"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },

  // 6. PANTS & JOGGERS
  { id: 601, categoryId: "pants", audience: "men", gsm: "300 GSM", moq: "500 Pcs", image: "/images/21.jpg", colors: ["#1E293B", "#475569", "#78716C", "#0F172A"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 602, categoryId: "pants", audience: "men", gsm: "260 GSM", moq: "800 Pcs", image: "/images/22.jpg", colors: ["#D97706", "#1E293B", "#475569"], sizes: ["30", "32", "34", "36", "38"], isFeatured: false },
  { id: 603, categoryId: "pants", audience: "women", gsm: "240 GSM", moq: "500 Pcs", image: "/images/17.avif", colors: ["#0F172A", "#E2E8F0", "#F43F5E"], sizes: ["XS", "S", "M", "L"], isFeatured: false },

  // 7. SWEATERS & KNITWEAR
  { id: 701, categoryId: "sweaters", audience: "men", gsm: "380 GSM", moq: "500 Pcs", image: "/images/14.avif", colors: ["#D97706", "#1E293B", "#E2E8F0"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 702, categoryId: "sweaters", audience: "women", gsm: "320 GSM", moq: "500 Pcs", image: "/images/15.avif", colors: ["#FEF3C7", "#94A3B8", "#1E293B"], sizes: ["XS", "S", "M", "L"], isFeatured: false },

  // 8. JACKETS & OUTERWEAR
  { id: 801, categoryId: "outerwear", audience: "men", gsm: "350 GSM", moq: "500 Pcs", image: "/images/24.jpg", colors: ["#0F172A", "#1E3A8A", "#B91C1C"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 802, categoryId: "outerwear", audience: "women", gsm: "280 GSM", moq: "500 Pcs", image: "/images/17.avif", colors: ["#0F172A", "#F43F5E", "#FFFFFF"], sizes: ["XS", "S", "M", "L"], isFeatured: false },

  // 9. ACTIVEWEAR & SPORTSWEAR
  { id: 901, categoryId: "activewear", audience: "men", gsm: "160 GSM", moq: "600 Pcs", image: "/images/8.jpg", colors: ["#0F172A", "#2563EB", "#059669"], sizes: ["S", "M", "L", "XL", "2XL"], isFeatured: true },
  { id: 902, categoryId: "activewear", audience: "women", gsm: "260 GSM", moq: "500 Pcs", image: "/images/22.jpg", colors: ["#0F172A", "#7C3AED", "#475569"], sizes: ["XS", "S", "M", "L"], isFeatured: true },

  // 10. LOUNGEWEAR & SLEEPWEAR
  { id: 1001, categoryId: "sleepwear", audience: "women", gsm: "180 GSM", moq: "500 Pcs", image: "/images/23.jpg", colors: ["#FEF3C7", "#FBCFE8", "#FFFFFF"], sizes: ["XS", "S", "M", "L"], isFeatured: false },
  { id: 1002, categoryId: "sleepwear", audience: "men", gsm: "190 GSM", moq: "500 Pcs", image: "/images/1.jpg", colors: ["#0F172A", "#334155", "#64748B"], sizes: ["S", "M", "L", "XL"], isFeatured: false },

  // 11. KIDS & BABYWEAR
  { id: 1101, categoryId: "kids", audience: "kids", gsm: "180 GSM", moq: "500 Pcs", image: "/images/4.jpg", colors: ["#38BDF8", "#F472B6", "#FBBF24"], sizes: ["0-3M", "3-6M", "6-12M", "12-18M"], isFeatured: true },
  { id: 1102, categoryId: "kids", audience: "kids", gsm: "160 GSM", moq: "600 Pcs", image: "/images/2.jpg", colors: ["#DC2626", "#2563EB", "#059669"], sizes: ["2Y", "4Y", "6Y", "8Y"], isFeatured: false },

  // 12. WORKWEAR & UNIFORMS
  { id: 1201, categoryId: "workwear", audience: "men", gsm: "300 GSM", moq: "500 Pcs", image: "/images/25.jpg", colors: ["#FACC15", "#FB923C"], sizes: ["S", "M", "L", "XL", "2XL", "3XL"], isFeatured: true },
  { id: 1202, categoryId: "workwear", audience: "men", gsm: "280 GSM", moq: "600 Pcs", image: "/images/25.jpg", colors: ["#1E293B", "#334155", "#78716C"], sizes: ["30", "32", "34", "36", "38"], isFeatured: false },
];
