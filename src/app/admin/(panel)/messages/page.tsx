"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Mail, Trash2, Archive, CheckCheck, Building2, Globe, Package, Hash, Phone, Inbox, ChevronLeft } from "lucide-react";
import { api, errMsg, formatDate } from "../../_lib/client";
import type { MessageDoc } from "../../_lib/types";
import { useAdmin } from "../../_components/AdminShell";
import { Badge, Button, Card, Empty, Input, Modal, PageHeader, Select, Spinner, Textarea, cx, useToast } from "../../_components/ui";

const STATUS_TABS = [
  { value: "", label: "Inbox" },
  { value: "new", label: "New" },
  { value: "replied", label: "Replied" },
  { value: "archived", label: "Archived" },
];
const SOURCE: Record<string, { label: string; tone: "green" | "blue" | "amber" }> = {
  contact: { label: "Contact form", tone: "blue" },
  rfq: { label: "RFQ", tone: "amber" },
  product: { label: "Product inquiry", tone: "green" },
};
const STATUS_TONE = { new: "green", read: "slate", replied: "blue", archived: "slate" } as const;

export default function MessagesPage() {
  const { refreshCounts } = useAdmin();
  const toast = useToast();
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: MessageDoc[]; total: number; pages: number } | null>(null);
  const [open, setOpen] = useState<MessageDoc | null>(null);
  const [note, setNote] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = useCallback(() => {
    const p = new URLSearchParams({ page: String(page) });
    if (status) p.set("status", status);
    if (source) p.set("source", source);
    if (q.trim()) p.set("q", q.trim());
    api<{ items: MessageDoc[]; total: number; pages: number }>(`/admin/messages?${p}`)
      .then(setData)
      .catch((e) => toast("error", errMsg(e)));
  }, [page, status, source, q, toast]);

  useEffect(() => {
    const t = setTimeout(load, q ? 300 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  const openMessage = useCallback(
    async (id: string) => {
      try {
        const { message } = await api<{ message: MessageDoc }>(`/admin/messages/${id}`);
        setOpen(message);
        setNote(message.note ?? "");
        refreshCounts();
        setData((d) => d && { ...d, items: d.items.map((m) => (m._id === id ? message : m)) });
      } catch (e) {
        toast("error", errMsg(e));
      }
    },
    [refreshCounts, toast]
  );

  // deep link from the dashboard: /admin/messages?open=<id>
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("open");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- state is set after the fetch resolves
    if (id) openMessage(id);
  }, [openMessage]);

  const update = async (patch: Partial<MessageDoc>) => {
    if (!open) return;
    try {
      const { message } = await api<{ message: MessageDoc }>(`/admin/messages/${open._id}`, { method: "PATCH", body: patch });
      setOpen(message);
      toast("ok", "Update hoyeche");
      refreshCounts();
      load();
    } catch (e) {
      toast("error", errMsg(e));
    }
  };

  const remove = async () => {
    if (!open) return;
    try {
      await api(`/admin/messages/${open._id}`, { method: "DELETE" });
      toast("ok", "Message delete hoyeche");
      setConfirmDelete(false);
      setOpen(null);
      refreshCounts();
      load();
    } catch (e) {
      toast("error", errMsg(e));
    }
  };

  const detail = open && (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{open.name}</h2>
          <a href={`mailto:${open.email}`} className="text-sm text-emerald-700 hover:underline break-all">
            {open.email}
          </a>
        </div>
        <Badge tone={SOURCE[open.source]?.tone}>{SOURCE[open.source]?.label}</Badge>
      </div>
      <dl className="grid sm:grid-cols-2 gap-3 text-sm">
        {[
          { icon: Building2, label: "Company", v: open.company },
          { icon: Globe, label: "Country", v: open.country },
          { icon: Phone, label: "Phone", v: open.phone },
          { icon: Package, label: "Product / Category", v: open.category },
          { icon: Hash, label: "Quantity", v: open.quantity },
        ]
          .filter((r) => r.v)
          .map((r) => (
            <div key={r.label} className="rounded-lg bg-slate-50 px-3 py-2">
              <dt className="text-[11px] text-slate-500 flex items-center gap-1">
                <r.icon className="w-3 h-3" /> {r.label}
              </dt>
              <dd className="font-medium text-slate-800 break-words">{r.v}</dd>
            </div>
          ))}
      </dl>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Message</p>
        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed rounded-lg border border-slate-200 p-3">{open.message || "—"}</p>
      </div>
      <p className="text-xs text-slate-400">Received: {formatDate(open.createdAt)}</p>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Internal note (shudhu admin dekhbe)</p>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Jemon: price quote pathano hoyeche 12 Nov" />
        {note !== (open.note ?? "") && (
          <Button size="sm" variant="secondary" className="mt-2" onClick={() => update({ note })}>
            Save note
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        <a
          href={`mailto:${open.email}?subject=${encodeURIComponent("Re: Your inquiry — Maxtop International")}`}
          onClick={() => open.status !== "replied" && update({ status: "replied" })}
        >
          <Button size="sm">
            <Mail className="w-3.5 h-3.5" /> Reply by email
          </Button>
        </a>
        {open.status !== "replied" && (
          <Button size="sm" variant="secondary" onClick={() => update({ status: "replied" })}>
            <CheckCheck className="w-3.5 h-3.5" /> Mark replied
          </Button>
        )}
        {open.status !== "archived" ? (
          <Button size="sm" variant="secondary" onClick={() => update({ status: "archived" })}>
            <Archive className="w-3.5 h-3.5" /> Archive
          </Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={() => update({ status: "read" })}>
            <Inbox className="w-3.5 h-3.5" /> Inbox e ferot
          </Button>
        )}
        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setConfirmDelete(true)}>
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader title="Messages" description="Website er Contact form, RFQ ar product price/sample request — sob ekhane ase." />
      <div className="grid xl:grid-cols-5 gap-6">
        <Card className={cx("xl:col-span-2 flex flex-col", open && "hidden xl:flex")}>
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {STATUS_TABS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    setStatus(t.value);
                    setPage(1);
                  }}
                  className={cx(
                    "flex-1 rounded-md px-2 py-1.5 text-xs font-semibold",
                    status === t.value ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Name, email, company…"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9"
                />
              </div>
              <Select
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  setPage(1);
                }}
                className="w-36"
              >
                <option value="">All types</option>
                {Object.entries(SOURCE).map(([k, s]) => (
                  <option key={k} value={k}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          {!data ? (
            <Spinner />
          ) : data.items.length === 0 ? (
            <Empty title="Kono message nai" />
          ) : (
            <ul className="divide-y divide-slate-100 flex-1">
              {data.items.map((m) => (
                <li key={m._id}>
                  <button
                    onClick={() => openMessage(m._id)}
                    className={cx("w-full text-left px-4 py-3 hover:bg-slate-50 flex gap-3", open?._id === m._id && "bg-emerald-50/60")}
                  >
                    <span className={cx("mt-1.5 w-2 h-2 rounded-full shrink-0", m.status === "new" ? "bg-emerald-500" : "bg-transparent")} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={cx("text-sm truncate", m.status === "new" ? "font-bold text-slate-900" : "font-medium text-slate-700")}>{m.name}</p>
                        <span className="text-[11px] text-slate-400 shrink-0">{formatDate(m.createdAt).split(",")[0]}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{m.company || m.email}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{m.category || m.message}</p>
                      <div className="flex gap-1 mt-1.5">
                        <Badge tone={SOURCE[m.source]?.tone}>{SOURCE[m.source]?.label}</Badge>
                        {m.status !== "new" && <Badge tone={STATUS_TONE[m.status]}>{m.status}</Badge>}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {data && data.pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-xs text-slate-500">
              <Button size="sm" variant="secondary" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Prev
              </Button>
              Page {page} / {data.pages}
              <Button size="sm" variant="secondary" disabled={page >= data.pages} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          )}
        </Card>

        <Card className={cx("xl:col-span-3 p-5 sm:p-6", !open && "hidden xl:block")}>
          {open ? (
            <>
              <button onClick={() => setOpen(null)} className="xl:hidden mb-4 text-xs font-semibold text-slate-500 flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              {detail}
            </>
          ) : (
            <Empty title="Ekta message select korun">Baam pasher list theke click korle details ekhane dekhabe.</Empty>
          )}
        </Card>
      </div>

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Message delete korben?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
              Na
            </Button>
            <Button variant="danger" onClick={remove}>
              Haa, delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">Eta permanently muche jabe. Shudhu lukate chaile &quot;Archive&quot; use korun.</p>
      </Modal>
    </>
  );
}
