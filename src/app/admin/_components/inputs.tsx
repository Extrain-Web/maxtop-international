"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { Upload, FolderOpen, X, Plus, ImageOff } from "lucide-react";
import { ICONS, ICON_NAMES, iconOf } from "@/lib/content/icons";
import { api, errMsg } from "../_lib/client";
import type { CollectionItem, FieldDef, MediaDoc } from "../_lib/types";
import { Button, Input, Label, Modal, Select, Spinner, Textarea, cx, useToast } from "./ui";

// ── Image: URL + upload + pick from library ─────────────────────────────────
export async function uploadFiles(files: FileList | File[]): Promise<MediaDoc[]> {
  const form = new FormData();
  Array.from(files).forEach((f) => form.append("files", f));
  const res = await api<{ items: MediaDoc[] }>("/admin/media", { form });
  return res.items;
}

export function MediaPicker({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (url: string) => void }) {
  const [items, setItems] = useState<MediaDoc[] | null>(null);
  useEffect(() => {
    if (open) api<{ items: MediaDoc[] }>("/admin/media").then((r) => setItems(r.items)).catch(() => setItems([]));
  }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="Media Library theke chobi bachun" wide>
      {!items ? (
        <Spinner />
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-10">Ekhono kono chobi upload kora hoy nai.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {items.map((m) => (
            <button
              key={m._id}
              type="button"
              onClick={() => {
                onPick(m.url);
                onClose();
              }}
              className="group aspect-square rounded-lg overflow-hidden border border-slate-200 hover:ring-2 hover:ring-emerald-500 bg-slate-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.originalName ?? ""} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}

export function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [picker, setPicker] = useState(false);
  const [brokenSrc, setBrokenSrc] = useState("");
  const broken = !!value && brokenSrc === value;

  const onFile = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const [m] = await uploadFiles(files);
      onChange(m.url);
      toast("ok", "Chobi upload hoyeche");
    } catch (e) {
      toast("error", errMsg(e));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-3 items-start">
      <div className="w-20 h-20 shrink-0 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
        {value && !broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-full h-full object-cover" onError={() => setBrokenSrc(value)} />
        ) : (
          <ImageOff className="w-5 h-5 text-slate-300" />
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/... ba https://..." />
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" loading={busy} onClick={() => fileRef.current?.click()}>
            <Upload className="w-3.5 h-3.5" /> Upload
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={() => setPicker(true)}>
            <FolderOpen className="w-3.5 h-3.5" /> Library
          </Button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files)} />
      </div>
      <MediaPicker open={picker} onClose={() => setPicker(false)} onPick={onChange} />
    </div>
  );
}

// ── Icon picker ─────────────────────────────────────────────────────────────
export function IconInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const current = createElement(iconOf(value), { className: "w-4 h-4" });
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-emerald-400"
      >
        <span className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
          {current}
        </span>
        <span className="text-slate-700">{value || "Icon bachun"}</span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Icon bachun" wide>
        <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} className="mb-4" />
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {ICON_NAMES.filter((n) => n.toLowerCase().includes(q.toLowerCase())).map((name) => {
            const I = ICONS[name];
            return (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                className={cx(
                  "flex flex-col items-center gap-1 rounded-lg p-2.5 border text-[10px] text-slate-500 hover:border-emerald-400 hover:text-emerald-700",
                  value === name ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200"
                )}
              >
                <I className="w-5 h-5" />
                <span className="truncate w-full">{name}</span>
              </button>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

// ── Colors ──────────────────────────────────────────────────────────────────
export function ColorsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("#0F172A");
  return (
    <div className="flex flex-wrap items-center gap-2">
      {value.map((c, i) => (
        <span key={`${c}-${i}`} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 pl-1 pr-2 py-1 text-xs">
          <span className="w-5 h-5 rounded-full border border-slate-300" style={{ background: c }} />
          {c}
          <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-slate-400 hover:text-red-600" aria-label={`Remove ${c}`}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <span className="inline-flex items-center gap-1.5">
        <input type="color" value={draft} onChange={(e) => setDraft(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-slate-200" />
        <Button type="button" size="sm" variant="secondary" onClick={() => onChange([...value, draft.toUpperCase()])}>
          <Plus className="w-3.5 h-3.5" /> Add
        </Button>
      </span>
    </div>
  );
}

// ── String list (one per line) ──────────────────────────────────────────────
export function ListInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  // local text keeps blank lines while typing; parents remount it (via `key`) when the item/language changes
  const [text, setText] = useState(value.join("\n"));
  return (
    <Textarea
      rows={Math.min(8, Math.max(3, value.length + 1))}
      value={text}
      placeholder={placeholder ?? "Prottek ta item alada line e likhun"}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean));
      }}
    />
  );
}

// ── Generic field renderer (driven by backend field definitions) ────────────
export function FieldInput({
  field,
  value,
  onChange,
  relationOptions,
  dir,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
  relationOptions?: Record<string, CollectionItem[]>;
  dir?: "rtl" | "ltr";
}) {
  const str = typeof value === "string" ? value : value == null ? "" : String(value);
  const list = Array.isArray(value) ? (value as string[]) : [];
  let control: React.ReactNode;
  switch (field.type) {
    case "textarea":
      control = <Textarea dir={dir} value={str} onChange={(e) => onChange(e.target.value)} rows={4} />;
      break;
    case "number":
      control = <Input type="number" value={str} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "image":
      control = <ImageInput value={str} onChange={onChange} />;
      break;
    case "icon":
      control = <IconInput value={str} onChange={onChange} />;
      break;
    case "colors":
      control = <ColorsInput value={list} onChange={onChange} />;
      break;
    case "list":
      control = <ListInput value={list} onChange={onChange} />;
      break;
    case "checkbox":
      return (
        <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 accent-emerald-600" />
          {field.label}
        </label>
      );
    case "select": {
      const opts = field.optionsFrom
        ? (relationOptions?.[field.optionsFrom] ?? []).map((o) => ({
            value: String(o.id),
            label: String(o.t?.en?.name ?? o.t?.en?.label ?? o.t?.en?.title ?? o.id),
          }))
        : field.options ?? [];
      control = (
        <Select value={str} onChange={(e) => onChange(e.target.value)}>
          <option value="">— bachun —</option>
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      );
      break;
    }
    default:
      control = <Input dir={dir} value={str} onChange={(e) => onChange(e.target.value)} />;
  }
  return (
    <div>
      <Label required={field.required} help={field.help}>
        {field.label}
      </Label>
      {control}
    </div>
  );
}
