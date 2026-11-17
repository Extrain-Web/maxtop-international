// Icon registry: the DB stores an icon *name*, the UI resolves it here.
import {
  Scissors, Layers, SearchCheck, FlaskConical, Ship, ShieldCheck, Truck, TrendingDown,
  Users, HelpCircle, ClipboardCheck, Headphones, Factory, Shirt, Package, Globe, Award,
  BadgeCheck, Leaf, Recycle, Clock, Handshake, Target, Gem, Sparkles, Zap, Ruler, Palette,
  Tag, Boxes, Warehouse, Plane, Anchor, Container, FileText, FileCheck, Microscope,
  Settings, Wrench, Hammer, Building2, Briefcase, Heart, Star, Smile, Phone, Mail, MapPin,
  MessageCircle, Lightbulb, Rocket, TrendingUp, BarChart3, PieChart, CheckCircle2,
  Thermometer, Droplets, Sun, Shield, Lock, Eye, Search, Calendar, Timer, Gauge, Cog,
  Network, Link, Flag, Medal, Trophy, Crown, DollarSign, Banknote, CreditCard, Wallet,
  ShoppingBag, ShoppingCart, Store, Scale,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Scissors, Layers, SearchCheck, FlaskConical, Ship, ShieldCheck, Truck, TrendingDown,
  Users, HelpCircle, ClipboardCheck, Headphones, Factory, Shirt, Package, Globe, Award,
  BadgeCheck, Leaf, Recycle, Clock, Handshake, Target, Gem, Sparkles, Zap, Ruler, Palette,
  Tag, Boxes, Warehouse, Plane, Anchor, Container, FileText, FileCheck, Microscope,
  Settings, Wrench, Hammer, Building2, Briefcase, Heart, Star, Smile, Phone, Mail, MapPin,
  MessageCircle, Lightbulb, Rocket, TrendingUp, BarChart3, PieChart, CheckCircle2,
  Thermometer, Droplets, Sun, Shield, Lock, Eye, Search, Calendar, Timer, Gauge, Cog,
  Network, Link, Flag, Medal, Trophy, Crown, DollarSign, Banknote, CreditCard, Wallet,
  ShoppingBag, ShoppingCart, Store, Scale,
};

export const ICON_NAMES = Object.keys(ICONS);

export function iconOf(name: unknown): LucideIcon {
  return (typeof name === "string" && ICONS[name]) || HelpCircle;
}

/** Reverse lookup used once while seeding from the static data files. */
export function iconNameOf(icon: unknown): string {
  for (const [name, comp] of Object.entries(ICONS)) if (comp === icon) return name;
  return "HelpCircle";
}
