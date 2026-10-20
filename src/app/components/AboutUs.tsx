/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Globe2,
  TrendingDown,
  Clock,
  Sparkles,
  CheckCircle2,
  Building2,
  Leaf,
  CheckCheck,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { Rich } from "@/i18n/Rich";

// ৩৬০ ডিগ্রি স্পিনিং হুইলের ৮টি প্রোডাক্ট ছবি ও পজিশন (টেক্সট i18n ডিকশনারিতে)
const spinningAssets = [
  {
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop",
    pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  {
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&auto=format&fit=crop",
    pos: "top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2",
  },
  {
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=400&auto=format&fit=crop",
    pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  },
  {
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400&auto=format&fit=crop",
    pos: "bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2",
  },
  {
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=400&auto=format&fit=crop",
    pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  },
  {
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop",
    pos: "bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2",
  },
  {
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop",
    pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  },
  {
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop",
    pos: "top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2",
  },
];

export default function AboutUs() {
  const { t } = useI18n();
  const pillarIcons = [TrendingDown, Clock, ShieldCheck, Sparkles];
  const pillarBoxes = [
    { bg: "bg-emerald-100", text: "text-emerald-700", hover: "hover:bg-emerald-50/40" },
    { bg: "bg-blue-100", text: "text-blue-700", hover: "hover:bg-blue-50/40" },
    { bg: "bg-indigo-100", text: "text-indigo-700", hover: "hover:bg-indigo-50/40" },
    { bg: "bg-teal-100", text: "text-teal-700", hover: "hover:bg-teal-50/40" },
  ];
  const certIcons = [Award, CheckCheck, ShieldCheck, Globe2, Leaf, Building2];
  const certColors = [
    "text-emerald-600",
    "text-blue-600",
    "text-indigo-600",
    "text-amber-600",
    "text-green-600",
    "text-slate-700",
  ];
  return (
    <section id="about" className="py-12 bg-gradient-to-b from-blue-100/60 via-sky-50/50 to-indigo-50/40 border-t border-slate-200 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20 lg:space-y-28">
        
        {/* ══════════════════════════════════════════════════════════════════
            ১. WHO WE ARE: The Bridge Concept (Maxtop Core Story)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* বামপাশে: স্টোরি ও ৪টি পিলার */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold tracking-widest text-emerald-700 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t.about.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-[#0C2340] leading-tight sm:leading-[1.18]">
              {t.about.titleLead}{" "}
              <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-4 sm:underline-offset-8">
                {t.about.titleHighlight}
              </span>{" "}
              {t.about.titleTail}
            </h2>

            <p className="text-sm sm:text-lg text-slate-700 leading-relaxed font-normal">
              <Rich text={t.about.intro} strongClassName="text-slate-900 font-bold" />
            </p>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              {t.about.sub}
            </p>

            {/* ৪টি কোর পিলার (মোবাইল ও পিসিতে রেসপনসিভ) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              {t.about.pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                const box = pillarBoxes[i];
                return (
                  <div
                    key={i}
                    className={`p-4 sm:p-5 rounded-2xl bg-white ${box.hover} border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-1.5 group`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 font-bold text-slate-900 text-sm sm:text-base">
                      <div className={`w-8 h-8 rounded-xl ${box.bg} ${box.text} flex items-center justify-center shrink-0`}>
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <span>{pillar.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-10 sm:pl-11">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ডানপাশে: ছবি ও ট্রাস্ট ব্যাজ */}
          <div className="lg:col-span-5 pt-4 sm:pt-0">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-slate-100 aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop"
                  alt="Modern Garment Sewing Floor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340]/60 via-transparent to-transparent"></div>
              </div>

              {/* সেকেন্ডারি ওভারল্যাপিং ছবি */}
              <div className="hidden sm:block absolute -top-8 -right-8 w-36 h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop"
                  alt="Fabric Patterning & Inspection"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* ফ্লোটিং এক্সপেরিয়েন্স ব্যাজ */}
              <div className="absolute bottom-2 left-2 sm:-bottom-6 sm:-left-6 bg-[#0C2340] text-white p-3 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-slate-700 max-w-[170px] sm:max-w-[210px] lg:max-w-[230px]">
                <div className="flex items-baseline gap-1 text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400">
                  <span>{t.about.expYears}</span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-300">{t.about.expYearsLabel}</span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-100 mt-0.5 sm:mt-1 uppercase tracking-wider">
                  {t.about.expTitle}
                </div>
                <div className="text-[9.5px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                  {t.about.expSub}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ২. ANOOSHA BENCHMARK: 
               ঘূর্ণায়মান ৩৬০° প্রোডাক্ট হুইল ও সাস্টেইনেবল টেক্সট
               (মোবাইল ও পিসিতে নিখুঁত রেসপনসিভ)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* ── বামপাশে: রেসপনসিভ ৩৬০° ঘূর্ণায়মান প্রোডাক্ট হুইল ── */}
            <div className="lg:col-span-6 flex justify-center items-center py-4 px-1 overflow-hidden sm:overflow-visible">
              <div className="relative w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] lg:w-[580px] lg:h-[580px] xl:w-[620px] xl:h-[620px] flex items-center justify-center shrink-0">
                
                {/* স্থির ব্যাকগ্রাউন্ড ড্যাশড সার্কেল */}
                <div className="absolute inset-8 sm:inset-16 lg:inset-22 rounded-full border border-dashed sm:border-2 border-emerald-400/50 pointer-events-none" />
                <div className="absolute inset-16 sm:inset-32 lg:inset-44 rounded-full border border-slate-200 bg-white/70 pointer-events-none shadow-inner" />

                {/* কেন্দ্রে ফিক্সড Maxtop ব্র্যান্ড হাব (মোবাইলে সুষম, পিসিতে বড়) */}
                <div className="relative z-30 w-24 h-24 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 rounded-full bg-[#0C2340] text-white shadow-2xl flex flex-col items-center justify-center text-center p-2 sm:p-3 border-2 sm:border-4 border-emerald-400">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-xs sm:text-base lg:text-lg mb-0.5 sm:mb-1 shadow-md">
                    M
                  </div>
                  <span className="text-[11px] sm:text-base lg:text-xl font-black tracking-wider text-white leading-tight">
                    MAX<span className="text-emerald-400">TOP</span>
                  </span>
                  <span className="text-[7px] sm:text-[10px] lg:text-[13px] font-bold tracking-[0.2em] sm:tracking-[0.22em] text-slate-300 uppercase mt-0.5">
                    {t.about.wheelTag}
                  </span>
                  <span className="text-[6px] sm:text-[9px] lg:text-[11px] text-emerald-300 font-mono mt-0.5 sm:mt-1 bg-emerald-950/80 px-2 sm:px-3 py-0.5 rounded-full border border-emerald-500/40">
                    {t.about.wheelEcosystem}
                  </span>
                </div>

                {/* অবিরত ঘূর্ণায়মান অরবিট রিং (মোবাইলে ওভারফ্লো ছাড়া নিরাপদ দূরত্ব) */}
                <div className="absolute inset-8 sm:inset-16 lg:inset-22 rounded-full animate-[spin_40s_linear_infinite] hover:[animation-play-state:paused] group">
                  {spinningAssets.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute ${item.pos}`}
                    >
                      {/* কাউন্টার-রোটেশন যাতে ছবি সবসময় সোজা থাকে */}
                      <div className="animate-[spin_40s_linear_infinite_reverse] group-hover:[animation-play-state:paused]">
                        <div className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-26 xl:h-26 rounded-xl sm:rounded-2xl bg-white p-1 sm:p-2 shadow-md sm:shadow-xl border sm:border-2 border-slate-200/90 hover:border-emerald-500 hover:scale-115 transition-all duration-300 flex flex-col items-center justify-center group/card cursor-pointer">
                          <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-100">
                            <img
                              src={item.img}
                              alt={t.about.spinningProducts[index].name}
                              className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                            />
                          </div>
                          
                          {/* হোভার টুলটিপ (শুধুমাত্র বড় স্ক্রিনে) */}
                          <div className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity bg-[#0C2340] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-xl whitespace-nowrap pointer-events-none z-40">
                            {t.about.spinningProducts[index].name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* ── ডানপাশে: সাস্টেইনেবল ও এথিক্যাল ভ্যালু টেক্সট ── */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-xs font-bold tracking-wider text-emerald-800 uppercase">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>{t.about.philosophyBadge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0C2340] leading-tight">
                {t.about.philosophyTitleLead}{" "}
                <span className="text-emerald-600">{t.about.philosophyTitleHighlight}</span> {t.about.philosophyTitleTail}
              </h3>

              <p className="text-sm sm:text-lg text-slate-700 leading-relaxed font-normal">
                <Rich text={t.about.philosophyIntro} strongClassName="text-slate-900 font-bold" />
              </p>

              {/* ৩টি সাস্টেইনেবল বেনিফিট বুলেট */}
              <div className="space-y-3.5 sm:space-y-4 pt-1">
                {t.about.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <p className="text-xs sm:text-base text-slate-700 font-medium">
                      <Rich text={benefit} strongClassName="text-slate-900 font-bold" />
                    </p>
                  </div>
                ))}
              </div>

              {/* অ্যাকশন বাটনসমূহ (মোবাইলে ফুল উইডথ, পিসিতে স্বাভাবিক) */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#0C2340] hover:bg-emerald-600 text-white font-bold text-xs sm:text-base transition-all shadow-md flex items-center justify-center gap-2 group text-center cursor-pointer"
                >
                  <span>{t.about.ctaInquire}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-400" />
                </Link>

                <Link
                  href="/products"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-base border border-slate-300 transition-all shadow-sm text-center cursor-pointer"
                >
                  <span>{t.about.ctaCatalog}</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ৩. গ্লোবাল কমপ্লায়েন্স ও সার্টিফিকেশন ব্যানার
        ══════════════════════════════════════════════════════════════════ */}
        <div className="">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-[11px] sm:text-sm font-bold text-emerald-700 bg-emerald-100/80 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              {t.about.certKicker}
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-[#0C2340] mt-3">
              {t.about.certTitle}
            </h3>
          </div>

          {/* বড় ও স্পষ্ট ৬টি সার্টিফিকেশন কার্ড (মোবাইলে ২টি করে গ্রিড) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 items-stretch">
            {t.about.certs.map((cert, i) => {
              const Icon = certIcons[i];
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/60 hover:-translate-y-1 transition-all duration-300 text-center min-h-[125px] sm:min-h-[160px]"
                >
                  <Icon className={`w-7 h-7 sm:w-10 sm:h-10 ${certColors[i]} mb-2 sm:mb-3`} />
                  <span className="text-xs sm:text-base font-bold text-slate-900 block leading-snug">
                    {cert.name}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 block">
                    {cert.sub}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}