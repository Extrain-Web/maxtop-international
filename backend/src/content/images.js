// Registry of the fixed images used inside page sections (hero slides,
// banners…). Admin can replace any of them from "Site Images"; the `default`
// is the original design image, so nothing breaks if a key is never edited.

const U = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const SITE_IMAGES = [
  { key: "hero.slide1", group: "Home – Hero", label: "Hero slide 1", default: U("photo-1441986300917-64674bd600d8", 2000) },
  { key: "hero.slide2", group: "Home – Hero", label: "Hero slide 2", default: U("photo-1520006403909-838d6b92c22e", 2000) },
  { key: "hero.slide3", group: "Home – Hero", label: "Hero slide 3", default: U("photo-1576995853123-5a10305d93c0", 2000) },
  { key: "hero.slide4", group: "Home – Hero", label: "Hero slide 4", default: U("photo-1598033129183-c4f50c736f10", 2000) },

  { key: "about.main", group: "Home – About", label: "About main image", default: U("photo-1593030761757-71fae45fa0e7", 1000) },
  { key: "about.secondary", group: "Home – About", label: "About small image", default: U("photo-1558769132-cb1aea458c5e", 600) },
  { key: "about.spin1", group: "Home – About (spinning wheel)", label: "Wheel product 1", default: U("photo-1551028719-00167b16eac5", 400) },
  { key: "about.spin2", group: "Home – About (spinning wheel)", label: "Wheel product 2", default: U("photo-1541099649105-f69ad21f3246", 400) },
  { key: "about.spin3", group: "Home – About (spinning wheel)", label: "Wheel product 3", default: U("photo-1581655353564-df123a1eb820", 400) },
  { key: "about.spin4", group: "Home – About (spinning wheel)", label: "Wheel product 4", default: U("photo-1602810318383-e386cc2a3ccf", 400) },
  { key: "about.spin5", group: "Home – About (spinning wheel)", label: "Wheel product 5", default: U("photo-1556905055-8f358a7a47b2", 400) },
  { key: "about.spin6", group: "Home – About (spinning wheel)", label: "Wheel product 6", default: U("photo-1515886657613-9f3515b0c78f", 400) },
  { key: "about.spin7", group: "Home – About (spinning wheel)", label: "Wheel product 7", default: U("photo-1624378439575-d8705ad7ae80", 400) },
  { key: "about.spin8", group: "Home – About (spinning wheel)", label: "Wheel product 8", default: U("photo-1553062407-98eeb64c6a62", 400) },

  { key: "faq.side", group: "Home – FAQ", label: "FAQ side image", default: "/images/interfaq.png" },

  { key: "aboutPage.hero", group: "About page", label: "Hero background", default: U("photo-1486406146926-c627a92ad1ab") },
  { key: "productsPage.hero", group: "Products page", label: "Hero background", default: U("photo-1441986300917-64674bd600d8") },
  { key: "contactPage.hero", group: "Contact page", label: "Hero background", default: U("photo-1441986300917-64674bd600d8") },

  { key: "servicesPage.hero", group: "Services page", label: "Hero background", default: U("photo-1441986300917-64674bd600d8", 1920) },
  { key: "servicesPage.cta", group: "Services page", label: "Bottom CTA background", default: U("photo-1441986300917-64674bd600d8") },
  { key: "servicesPage.core1", group: "Services page", label: "Core service 1", default: U("photo-1607613009820-a29f7bb81c04", 800) },
  { key: "servicesPage.core2", group: "Services page", label: "Core service 2", default: U("photo-1558769132-cb1aea458c5e", 800) },
  { key: "servicesPage.core3", group: "Services page", label: "Core service 3", default: U("photo-1581655353564-df123a1eb820", 800) },
  { key: "servicesPage.core4", group: "Services page", label: "Core service 4", default: U("photo-1594938298603-c8148c4dae35", 800) },
  { key: "servicesPage.core5", group: "Services page", label: "Core service 5", default: U("photo-1541099649105-f69ad21f3246", 800) },
  { key: "servicesPage.core6", group: "Services page", label: "Core service 6", default: U("photo-1586528116311-ad8dd3c8310d", 800) },
];

export function defaultSiteImages() {
  return Object.fromEntries(SITE_IMAGES.map((i) => [i.key, i.default]));
}
