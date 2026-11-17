"use client";

import { useCallback, useEffect, useState } from "react";
import { RotateCcw, Save, ChevronRight } from "lucide-react";
import type { ContentLocale } from "@/lib/content/types";
import { api, errMsg } from "../../_lib/client";
import { useAdmin } from "../../_components/AdminShell";
import { ListInput } from "../../_components/inputs";
import { Button, Card, Input, Label, Modal, PageHeader, Spinner, Textarea, cx, useToast } from "../../_components/ui";

type Json = string | Json[] | { [k: string]: Json };

const SECTION_LABELS: Record<string, string> = {
  nav: "Navigation Menu",
  common: "Common Buttons",
  hero: "Home — Hero",
  about: "Home — About Us",
  services: "Home — Services (heading)",
  howWeWork: "Home — How We Work (heading)",
  whyChooseUs: "Home — Why Choose Us (heading)",
  recognitions: "Home — Recognitions",
  faq: "Home — FAQ (heading)",
  footer: "Footer",
  aboutPage: "About Page",
  servicesPage: "Services Page",
  productsPage: "Products Page",
  products: "Products — cards, price & sample forms",
  sizeChart: "Size Chart",
  contactPage: "Contact Page",
  statsBanner: "Home — Stats Banner (heading)",
  gallery: "Home — Factory Gallery (heading)",
};

const RTL: ContentLocale[] = ["ar", "fa"];

/** "titleHighlight" → "Title Highlight" */
const human = (k: string) =>
  k.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/^./, (c) => c.toUpperCase());

