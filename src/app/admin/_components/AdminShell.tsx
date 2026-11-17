"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Shirt,
  FolderTree,
  Briefcase,
  Workflow,
  ThumbsUp,
  HelpCircle,
  BarChart3,
  Images,
  Tags,
  Award,
  BadgeCheck,
  Type,
  ImageIcon,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { api, errMsg } from "../_lib/client";
import type { AdminUser, Meta } from "../_lib/types";
import { COLLECTION_NAV } from "../_lib/types";
import { ToastProvider, cx } from "./ui";

interface AdminCtx {
  admin: AdminUser;
  meta: Meta;
  newMessages: number;
  refreshCounts: () => void;
  setAdmin: (a: AdminUser) => void;
}
const Ctx = createContext<AdminCtx | null>(null);
export const useAdmin = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAdmin outside AdminShell");
  return c;
};

const COLLECTION_ICONS: Record<string, LucideIcon> = {
  productItems: Shirt,
  productCategories: FolderTree,
  services: Briefcase,
  howWeWork: Workflow,
  whyChooseUs: ThumbsUp,
  faq: HelpCircle,
  stats: BarChart3,
  gallery: Images,
  galleryCategories: Tags,
  recognizedBy: Award,
  partnerCerts: BadgeCheck,
};

type NavItem = { href: string; label: string; icon: LucideIcon; badge?: boolean };

function navGroups(): { title?: string; items: NavItem[] }[] {
  const groups: Record<string, NavItem[]> = {};
  for (const c of COLLECTION_NAV)
    (groups[c.group] ??= []).push({ href: `/admin/collections/${c.key}`, label: c.label, icon: COLLECTION_ICONS[c.key] ?? Tags });
  return [
    {
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/messages", label: "Messages", icon: Inbox, badge: true },
      ],
    },
    ...Object.entries(groups).map(([title, items]) => ({ title, items })),
    {
      title: "Website",
      items: [
        { href: "/admin/texts", label: "Page Texts", icon: Type },
        { href: "/admin/images", label: "Site Images", icon: ImageIcon },
        { href: "/admin/media", label: "Media Library", icon: FolderOpen },
        { href: "/admin/settings", label: "Settings", icon: Settings },
      ],
    },
  ];
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [error, setError] = useState("");
  const [newMessages, setNewMessages] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const refreshCounts = useCallback(() => {
    api<{ total: number }>("/admin/messages?status=new&limit=1")
      .then((r) => setNewMessages(r.total))
      .catch(() => {});
  }, []);

  useEffect(() => {
    Promise.all([api<{ admin: AdminUser }>("/auth/me"), api<Meta>("/admin/meta")])
      .then(([me, m]) => {
        setAdmin(me.admin);
        setMeta(m);
        refreshCounts();
      })
      .catch((e) => setError(errMsg(e)));
  }, [refreshCounts]);

  const logout = async () => {
    await api("/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
  };

  if (!admin || !meta) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 text-sm text-slate-500 p-6 text-center">
        {error ? <p className="max-w-sm">{error}</p> : <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />}
      </div>
    );
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const sidebar = (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
      {navGroups().map((g, i) => (
        <div key={i}>
          {g.title && <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{g.title}</p>}
          <ul className="space-y-0.5">
            {g.items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setMobileOpen(false)}
                  className={cx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition",
                    isActive(it.href) ? "bg-emerald-500/15 text-emerald-300" : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <it.icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{it.label}</span>
                  {it.badge && newMessages > 0 && (
                    <span className="min-w-5 h-5 px-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {newMessages}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  const brand = (
    <div className="h-16 flex items-center gap-3 px-5 border-b border-white/10">
      <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-white">M</div>
      <div className="leading-tight">
        <p className="text-sm font-bold text-white">Maxtop International</p>
        <p className="text-[11px] text-slate-400">Admin Panel</p>
      </div>
    </div>
  );

  return (
    <Ctx.Provider value={{ admin, meta, newMessages, refreshCounts, setAdmin }}>
      <ToastProvider>
        <div className="min-h-screen w-full bg-slate-50 flex text-slate-800">
          {/* desktop sidebar */}
          <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-[#071D2E] fixed inset-y-0 left-0 z-30">
            {brand}
            {sidebar}
          </aside>

          {/* mobile drawer */}
          {mobileOpen && (
            <div className="lg:hidden fixed inset-0 z-40">
              <div className="absolute inset-0 bg-slate-900/60" onClick={() => setMobileOpen(false)} />
              <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-[#071D2E] flex flex-col">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-3 p-1.5 text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
                {brand}
                {sidebar}
              </aside>
            </div>
          )}

          <div className="flex-1 min-w-0 lg:pl-64 flex flex-col">
            <header className="h-16 sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 flex items-center gap-3 px-4 sm:px-6">
              <button className="lg:hidden p-2 -ml-2 text-slate-600" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex-1" />
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View website
              </a>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
                  {admin.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="hidden sm:block leading-tight">
                  <p className="text-xs font-semibold text-slate-800">{admin.name}</p>
                  <p className="text-[11px] text-slate-500">{admin.email}</p>
                </div>
              </div>
              <button onClick={logout} className="p-2 text-slate-500 hover:text-red-600" title="Logout" aria-label="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">{children}</main>
          </div>
        </div>
      </ToastProvider>
    </Ctx.Provider>
  );
}
