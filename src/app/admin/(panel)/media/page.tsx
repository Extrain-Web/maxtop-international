"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UploadCloud, Copy, Trash2 } from "lucide-react";
import { api, errMsg, formatDate } from "../../_lib/client";
import type { MediaDoc } from "../../_lib/types";
import { uploadFiles } from "../../_components/inputs";
import { Button, Card, Empty, Modal, PageHeader, Spinner, cx, useToast } from "../../_components/ui";

const kb = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);

export default function MediaPage() {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaDoc[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag] = useState(false);
  const [deleting, setDeleting] = useState<MediaDoc | null>(null);

  const load = useCallback(
    () => api<{ items: MediaDoc[] }>("/admin/media").then((r) => setItems(r.items)).catch((e) => toast("error", errMsg(e))),
    [toast]
  );
  useEffect(() => {
    load();
  }, [load]);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const added = await uploadFiles(files);
      toast("ok", `${added.length} ta chobi upload hoyeche`);
      load();
    } catch (e) {
      toast("error", errMsg(e));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const copy = (url: string) => {
    navigator.clipboard?.writeText(url).then(() => toast("ok", "Link copy hoyeche"));
  };

  const remove = async () => {
    if (!deleting) return;
    try {
      await api(`/admin/media/${deleting._id}`, { method: "DELETE" });
      toast("ok", "Delete hoyeche");
      setDeleting(null);
      load();
    } catch (e) {
      toast("error", errMsg(e));
    }
  };

  return (
    <>
      <PageHeader title="Media Library" description="Sob upload kora chobi. Ekhane upload korle product/section edit korar somoy 'Library' theke bachte parben." />

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          upload(e.dataTransfer.files);
        }}
        className={cx(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 mb-6 cursor-pointer transition text-center",
          drag ? "border-emerald-500 bg-emerald-50" : "border-slate-300 bg-white hover:border-emerald-400"
        )}
      >
        <UploadCloud className="w-8 h-8 text-emerald-600" />
        <p className="text-sm font-semibold text-slate-700">{uploading ? "Upload hocche…" : "Chobi ekhane drag korun ba click kore bachun"}</p>
        <p className="text-xs text-slate-500">JPG, PNG, WEBP, AVIF · max 15 MB · eksathe 10 ta · auto-optimize hoye WebP hobe</p>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
      </label>

      {!items ? (
        <Spinner />
      ) : items.length === 0 ? (
        <Card>
          <Empty title="Ekhono kono chobi nai" />
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((m) => (
            <Card key={m._id} className="overflow-hidden group">
              <div className="aspect-square bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.originalName ?? ""} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-slate-700 truncate" title={m.originalName}>
                  {m.originalName ?? m.filename}
                </p>
                <p className="text-[11px] text-slate-400">
                  {kb(m.size)} · {formatDate(m.createdAt).split(",")[0]}
                </p>
                <div className="flex gap-1 mt-2">
                  <Button size="sm" variant="secondary" className="flex-1" onClick={() => copy(m.url)}>
                    <Copy className="w-3 h-3" /> Link
                  </Button>
                  <button onClick={() => setDeleting(m)} className="p-1.5 text-slate-400 hover:text-red-600" aria-label="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Chobi delete korben?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Na
            </Button>
            <Button variant="danger" onClick={remove}>
              Haa, delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Ei chobi jodi kono product ba section e use hoy, sekhane ar dekhabe na. Delete permanent.
        </p>
      </Modal>
    </>
  );
}
