// Global site settings (SEO + links) editable from Admin → Settings.

export const DEFAULT_SETTINGS = {
  siteUrl: "https://maxtopinternational.com",
  seoTitle: "Maxtop International Ltd. | Apparel Sourcing & Buying House",
  seoDescription:
    "Premier apparel sourcing agency and registered garments buying house in Dhaka, Bangladesh. Exporting Knitwear, Woven, Denim, and Sustainable Apparel globally.",
  seoKeywords: [
    "apparel sourcing agent Bangladesh",
    "garments buying house Dhaka",
    "clothing manufacturer Bangladesh",
    "knitwear sourcing",
    "denim manufacturer",
    "woven shirts supplier",
    "sustainable apparel manufacturing",
    "low MOQ garment sourcing",
    "AQL 2.5 quality inspection",
  ],
  ogTitle: "Maxtop International | Sustainable Apparel Sourcing from Bangladesh",
  ogDescription:
    "End-to-end garment sourcing solutions: R&D sampling, transparent FOB costing, certified factory production, and global shipping.",
  twitterTitle: "Maxtop International | Apparel Sourcing & Buying House",
  twitterDescription:
    "Certified sustainable garment manufacturing partner connecting global fashion brands with Bangladesh.",
  contactEmail: "sourcing@maxtopintl.com",
  contactPhone: "+880 1714-665444",
  whatsappUrl: "https://wa.me/+8801714665444",
  linkedinUrl: "https://linkedin.com",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  showStatsBanner: false,
  showGallery: false,
};

export const SETTINGS_FIELDS = [
  { name: "seoTitle", label: "Site Title (browser tab + Google)", type: "text", group: "SEO" },
  { name: "seoDescription", label: "Meta Description", type: "textarea", group: "SEO" },
  { name: "seoKeywords", label: "Keywords (prottek ta alada line e)", type: "list", group: "SEO" },
  { name: "siteUrl", label: "Website URL", type: "text", group: "SEO" },
  { name: "ogTitle", label: "Facebook/LinkedIn share title", type: "text", group: "Social Share" },
  { name: "ogDescription", label: "Facebook/LinkedIn share description", type: "textarea", group: "Social Share" },
  { name: "twitterTitle", label: "Twitter/X title", type: "text", group: "Social Share" },
  { name: "twitterDescription", label: "Twitter/X description", type: "textarea", group: "Social Share" },
  { name: "contactEmail", label: "Contact Email (Footer + Contact page)", type: "text", group: "Contact & Social Links" },
  { name: "contactPhone", label: "Phone Number (Footer + Contact page)", type: "text", group: "Contact & Social Links" },
  { name: "whatsappUrl", label: "WhatsApp link (https://wa.me/...)", type: "text", group: "Contact & Social Links" },
  { name: "linkedinUrl", label: "LinkedIn", type: "text", group: "Contact & Social Links" },
  { name: "facebookUrl", label: "Facebook", type: "text", group: "Contact & Social Links" },
  { name: "instagramUrl", label: "Instagram", type: "text", group: "Contact & Social Links" },
  { name: "youtubeUrl", label: "YouTube", type: "text", group: "Contact & Social Links" },
  { name: "showStatsBanner", label: "Home page e Stats Banner dekhao (7 Y+, 18+ countries...)", type: "checkbox", group: "Home Page Sections" },
  { name: "showGallery", label: "Home page e Factory Gallery dekhao", type: "checkbox", group: "Home Page Sections" },
];
