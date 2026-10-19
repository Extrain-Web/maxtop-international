import {
  Scissors,
  Layers,
  SearchCheck,
  FlaskConical,
  Ship,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

// Non-translatable assets for each service card. The translatable text
// (title, category, desc, deliverables, tags) lives in the i18n dictionaries
// under `services.items` and is merged by index inside the component.
export interface ServiceAsset {
  id: string;
  num: string;
  icon: LucideIcon;
  image: string;
}

export const serviceAssets: ServiceAsset[] = [
  {
    id: "design-sampling",
    num: "01",
    icon: Scissors,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fabric-procurement",
    num: "02",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "quality-control",
    num: "03",
    icon: SearchCheck,
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "textile-testing",
    num: "04",
    icon: FlaskConical,
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "logistics-shipping",
    num: "05",
    icon: Ship,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ethical-compliance",
    num: "06",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
];
