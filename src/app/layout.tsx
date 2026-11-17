import type { Metadata } from "next";
import {
  Inter,
  Source_Serif_4,
  Noto_Sans_Bengali,
  Noto_Sans_Arabic,
  Vazirmatn,
} from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";
import { SiteDataProvider } from "@/lib/site-data";
import { getSiteContent } from "@/lib/api";

// ১. বডি টেক্সটের জন্য ক্লিন আধুনিক ফন্ট (Amstel & Textilery স্টাইল)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// ২. হেডলাইন ও লাক্সারি ব্র্যান্ডিংয়ের জন্য প্রিমিয়াম সেরিফ ফন্ট (Next Apparels স্টাইল)
const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

// 3. Multilingual script fonts (applied automatically on language switch)
const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-farsi",
  subsets: ["arabic"],
  display: "swap",
});

// ৩. আন্তর্জাতিক বায়ারদের জন্য হাই-র‍্যাংকিং এসইও মেটাডাটা (Admin → Settings থেকে এডিটযোগ্য)
export async function generateMetadata(): Promise<Metadata> {
  const { settings: s } = await getSiteContent();
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    keywords: s.seoKeywords,
    authors: [{ name: "Maxtop International Ltd." }],
    openGraph: {
      title: s.ogTitle,
      description: s.ogDescription,
      url: s.siteUrl,
      siteName: "Maxtop International",
      locale: "en_US",
      type: "website",
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/images/maxtop-logo.png", type: "image/png" },
      ],
      shortcut: "/icon.svg",
      apple: "/images/maxtop-logo.png",
    },
    twitter: {
      card: "summary_large_image",
      title: s.twitterTitle,
      description: s.twitterDescription,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dictionaries, ...data } = await getSiteContent();
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${notoBengali.variable} ${notoArabic.variable} ${vazirmatn.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
        <I18nProvider dictionaries={dictionaries}>
          <SiteDataProvider data={data}>{children}</SiteDataProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
