"use client";

import { useEffect, useMemo, useState } from "react";
import { Save, KeyRound, UserRound } from "lucide-react";
import { api, errMsg } from "../../_lib/client";
import type { AdminUser } from "../../_lib/types";
import { useAdmin } from "../../_components/AdminShell";
import { ListInput } from "../../_components/inputs";
import { Button, Card, Input, Label, PageHeader, Spinner, Textarea, useToast } from "../../_components/ui";

type Settings = Record<string, string | string[] | boolean>;

export default function SettingsPage() {
  const { meta, admin, setAdmin } = useAdmin();
  const toast = useToast();
  const [saved, setSaved] = useState<Settings | null>(null);
  const [draft, setDraft] = useState<Settings>({});
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(admin.name);
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [pwBusy, setPwBusy] = useState(false);

  useEffect(() => {
    api<{ settings: Settings }>("/admin/settings")
      .then((r) => {
        setSaved(r.settings);
        setDraft(r.settings);
      })
      .catch((e) => toast("error", errMsg(e)));
  }, [toast]);

  const groups = useMemo(() => {
    const g: Record<string, typeof meta.settingsFields> = {};
    for (const f of meta.settingsFields) (g[f.group] ??= []).push(f);
    return Object.entries(g);
  }, [meta]);

  const dirty = saved && JSON.stringify(saved) !== JSON.stringify(draft);

  const save = async () => {
    setSaving(true);
    try {
      const r = await api<{ settings: Settings }>("/admin/settings", { method: "PUT", body: { settings: draft } });
      setSaved(r.settings);
      setDraft(r.settings);
      toast("ok", "Settings save hoyeche");
    } catch (e) {
      toast("error", errMsg(e));
    } finally {
      setSaving(false);
    }
  };

  const saveName = async () => {
    try {
      const r = await api<{ admin: AdminUser }>("/auth/profile", { method: "PUT", body: { name } });
      setAdmin(r.admin);
      toast("ok", "Nam update hoyeche");
    } catch (e) {
      toast("error", errMsg(e));
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.newPassword !== pw.confirm) return toast("error", "Notun password duita mile nai");
    setPwBusy(true);
    try {
      await api("/auth/password", { method: "PUT", body: { currentPassword: pw.currentPassword, newPassword: pw.newPassword } });
      setPw({ currentPassword: "", newPassword: "", confirm: "" });
      toast("ok", "Password change hoyeche (onno device theke logout hoye geche)");
    } catch (err) {
      toast("error", errMsg(err));
    } finally {
      setPwBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="SEO (Google e kivabe dekhabe), social share, contact link ar apnar admin account."
        actions={
          <Button onClick={save} loading={saving} disabled={!dirty}>
            <Save className="w-4 h-4" /> Save settings
          </Button>
        }
      />
      {!saved ? (
        <Spinner />
      ) : (
        <div className="grid xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {groups.map(([group, fields]) => (
              <Card key={group} className="p-5">
                <h2 className="font-bold text-slate-900 mb-4">{group}</h2>
                <div className="space-y-4">
                  {fields.map((f) =>
                    f.type === "checkbox" ? (
                      <label key={f.name} className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 cursor-pointer hover:bg-slate-50">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-emerald-600"
                          checked={draft[f.name] === true}
                          onChange={(e) => setDraft({ ...draft, [f.name]: e.target.checked })}
                        />
                        <span className="text-sm text-slate-700">{f.label}</span>
                      </label>
                    ) : (
                    <div key={f.name}>
                      <Label>{f.label}</Label>
                      {f.type === "list" ? (
                        <ListInput
                          value={Array.isArray(draft[f.name]) ? (draft[f.name] as string[]) : []}
                          onChange={(v) => setDraft({ ...draft, [f.name]: v })}
                        />
                      ) : f.type === "textarea" ? (
                        <Textarea value={String(draft[f.name] ?? "")} onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })} />
                      ) : (
                        <Input value={String(draft[f.name] ?? "")} onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })} />
                      )}
                    </div>
                    )
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="p-5">
              <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <UserRound className="w-4 h-4 text-emerald-600" /> Profile
              </h2>
              <Label>Email</Label>
              <Input value={admin.email} disabled className="mb-4 bg-slate-50" />
              <Label>Nam</Label>
              <div className="flex gap-2">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                <Button variant="secondary" onClick={saveName} disabled={!name.trim() || name === admin.name}>
                  Save
                </Button>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-600" /> Password change
              </h2>
              <form onSubmit={changePassword} className="space-y-3">
                <div>
                  <Label>Current password</Label>
                  <Input type="password" autoComplete="current-password" required value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} />
                </div>
                <div>
                  <Label help="Kompokkhe 8 character">New password</Label>
                  <Input type="password" autoComplete="new-password" required minLength={8} value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} />
                </div>
                <div>
                  <Label>Confirm new password</Label>
                  <Input type="password" autoComplete="new-password" required value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
                </div>
                <Button type="submit" loading={pwBusy} className="w-full">
                  Change password
                </Button>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
