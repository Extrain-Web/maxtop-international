"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Search, Languages, Star, ImageOff } from "lucide-react";
import { iconOf } from "@/lib/content/icons";
import type { ContentLocale } from "@/lib/content/types";
import { api, errMsg } from "../_lib/client";
import type { CollectionDef, CollectionItem } from "../_lib/types";
import { useAdmin } from "./AdminShell";
import { FieldInput } from "./inputs";
import { Badge, Button, Card, Empty, Input, Label, Modal, PageHeader, Select, Spinner, cx, useToast } from "./ui";

const RTL: ContentLocale[] = ["ar", "fa"];

function emptyItem(def: CollectionDef, locales: ContentLocale[]): Partial<CollectionItem> {
  const item: Partial<CollectionItem> = { t: {} };
  for (const f of def.fields) item[f.name] = f.type === "list" || f.type === "colors" ? [] : f.type === "checkbox" ? false : "";
  for (const l of locales)
    item.t![l] = Object.fromEntries(def.textFields.map((f) => [f.name, f.type === "list" ? [] : ""]));
  return item;
}

const titleOf = (def: CollectionDef, item: Partial<CollectionItem>) =>
  String(item.t?.en?.[def.titleField] ?? item.id ?? "Untitled") || "Untitled";

// ── Editor modal ────────────────────────────────────────────────────────────
function ItemEditor({
  def,
  initial,
  relations,
  onClose,
  onSaved,
}: {
  def: CollectionDef;
  initial: Partial<CollectionItem>;
  relations: Record<string, CollectionItem[]>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { meta } = useAdmin();
  const toast = useToast();
  const [item, setItem] = useState<Partial<CollectionItem>>(() => JSON.parse(JSON.stringify(initial)));
  const [locale, setLocale] = useState<ContentLocale>("en");
  const [saving, setSaving] = useState(false);
  const isNew = !initial._id;

  const setField = (name: string, v: unknown) => setItem((it) => ({ ...it, [name]: v }));
  const setText = (name: string, v: unknown) =>
    setItem((it) => ({ ...it, t: { ...it.t, [locale]: { ...(it.t?.[locale] ?? {}), [name]: v } } }));

  const copyFromEnglish = () =>
    setItem((it) => ({ ...it, t: { ...it.t, [locale]: JSON.parse(JSON.stringify(it.t?.en ?? {})) } }));

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) await api(`/admin/collections/${def.key}`, { body: item });
      else await api(`/admin/collections/${def.key}/${initial._id}`, { method: "PUT", body: item });
      toast("ok", isNew ? "Notun item add hoyeche — website e live" : "Save hoyeche — website e live");
      onSaved();
    } catch (e) {
      toast("error", errMsg(e));
      setSaving(false);
    }
  };

  const filled = (l: ContentLocale) =>
    def.textFields.some((f) => {
      const v = item.t?.[l]?.[f.name];
      return Array.isArray(v) ? v.length > 0 : !!String(v ?? "").trim();
    });

  return (
    <Modal
      open
      onClose={onClose}
      wide
      title={isNew ? `New — ${def.label}` : `Edit — ${titleOf(def, initial)}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} loading={saving}>
            {isNew ? "Add" : "Save changes"}
          </Button>
        </>
      }
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* language independent fields */}
        <div className="space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Details (sob bhashay same)</p>
          {def.idType === "slug" && (
            <div>
              <Label required help="Choto haater English, space er bodole dash (-). Jemon: t-shirts">
                ID / Slug
              </Label>
              <Input value={String(item.id ?? "")} onChange={(e) => setField("id", e.target.value)} placeholder="e.g. t-shirts" />
            </div>
          )}
          {def.fields.map((f) => (
            <FieldInput key={f.name} field={f} value={item[f.name]} onChange={(v) => setField(f.name, v)} relationOptions={relations} />
          ))}
          {def.fields.length === 0 && def.idType !== "slug" && (
            <p className="text-sm text-slate-500">Ei item er shudhu lekha ase — dan pashe edit korun.</p>
          )}
        </div>

        {/* per-language text */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" /> Lekha (bhasha onujayi)
            </p>
            {locale !== "en" && (
              <button type="button" onClick={copyFromEnglish} className="text-[11px] font-semibold text-emerald-700 hover:underline">
                English theke copy
              </button>
            )}
          </div>
          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
            {meta.locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                className={cx(
                  "flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition relative",
                  locale === l ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-800"
                )}
              >
                {meta.localeLabels[l]}
                {!filled(l) && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" title="Empty — English dekhabe" />}
              </button>
            ))}
          </div>
          {locale !== "en" && (
            <p className="text-[11px] text-slate-500 -mt-2">Khali rakhle website e English lekha dekhabe.</p>
          )}
          <div key={locale} className="space-y-4">
            {def.textFields.map((f) => (
              <FieldInput
                key={f.name}
                field={{ ...f, required: f.required && locale === "en" }}
                value={item.t?.[locale]?.[f.name]}
                onChange={(v) => setText(f.name, v)}
                dir={RTL.includes(locale) ? "rtl" : "ltr"}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ── List page ───────────────────────────────────────────────────────────────
export default function CollectionManager({ collectionKey }: { collectionKey: string }) {
  const { meta } = useAdmin();
  const toast = useToast();
  const def = meta.collections[collectionKey];
  const [items, setItems] = useState<CollectionItem[] | null>(null);
  const [relations, setRelations] = useState<Record<string, CollectionItem[]>>({});
  const [editing, setEditing] = useState<Partial<CollectionItem> | null>(null);
  const [deleting, setDeleting] = useState<CollectionItem | null>(null);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");

  const relationField = def?.fields.find((f) => f.optionsFrom);

  const load = useCallback(async () => {
    if (!def) return;
    const res = await api<{ items: CollectionItem[] }>(`/admin/collections/${def.key}`);
    setItems(res.items);
    const rel: Record<string, CollectionItem[]> = {};
    for (const f of def.fields)
      if (f.optionsFrom) rel[f.optionsFrom] = (await api<{ items: CollectionItem[] }>(`/admin/collections/${f.optionsFrom}`)).items;
    setRelations(rel);
  }, [def]);

  useEffect(() => {
    // state is only set after the awaited API responses inside load()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load().catch((e) => toast("error", errMsg(e)));
  }, [load, toast]);

  const visible = useMemo(() => {
    if (!items || !def) return [];
    const needle = q.trim().toLowerCase();
    return items.filter(
      (it) =>
        (!filter || String(it[relationField?.name ?? ""]) === filter) &&
        (!needle || JSON.stringify(it.t?.en ?? {}).toLowerCase().includes(needle) || String(it.id).includes(needle))
    );
  }, [items, q, filter, def, relationField]);

  if (!def) return <Empty title="Ei section ta paoa jay nai" />;

  const move = async (index: number, dir: -1 | 1) => {
    if (!items) return;
    const next = [...items];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    setItems(next);
    try {
      await api(`/admin/collections/${def.key}/order`, { method: "PUT", body: { ids: next.map((i) => i._id) } });
    } catch (e) {
      toast("error", errMsg(e));
      load();
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await api(`/admin/collections/${def.key}/${deleting._id}`, { method: "DELETE" });
      toast("ok", "Delete hoyeche");
      setDeleting(null);
      load();
    } catch (e) {
      toast("error", errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  const relLabel = (it: CollectionItem) => {
    if (!relationField?.optionsFrom) return null;
    const parent = relations[relationField.optionsFrom]?.find((p) => String(p.id) === String(it[relationField.name]));
    return parent ? String(parent.t?.en?.name ?? parent.t?.en?.label ?? parent.id) : String(it[relationField.name] ?? "");
  };

  const canReorder = !q && !filter;

  return (
    <>
      <PageHeader
        title={def.label}
        description={def.description}
        actions={
          <Button onClick={() => setEditing(emptyItem(def, meta.locales))}>
            <Plus className="w-4 h-4" /> Add new
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          {relationField?.optionsFrom && (
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="sm:w-56">
              <option value="">All {relationField.label.toLowerCase()}</option>
              {(relations[relationField.optionsFrom] ?? []).map((p) => (
                <option key={p._id} value={String(p.id)}>
                  {String(p.t?.en?.name ?? p.t?.en?.label ?? p.id)}
                </option>
              ))}
            </Select>
          )}
        </div>

        {!items ? (
          <Spinner />
        ) : visible.length === 0 ? (
          <Empty title={items.length ? "Kichu paoa jay nai" : "Ekhono kono item nai"}>
            {!items.length && "\"Add new\" button e click kore prothom item add korun."}
          </Empty>
        ) : (
          <ul className="divide-y divide-slate-100">
            {visible.map((it) => {
              const index = items.indexOf(it);
              const img = def.imageField ? String(it[def.imageField] ?? "") : "";
              const Icon = def.iconField ? iconOf(it[def.iconField]) : null;
              const missing = meta.locales.filter((l) => l !== "en" && !String(it.t?.[l]?.[def.titleField] ?? "").trim());
              return (
                <li key={it._id} className="flex items-center gap-3 sm:gap-4 px-4 py-3 hover:bg-slate-50/70">
                  {canReorder && (
                    <div className="flex flex-col">
                      <button onClick={() => move(index, -1)} disabled={index === 0} className="p-0.5 text-slate-300 hover:text-slate-700 disabled:opacity-30" aria-label="Move up">
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="p-0.5 text-slate-300 hover:text-slate-700 disabled:opacity-30" aria-label="Move down">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  {def.imageField ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center">
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <ImageOff className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                  ) : Icon ? (
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-slate-800 truncate flex items-center gap-1.5">
                      {titleOf(def, it)}
                      {it.isFeatured === true && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" aria-label="Featured" />}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="text-[11px] text-slate-400">#{String(it.id)}</span>
                      {relLabel(it) && <Badge tone="blue">{relLabel(it)}</Badge>}
                      {typeof it.audience === "string" && it.audience && <Badge>{it.audience}</Badge>}
                      {typeof it.value === "string" && it.value && <Badge tone="green">{it.value}</Badge>}
                      {missing.length > 0 && <Badge tone="amber">{missing.map((l) => l.toUpperCase()).join(", ")} missing</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button size="sm" variant="secondary" onClick={() => setEditing(it)}>
                      <Pencil className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <button onClick={() => setDeleting(it)} className="p-2 text-slate-400 hover:text-red-600" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {items && (
          <p className="px-4 py-3 text-xs text-slate-400 border-t border-slate-100">
            {visible.length} / {items.length} items{canReorder && items.length > 1 && " · arrow diye order change korun (website e oi order e dekhabe)"}
          </p>
        )}
      </Card>

      {editing && (
        <ItemEditor
          def={def}
          initial={editing}
          relations={relations}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete korben?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Na
            </Button>
            <Button variant="danger" onClick={remove} loading={busy}>
              Haa, delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          <b>{deleting && titleOf(def, deleting)}</b> website theke muche jabe. Eta ar firot ana jabe na.
        </p>
      </Modal>
    </>
  );
}
