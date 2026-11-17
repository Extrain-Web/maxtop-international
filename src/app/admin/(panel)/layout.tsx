import { Suspense } from "react";
import AdminShell from "../_components/AdminShell";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-slate-50" />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
