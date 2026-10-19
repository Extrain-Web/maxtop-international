import {
  HelpCircle,
  Users,
  ClipboardCheck,
  ShieldCheck,
  Truck,
  Headphones,
  type LucideIcon,
} from "lucide-react";

// Non-translatable assets for the "How We Work" wheel steps. Translatable text
// (shortTitle, fullTitle, timeline, summary, deliverables) lives in the i18n
// dictionaries under `howWeWork.steps` and is merged by index in the component.
export interface WorkStepAsset {
  id: number;
  stepNumber: string;
  icon: LucideIcon;
}

export const howWeWorkAssets: WorkStepAsset[] = [
  { id: 1, stepNumber: "1", icon: HelpCircle },
  { id: 2, stepNumber: "2", icon: Users },
  { id: 3, stepNumber: "3", icon: ClipboardCheck },
  { id: 4, stepNumber: "4", icon: ShieldCheck },
  { id: 5, stepNumber: "5", icon: Truck },
  { id: 6, stepNumber: "6", icon: Headphones },
];
