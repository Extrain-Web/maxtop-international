import {
  ShieldCheck,
  Truck,
  TrendingDown,
  Users,
  type LucideIcon,
} from "lucide-react";

// Non-translatable assets for the "Why Choose Us" cards. Translatable text
// (title, desc, highlight) lives in the i18n dictionaries under
// `whyChooseUs.cards` and is merged by index inside the component.
export interface WhyChooseUsAsset {
  id: number;
  icon: LucideIcon;
}

export const whyChooseAssets: WhyChooseUsAsset[] = [
  { id: 1, icon: ShieldCheck },
  { id: 2, icon: Truck },
  { id: 3, icon: TrendingDown },
  { id: 4, icon: Users },
];