function TreeEditor({
  template,
  value,
  onChange,
  dir,
  path = "",
}: {
  template: Json;
  value: Json;
  onChange: (v: Json) => void;
  dir: "ltr" | "rtl";
  path?: string;
}) {
  if (typeof template === "string") {
    const v = typeof value === "string" ? value : "";
    const long = template.length > 70 || template.includes("\n") || v.length > 70;
    return long ? (
      <Textarea dir={dir} value={v} rows={Math.min(8, Math.ceil(Math.max(v.length, template.length) / 90) + 1)} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <Input dir={dir} value={v} onChange={(e) => onChange(e.target.value)} />
    );
  }
  if (Array.isArray(template)) {
    const arr = Array.isArray(value) ? value : [];
    if (template.length === 0 || typeof template[0] === "string")
      return <ListInput key={path} value={arr.filter((x): x is string => typeof x === "string")} onChange={(v) => onChange(v)} />;
    return (
      <div className="space-y-3">
        {template.map((tpl, i) => (
          <div key={i} className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
            <p className="text-[11px] font-bold text-slate-400 mb-2">#{i + 1}</p>
            <TreeEditor
              template={tpl}
              value={arr[i] ?? tpl}
              dir={dir}
              path={`${path}.${i}`}
              onChange={(nv) => {
                const next = template.map((t, j) => (j === i ? nv : arr[j] ?? t));
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
  const obj = (value && typeof value === "object" && !Array.isArray(value) ? value : {}) as Record<string, Json>;
  return (
    <div className="space-y-4">
      {Object.entries(template).map(([k, tpl]) => {
        const nested = typeof tpl === "object" && !Array.isArray(tpl);
        return (
          <div key={k} className={cx(nested && "rounded-xl border border-slate-200 p-4")}>
            {nested ? <p className="text-xs font-bold text-slate-700 mb-3">{human(k)}</p> : <Label>{human(k)}</Label>}
            <TreeEditor template={tpl} value={obj[k] ?? tpl} dir={dir} path={`${path}.${k}`} onChange={(nv) => onChange({ ...obj, [k]: nv })} />
          </div>
        );
      })}
    </div>
  );
}

export default function TextsPage() {
  const { meta } = useAdmin();
  const toast = useToast();
  const [section, setSection] = useState(meta.textSections[0]);
  const [locale, setLocale] = useState<ContentLocale>("en");
  const [data, setData] = useState<{ template: Json; values: Record<string, Json> } | null>(null);
  const [draft, setDraft] = useState<Json | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [version, setVersion] = useState(0);

  const fetchSection = useCallback(
    (s: string, l: ContentLocale) =>
      api<{ template: Json; values: Record<string, Json> }>(`/admin/texts/${s}`)
        .then((d) => {
          setData(d);
          setDraft(d.values[l]);
          setVersion((v) => v + 1);
        })
        .catch((e) => toast("error", errMsg(e))),
    [toast]
  );

  // first section on page load
  useEffect(() => {
    fetchSection(meta.textSections[0], "en");
  }, [fetchSection, meta.textSections]);

  const openSection = (s: string) => {
    setSection(s);
    setData(null);
    setDraft(null);
    fetchSection(s, locale);
  };

  const openLocale = (l: ContentLocale) => {
    setLocale(l);
    if (data) setDraft(data.values[l]);
    setVersion((v) => v + 1);
  };

  const dirty = data && draft && JSON.stringify(draft) !== JSON.stringify(data.values[locale]);

  const save = async () => {
    if (!data || !draft) return;
    setSaving(true);
    try {
      const { value } = await api<{ value: Json }>(`/admin/texts/${section}/${locale}`, { method: "PUT", body: { value: draft } });
      setData({ ...data, values: { ...data.values, [locale]: value } });
      setDraft(value);
      toast("ok", `${meta.localeLabels[locale]} — save hoyeche, website e live`);
    } catch (e) {
      toast("error", errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!data) return;
    try {
      const { value } = await api<{ value: Json }>(`/admin/texts/${section}/${locale}`, { method: "DELETE" });
      setData({ ...data, values: { ...data.values, [locale]: value } });
      setDraft(value);
      setVersion((v) => v + 1);
      toast("ok", "Original lekhay ferot gelo");
    } catch (e) {
      toast("error", errMsg(e));
    } finally {
      setConfirmReset(false);
    }
  };

  const switchTo = (fn: () => void) => {
    if (dirty && !window.confirm("Save na kora change ase. Change gulo bad diye jaben?")) return;
    fn();
  };

  return (
    <>
      <PageHeader
        title="Page Texts"
        description="Website er sob heading, paragraph, button er lekha. Section bachun, bhasha bachun, edit kore Save din."
      />
      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 p-2 h-fit lg:sticky lg:top-20">
          <ul className="space-y-0.5 max-h-[70vh] overflow-y-auto">
            {meta.textSections.map((s) => (
              <li key={s}>
                <button
                  onClick={() => switchTo(() => openSection(s))}
                  className={cx(
                    "w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] font-medium",
                    section === s ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {SECTION_LABELS[s] ?? human(s)}
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-3">
          <div className="sticky top-16 z-10 bg-white rounded-t-xl border-b border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {meta.locales.map((l) => (
                <button
                  key={l}
                  onClick={() => switchTo(() => openLocale(l))}
                  className={cx(
                    "rounded-md px-3 py-1.5 text-xs font-semibold",
                    locale === l ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {meta.localeLabels[l]}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setConfirmReset(true)}>
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </Button>
              <Button size="sm" onClick={save} loading={saving} disabled={!dirty}>
                <Save className="w-3.5 h-3.5" /> Save
              </Button>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {!data || draft === null ? (
              <Spinner />
            ) : (
              <TreeEditor key={`${section}-${locale}-${version}`} template={data.template} value={draft} onChange={setDraft} dir={RTL.includes(locale) ? "rtl" : "ltr"} />
            )}
          </div>
        </Card>
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Original lekhay ferot jaben?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmReset(false)}>
              Na
            </Button>
            <Button variant="danger" onClick={reset}>
              Haa, reset
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          &quot;{SECTION_LABELS[section] ?? section}&quot; section er {meta.localeLabels[locale]} lekha website er original lekhay ferot jabe.
        </p>
      </Modal>
    </>
  );
}
