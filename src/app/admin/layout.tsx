import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Maxtop International",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // The admin is always left-to-right English, even if the visitor last browsed the site in Arabic/Persian
  return (
    <div
      dir="ltr"
      lang="en"
      className="min-h-screen w-full flex bg-slate-50"
      style={{ fontFamily: "var(--font-inter), var(--font-bengali), var(--font-arabic), ui-sans-serif, system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
