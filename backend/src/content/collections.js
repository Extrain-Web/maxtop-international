// ─────────────────────────────────────────────────────────────────────────────
// Collection definitions — shared by the server (seed/compose/validate) and the
// admin UI (form rendering). Client-safe: no server imports here.
//
// Every collection item has:
//   • "asset" fields  → language-independent (image, icon, id, colors…)
//   • t             → per-language text fields { en: {...}, bn: {...}, ... }
//
// Collections with a `dictPath` are merged back into the i18n dictionary at
// that path (the frontend components read them from `t.<path>` exactly as
// before). The others are exposed through `useSiteData()`.
// ─────────────────────────────────────────────────────────────────────────────

export const LOCALES = ["en", "bn", "ar", "fa"];

export const LOCALE_LABELS = {
  en: "English",
  bn: "বাংলা",
  ar: "العربية",
  fa: "فارسی",
};

export const COLLECTIONS = {
  productCategories: {
    key: "productCategories",
    label: "Product Categories",
    description: "Product er category gulo (T-Shirts, Polo, Denim...). Product add korar age category thakte hobe.",
    group: "Products",
    dictPath: ["productCategories"],
    idType: "slug",
    titleField: "name",
    imageField: "coverImg",
    fields: [
      { name: "coverImg", label: "Cover Image", type: "image", required: true },
      { name: "bannerImg", label: "Banner Image", type: "image", required: true },
    ],
    textFields: [
      { name: "name", label: "Short Name", type: "text", required: true },
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
    ],
  },
  productItems: {
    key: "productItems",
    label: "Products",
    description: "Sob product. Category, GSM, MOQ, color, size, image — sob ekhane theke change kora jabe.",
    group: "Products",
    dictPath: ["productItems"],
    idType: "number",
    titleField: "name",
    imageField: "image",
    fields: [
      { name: "categoryId", label: "Category", type: "select", optionsFrom: "productCategories", required: true },
      {
        name: "audience",
        label: "Audience",
        type: "select",
        required: true,
        options: [
          { value: "men", label: "Men" },
          { value: "women", label: "Women" },
          { value: "kids", label: "Kids" },
        ],
      },
      { name: "image", label: "Image", type: "image", required: true },
      { name: "gsm", label: "GSM / Weight", type: "text" },
      { name: "moq", label: "MOQ", type: "text" },
      { name: "colors", label: "Colors", type: "colors" },
      { name: "sizes", label: "Sizes", type: "list", help: "Prottek ta size alada line e" },
      { name: "isFeatured", label: "Featured (home page e dekhabe)", type: "checkbox" },
    ],
    textFields: [
      { name: "name", label: "Product Name", type: "text", required: true },
      { name: "desc", label: "Description", type: "textarea" },
      { name: "material", label: "Material", type: "text" },
    ],
  },
  services: {
    key: "services",
    label: "Services",
    description: "Home page er Services section er card gulo.",
    group: "Home Sections",
    dictPath: ["services", "items"],
    idType: "slug",
    titleField: "title",
    imageField: "image",
    iconField: "icon",
    fields: [
      { name: "num", label: "Number (01, 02…)", type: "text" },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "image", label: "Image", type: "image" },
    ],
    textFields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
      { name: "deliverables", label: "Deliverables", type: "list" },
      { name: "tags", label: "Tags", type: "list" },
    ],
  },
  howWeWork: {
    key: "howWeWork",
    label: "How We Work (Steps)",
    description: "\"How We Work\" wheel er step gulo.",
    group: "Home Sections",
    dictPath: ["howWeWork", "steps"],
    idType: "number",
    titleField: "shortTitle",
    iconField: "icon",
    fields: [
      { name: "stepNumber", label: "Step Number", type: "text" },
      { name: "icon", label: "Icon", type: "icon" },
    ],
    textFields: [
      { name: "shortTitle", label: "Short Title", type: "text", required: true },
      { name: "fullTitle", label: "Full Title", type: "text" },
      { name: "timeline", label: "Timeline", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "deliverables", label: "Deliverables", type: "list" },
    ],
  },
  whyChooseUs: {
    key: "whyChooseUs",
    label: "Why Choose Us",
    description: "\"Why Choose Us\" section er card gulo.",
    group: "Home Sections",
    dictPath: ["whyChooseUs", "cards"],
    idType: "number",
    titleField: "title",
    iconField: "icon",
    fields: [{ name: "icon", label: "Icon", type: "icon" }],
    textFields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "desc", label: "Description", type: "textarea" },
      { name: "highlight", label: "Highlight", type: "text" },
    ],
  },
  faq: {
    key: "faq",
    label: "FAQ",
    description: "Sourcing FAQ er prosno-uttor.",
    group: "Home Sections",
    dictPath: ["faq", "items"],
    idType: "none",
    titleField: "question",
    fields: [],
    textFields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
    ],
  },
  stats: {
    key: "stats",
    label: "Stats Banner",
    description: "Number gulo (7 Y+, 18+ countries...).",
    group: "Company",
    dictPath: null,
    idType: "number",
    titleField: "label",
    fields: [{ name: "value", label: "Value (e.g. 18+)", type: "text", required: true }],
    textFields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "subLabel", label: "Sub Label", type: "text" },
    ],
  },
  galleryCategories: {
    key: "galleryCategories",
    label: "Gallery Categories",
    description: "Gallery filter er tab gulo. Prothom ta (id: all) sob dekhay.",
    group: "Company",
    dictPath: null,
    idType: "slug",
    titleField: "label",
    fields: [],
    textFields: [{ name: "label", label: "Label", type: "text", required: true }],
  },
  gallery: {
    key: "gallery",
    label: "Gallery",
    description: "Factory / facility er chobi.",
    group: "Company",
    dictPath: null,
    idType: "slug",
    titleField: "title",
    imageField: "image",
    fields: [
      { name: "category", label: "Category", type: "select", optionsFrom: "galleryCategories", required: true },
      { name: "image", label: "Image", type: "image", required: true },
    ],
    textFields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "categoryLabel", label: "Category Label", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "machinery", label: "Machinery", type: "text" },
    ],
  },
  recognizedBy: {
    key: "recognizedBy",
    label: "Recognized By (Logos)",
    description: "Recognitions section er prothom row er logo.",
    group: "Company",
    dictPath: null,
    idType: "slug",
    titleField: "name",
    imageField: "image",
    fields: [{ name: "image", label: "Logo", type: "image", required: true }],
    textFields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tooltip", label: "Tooltip", type: "text" },
    ],
  },
  partnerCerts: {
    key: "partnerCerts",
    label: "Partner Certifications (Logos)",
    description: "Recognitions section er dwitiyo row er logo.",
    group: "Company",
    dictPath: null,
    idType: "slug",
    titleField: "name",
    imageField: "image",
    fields: [{ name: "image", label: "Logo", type: "image", required: true }],
    textFields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tooltip", label: "Tooltip", type: "text" },
    ],
  },
};

export const COLLECTION_KEYS = Object.keys(COLLECTIONS);

export function isCollectionKey(v) {
  return v in COLLECTIONS;
}

/** dictionary paths owned by collections (excluded from the "Page Texts" editor) */
export const COLLECTION_DICT_PATHS = COLLECTION_KEYS.map((k) => COLLECTIONS[k].dictPath)
  .filter(Boolean)
  .map((p) => p.join("."));
