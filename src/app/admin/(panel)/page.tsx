"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Shirt, FolderTree, FolderOpen, ArrowRight, Type, ImageIcon, Settings } from "lucide-react";
import { api, errMsg, formatDate } from "../_lib/client";
import type { MessageDoc } from "../_lib/types";
import { useAdmin } from "../_components/AdminShell";
import { Badge, Card, PageHeader, Spinner } from "../_components/ui";

interface Overview {
  counts: Record<string, number>;
  messages: { new: number; total: number; bySource: Record<string, number> };
  media: number;
  latest: MessageDoc[];
  perDay: Record<string, number>;
}

const SOURCE_LABEL: Record<string, string> = { contact: "Contact", rfq: "RFQ", product: "Product" };

function last14Days() {
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().slice(0, 10);
  });
}

/** Single-series bar chart: inquiries per day (last 14 days). */
function InquiryChart({ perDay }: { perDay: Record<string, number> }) {
  const days = last14Days();
  const values = days.map((d) => perDay[d] ?? 0);
  const max = Math.max(1, ...values);
  const [hover, setHover] = useState<number | null>(null);
  const total = values.reduce((a, b) => a + b, 0);
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="font-bold text-slate-900">Inquiries — last 14 days</h2>
          <p className="text-xs text-slate-500">{total} total</p>
        </div>
        <p className="text-xs text-slate-500 h-4" aria-live="polite">
          {hover !== null &&
            `${new Date(days[hover]).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}: ${values[hover]}`}
        </p>
      </div>
      <div className="relative h-40">
        {/* recessive gridlines */}
        {[0, 0.5, 1].map((p) => (
          <div key={p} className="absolute left-0 right-0 border-t border-dashed border-slate-100" style={{ bottom: `${p * 100}%` }}>
            <span className="absolute -top-2 -left-0 text-[10px] text-slate-400 bg-white pr-1">{Math.round(max * p)}</span>
          </div>
        ))}
        <div className="absolute inset-0 pl-6 flex items-end gap-[2px]" role="img" aria-label={`Inquiries per day, total ${total}`}>
          {values.map((v, i) => (
            <div
              key={days[i]}
              className="flex-1 h-full flex items-end cursor-default"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              title={`${days[i]}: ${v}`}
            >
              <div
                className={`w-full max-w-7 mx-auto rounded-t-[4px] transition-colors ${hover === i ? "bg-emerald-700" : "bg-emerald-500"}`}
                style={{ height: v ? `${(v / max) * 100}%` : "2px", opacity: v ? 1 : 0.25 }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pl-6 flex justify-between text-[10px] text-slate-400 mt-1.5">
        <span>{new Date(days[0]).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
        <span>Today</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { admin, refreshCounts } = useAdmin();
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Overview>("/admin/overview").then(setData).catch((e) => setError(errMsg(e)));
    refreshCounts();
  }, [refreshCounts]);

  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!data) return <Spinner />;

  const tiles = [
    { label: "New messages", value: data.messages.new, sub: `${data.messages.total} total inquiries`, icon: Inbox, href: "/admin/messages" },
    { label: "Products", value: data.counts.productItems ?? 0, sub: "Live on website", icon: Shirt, href: "/admin/collections/productItems" },
    { label: "Categories", value: data.counts.productCategories ?? 0, sub: "Product categories", icon: FolderTree, href: "/admin/collections/productCategories" },
    { label: "Media files", value: data.media, sub: "Uploaded images", icon: FolderOpen, href: "/admin/media" },
  ];

  return (
    <>
      <PageHeader title={`Assalamu Alaikum, ${admin.name} 👋`} description="Website er ekta overview. Baam pasher menu theke je kono kichu edit korte parben." />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href}>
            <Card className="p-5 hover:border-emerald-300 hover:shadow-md transition h-full">
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold text-slate-500">{t.label}</p>
                <t.icon className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mt-2 tabular-nums">{t.value}</p>
              <p className="text-xs text-slate-500 mt-1">{t.sub}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="p-5 lg:col-span-3">
          <InquiryChart perDay={data.perDay} />
          <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600">
            {Object.entries(SOURCE_LABEL).map(([k, label]) => (
              <span key={k}>
                {label}: <b className="text-slate-900 tabular-nums">{data.messages.bySource[k] ?? 0}</b>
              </span>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h2 className="font-bold text-slate-900">Latest inquiries</h2>
            <Link href="/admin/messages" className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {data.latest.length === 0 ? (
            <p className="px-5 pb-6 text-sm text-slate-500">Ekhono kono inquiry ase nai. Website er contact form theke ashle ekhane dekhabe.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.latest.map((m) => (
                <li key={m._id}>
                  <Link href={`/admin/messages?open=${m._id}`} className="flex items-start gap-3 px-5 py-3 hover:bg-slate-50">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {m.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-800 truncate">{m.name}</p>
                        {m.status === "new" && <Badge tone="green">New</Badge>}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{m.company || m.email}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">{formatDate(m.createdAt).split(",")[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <h2 className="font-bold text-slate-900 mt-8 mb-3">Quick links</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href: "/admin/texts", icon: Type, title: "Page Texts", desc: "Hero, About, Footer — sob lekha 4 bhashay" },
          { href: "/admin/images", icon: ImageIcon, title: "Site Images", desc: "Hero slider, banner, section er chobi" },
          { href: "/admin/settings", icon: Settings, title: "SEO & Settings", desc: "Google title, description, social link" },
        ].map((q) => (
          <Link key={q.href} href={q.href}>
            <Card className="p-4 flex gap-3 hover:border-emerald-300 transition h-full">
              <span className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <q.icon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-sm text-slate-800">{q.title}</p>
                <p className="text-xs text-slate-500">{q.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
