"use client";
import { Eye, Target, CheckCircle2, Compass } from "lucide-react";
import Navbar from "../components/Navbar";
import Recognitions from "../components/Recognitions";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import { useI18n } from "@/i18n/I18nProvider";

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* ১. হেডারের ন্যাভিগেশন বার */}
      <Navbar />

      <main className="flex-grow">
        {/* ═════════════════════════════════════════════════════════════════
            ২. টপ ব্যানার (Pic 5: স্পষ্ট ব্যাকগ্রাউন্ড ইমেজ + ডার্ক নেভি ওভারলে)
        ═════════════════════════════════════════════════════════════════ */}
        <section
          className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center text-white bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(7, 29, 46, 0.82), rgba(7, 29, 46, 0.90)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <div className="relative max-w-4xl mx-auto z-10 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              {t.aboutPage.bannerTitle}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-normal">
              {t.aboutPage.bannerSubtitle}
            </p>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            ৩. হোমপেজের হুবহু AboutUs সেকশন
               (Pic 1: The Bridge, Pic 2: Sustainable 360° Wheel, Pic 3: Stats ও Audits)
        ═════════════════════════════════════════════════════════════════ */}
        <AboutUs />

        {/* ═════════════════════════════════════════════════════════════════
            ৪. ভিশন ও মিশন (আপনার রিকোয়ারমেন্ট অনুযায়ী AboutUs এর ঠিক নিচে)
        ═════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              {t.aboutPage.directionBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2B43] tracking-tight">
              {t.aboutPage.vmTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {t.aboutPage.vmSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* কার্ড ১: Our Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white to-emerald-50/40 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
                  {t.aboutPage.vision.kicker}
                </span>
                <h3 className="text-2xl font-extrabold text-[#0B2B43] mt-1">
                  {t.aboutPage.vision.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.aboutPage.vision.text}
              </p>
              <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
                {t.aboutPage.vision.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            {/* কার্ড ২: Our Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white to-blue-50/40 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#0B2B43] text-white flex items-center justify-center shadow-md">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
                  {t.aboutPage.mission.kicker}
                </span>
                <h3 className="text-2xl font-extrabold text-[#0B2B43] mt-1">
                  {t.aboutPage.mission.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.aboutPage.mission.text}
              </p>
              <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
                {t.aboutPage.mission.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════
            ৫. হোমপেজের হুবহু Recognitions সেকশন 
               (Pic 4: Our Partner Certifications মারকুই লুপ)
        ═════════════════════════════════════════════════════════════════ */}
        <Recognitions />
      </main>

      {/* ৬. ফুটার */}
      <Footer />
    </div>
  );
}