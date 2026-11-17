"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Save } from "lucide-react";
import { api, errMsg } from "../../_lib/client";
import { useAdmin } from "../../_components/AdminShell";
import { ImageInput } from "../../_components/inputs";
import { Button, Card, Label, PageHeader, Spinner, useToast } from "../../_components/ui";

export default function SiteImagesPage() {
  const { meta } = useAdmin();
  const toast = useToast();
  const [saved, setSaved] = useState<Record<string, string> | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<{ images: Record<string, string> }>("/admin/site-images")
      .then((r) => {
        setSaved(r.images);
        setDraft(r.images);
      })
      .catch((e) => toast("error", errMsg(e)));
  }, [toast]);

  const groups = useMemo(() => {
    const g: Record<string, typeof meta.siteImages> = {};
    for (const img of meta.siteImages) (g[img.group] ??= []).push(img);
    return Object.entries(g);
  }, [meta]);

  const dirty = saved && JSON.stringify(saved) !== JSON.stringify(draft);

  const save = async () => {
    setSaving(true);
    try {
      const r = await api<{ images: Record<string, string> }>("/admin/site-images", { method: "PUT", body: { images: draft } });
      setSaved(r.images);
      setDraft(r.images);
      toast("ok", "Chobi save hoyeche — website e live");
    } catch (e) {
      toast("error", errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Site Images"
        description="Hero slider, banner ar section er fixed chobi gulo. Upload korun ba Library theke bachun, tarpor Save."
        actions={
          <Button onClick={save} loading={saving} disabled={!dirty}>
            <Save className="w-4 h-4" /> Save all
          </Button>
        }
      />
      {!saved ? (
        <Spinner />
      ) : (
        <div className="space-y-6">
          {groups.map(([group, imgs]) => (
            <Card key={group} className="p-5">
              <h2 className="font-bold text-slate-900 mb-4">{group}</h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                {imgs.map((img) => (
                  <div key={img.key}>
                    <div className="flex items-center justify-between">
                      <Label>{img.label}</Label>
                      {draft[img.key] !== img.default && (
                        <button
                          type="button"
                          onClick={() => setDraft({ ...draft, [img.key]: img.default })}
                          className="text-[11px] text-slate-500 hover:text-emerald-700 inline-flex items-center gap-1 mb-1.5"
                        >
                          <RotateCcw className="w-3 h-3" /> Original
                        </button>
                      )}
                    </div>
                    <ImageInput value={draft[img.key] ?? ""} onChange={(v) => setDraft({ ...draft, [img.key]: v })} />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
