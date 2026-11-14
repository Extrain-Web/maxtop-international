/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Send,
  Tag,
  Ruler,
  DollarSign,
  Sparkles,
} from "lucide-react";
import {
  productCategoryAssets,
  productAssets,
} from "@/data/productsData";
import { useI18n } from "@/i18n/I18nProvider";
import { Rich } from "@/i18n/Rich";

// আন্তর্জাতিক সাইজ কনভার্সন ডেটা (US, UK, EU, AU)
const internationalSizeGuide = [
  { standard: "XS", usa: "0~2", uk_au: "2~4", eu: "30~32" },
  { standard: "S", usa: "4~6", uk_au: "6~8", eu: "34~36" },
  { standard: "M", usa: "8~10", uk_au: "10~12", eu: "38~40" },
  { standard: "L", usa: "12~14", uk_au: "14~16", eu: "42~44" },
  { standard: "XL", usa: "16~18", uk_au: "18~20", eu: "46~48" },
  { standard: "2XL", usa: "20~22", uk_au: "22~24", eu: "50~52" },
];

export default function Products() {
  const { t } = useI18n();

  // অ্যাসেট + অনুবাদ টেক্সট মার্জ
  const productCategories = productCategoryAssets.map((a, i) => ({
    ...a,
    ...t.productCategories[i],
  }));
  const allProductsCatalog = productAssets.map((a, i) => ({
    ...a,
    ...t.productItems[i],
  }));

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subFilter, setSubFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [inquiryType, setInquiryType] = useState<"price" | "sample">("price");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // আন্তর্জাতিক সাইজ চার্ট মোডাল স্টেট
  const [showSizeModal, setShowSizeModal] = useState(false);

  // প্রতিটি প্রোডাক্ট কার্ডের সিলেক্টেড রিজিয়ন (ডিফল্ট: US)
  const [cardRegions, setCardRegions] = useState<Record<string, "us" | "uk" | "eu" | "au">>({});

  const currentCatObj: any = (productCategories as any[]).find(
    (c: any) => c.id === selectedCategory
  );

  // সাব-ফিল্টার ট্যাবগুলোর আইটেম কাউন্ট
  const audienceCounts = {
    all: (allProductsCatalog as any[]).filter((item: any) =>
      selectedCategory ? item.categoryId === selectedCategory : true
    ).length,
    men: (allProductsCatalog as any[]).filter(
      (item: any) =>
        (selectedCategory ? item.categoryId === selectedCategory : true) &&
        item.audience === "men"
    ).length,
    women: (allProductsCatalog as any[]).filter(
      (item: any) =>
        (selectedCategory ? item.categoryId === selectedCategory : true) &&
        item.audience === "women"
    ).length,
    kids: (allProductsCatalog as any[]).filter(
      (item: any) =>
        (selectedCategory ? item.categoryId === selectedCategory : true) &&
        item.audience === "kids"
    ).length,
  };

  const availableTabs = [
    { id: "all", label: t.products.tabs.all, count: audienceCounts.all },
    { id: "men", label: t.products.tabs.men, count: audienceCounts.men },
    { id: "women", label: t.products.tabs.women, count: audienceCounts.women },
    { id: "kids", label: t.products.tabs.kids, count: audienceCounts.kids },
  ].filter((tab) => tab.id === "all" || tab.count > 0);

  // সাব-ক্যাটাগরি ফিল্টারিং
  const displayedItems = (allProductsCatalog as any[]).filter((item: any) => {
    const matchCategory = selectedCategory ? item.categoryId === selectedCategory : true;
    const matchSubFilter = subFilter === "all" ? true : item.audience === subFilter;
    return matchCategory && matchSubFilter;
  });

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategory(id);
    setSubFilter("all");
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenInquiry = (item: any, type: "price" | "sample") => {
    setSelectedProduct(item);
    setInquiryType(type);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedProduct(null);
    }, 2800);
  };

  return (
    <section id="products" className="py-14 sm:py-16 bg-gradient-to-b from-[#ECFDF5] via-[#F8FAFC] to-[#F0FDFA] border-b border-emerald-100 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ══════════════════════════════════════════════════════════════════
            VIEW ১: ১২টি প্রধান ম্যানুফ্যাকচারিং ক্যাটাগরি গ্রিড
        ══════════════════════════════════════════════════════════════════ */}
        {!selectedCategory ? (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.products.divisionsBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B2B43] tracking-tight">
                {t.products.linesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                {t.products.linesSubtitle}
              </p>
            </div>

            {/* ১২টি ক্যাটাগরি কার্ড (কমপ্যাক্ট ও প্রিমিয়াম স্টুডিও লুক) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {(productCategories as any[]).map((cat: any) => (
                <div
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="group relative h-40 sm:h-52 rounded-xl overflow-hidden cursor-pointer border border-slate-200/90 shadow-2xs hover:shadow-md transition-all active:scale-98 bg-slate-900"
                >
                  <img
                    src={cat.coverImg}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15 group-hover:from-emerald-950/85 transition-colors duration-300" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <h3 className="text-base sm:text-xl font-black text-white tracking-wide drop-shadow-md group-hover:text-emerald-300 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity mt-1.5 flex items-center gap-1 font-bold">
                      <span>{t.products.exploreCatalog}</span>
                      <ArrowRight className="w-3 h-3 text-emerald-400" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════════════
              VIEW ২: নির্দিষ্ট ক্যাটাগরি ক্যাটালগ
          ══════════════════════════════════════════════════════════════════ */
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* ব্যাক বাটন ও সাইজ গাইড বাটন */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <button
                onClick={() => handleCategorySelect(null)}
                className="w-fit inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-[#0B2B43] text-xs font-bold border border-slate-300 transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-600" />
                <span>{t.products.backToCategories}</span>
              </button>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 transition-colors shadow-2xs cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.products.viewFullChart}</span>
                </button>

                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B2B43] text-emerald-400 text-xs font-black uppercase tracking-wide shadow-xs">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentCatObj?.name}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ক্যাটাগরি ব্যানার (কমপ্যাক্ট স্লিম ব্যানার) */}
            <div className="relative rounded-2xl overflow-hidden min-h-[120px] sm:h-48 shadow-sm border border-slate-200 flex items-center justify-center text-center p-5 sm:p-8">
              <img
                src={currentCatObj?.bannerImg}
                alt={currentCatObj?.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071D2E]/90 via-[#0B2B43]/85 to-[#071D2E]/90" />
              
              <div className="relative z-10 max-w-xl space-y-1.5">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase">
                  {t.products.sourcingDivision}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                  {currentCatObj?.fullName}
                </h2>
                <p className="text-xs text-slate-200 leading-relaxed max-w-md mx-auto line-clamp-2">
                  {currentCatObj?.desc}
                </p>
              </div>
            </div>

            {/* সাব-ফিল্টার ট্যাব */}
            <div className="flex justify-center pt-1 px-1">
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/90 border border-slate-300 gap-1 sm:gap-1.5 w-full max-w-md sm:w-auto justify-center shadow-inner">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSubFilter(tab.id)}
                    className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 rounded-lg text-[10px] sm:text-xs font-black transition-all cursor-pointer whitespace-nowrap text-center ${
                      subFilter === tab.id
                        ? "bg-[#0B2B43] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.id !== "all" && (
                      <span className={`ml-1 text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        subFilter === tab.id ? "bg-white/20 text-white" : "bg-slate-300/80 text-slate-700"
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                কমপ্যাক্ট ও ব্যালান্সড রেসপনসিভ প্রোডাক্ট কার্ড গ্রিড
            ══════════════════════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 pt-2">
              {displayedItems.length > 0 ? (
                displayedItems.map((item: any) => {
                  const productColors: string[] =
                    Array.isArray(item.colors) && item.colors.length > 0
                      ? item.colors
                      : ["#0B2B43", "#334155", "#64748B", "#FFFFFF"];

                  // কার্ডের বর্তমান সিলেক্টেড রিজিয়ন (ডিফল্ট: US)
                  const activeRegion = cardRegions[item.id] || "us";

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-300"
                    >
                      <div>
                        {/* ১. প্রোডাক্ট ছবি (১:১ স্কয়ার স্টুডিও ক্যানভাস - কোনো কাপড়/হ্যাং-ট্যাগ কাটবে না) */}
                        <div className="relative aspect-square w-full overflow-hidden bg-[#F8FAFC] flex items-center justify-center border-b border-slate-100 group/img">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />

                          {/* টপ-লেফট: অডিয়েন্স ব্যাজ */}
                          <div className="absolute top-2.5 left-2.5 z-10">
                            <span className="px-2 py-0.5 rounded-md bg-[#0B2B43]/85 backdrop-blur-xs text-emerald-300 text-[10px] font-black uppercase tracking-wider shadow-xs">
                              {item.audience}
                            </span>
                          </div>

                          {/* টপ-রাইট: জিএসএম / ওজন ব্যাজ */}
                          {item.gsm && (
                            <div className="absolute top-2.5 right-2.5 z-10">
                              <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-black uppercase tracking-wider shadow-xs border border-slate-200">
                                {item.gsm}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* ২. বিবরণী ও সাইজ গ্রিড (কমপ্যাক্ট স্পেসিং) */}
                        <div className="p-3.5 sm:p-4 space-y-2.5">
                          <div>
                            <h4 className="text-sm sm:text-base font-black text-[#0B2B43] leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-xs font-semibold text-emerald-700 mt-0.5 line-clamp-1">
                              {item.material}
                            </p>
                            {item.desc && (
                              <p className="text-[11px] text-slate-500 leading-normal mt-0.5 line-clamp-1">
                                {item.desc}
                              </p>
                            )}
                          </div>

                          {/* কালার প্যালেট + রিজিয়ন সুইচ (এক কমপ্যাক্ট লাইনে) */}
                          <div className="pt-2 border-t border-slate-100 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              {/* কালার ডটস */}
                              <div className="flex items-center gap-1.5">
                                {productColors.map((color: string, i: number) => (
                                  <span
                                    key={i}
                                    className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color }}
                                    title={`${t.products.colorOption} ${i + 1}`}
                                  />
                                ))}
                              </div>

                              {/* ৪টি রিজিয়ন সুইচ ক্যাপসুল */}
                              <div className="inline-flex items-center p-0.5 rounded-md bg-slate-100 border border-slate-200">
                                {(["us", "uk", "eu", "au"] as const).map((reg) => (
                                  <button
                                    type="button"
                                    key={reg}
                                    onClick={() =>
                                      setCardRegions((prev) => ({ ...prev, [item.id]: reg }))
                                    }
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                                      activeRegion === reg
                                        ? "bg-[#0B2B43] text-white shadow-2xs"
                                        : "text-slate-500 hover:text-slate-900"
                                    }`}
                                  >
                                    {reg}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* কমপ্যাক্ট সাইজ পিল রো */}
                            <div className="grid grid-cols-3 gap-1 pt-0.5">
                              {internationalSizeGuide.map((sizeObj) => {
                                let displayText = "";
                                if (activeRegion === "us") displayText = `${sizeObj.usa} (${sizeObj.standard})`;
                                if (activeRegion === "uk") displayText = `${sizeObj.uk_au} (${sizeObj.standard})`;
                                if (activeRegion === "eu") displayText = `${sizeObj.eu} (${sizeObj.standard})`;
                                if (activeRegion === "au") displayText = `${sizeObj.uk_au} (${sizeObj.standard})`;

                                return (
                                  <div
                                    key={sizeObj.standard}
                                    className="py-1 px-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-bold text-center whitespace-nowrap hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors"
                                  >
                                    {displayText}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* ══════════════════════════════════════════════════════════════
                          ৩. ডুয়াল অ্যাকশন বাটন: [ Get Price ] + [ Get Sample ]
                      ══════════════════════════════════════════════════════════════ */}
                      <div className="p-3.5 sm:p-4 pt-0">
                        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                          {/* বাটন ১: Get Price Quote */}
                          <button
                            type="button"
                            onClick={() => handleOpenInquiry(item, "price")}
                            className="py-2.5 px-1.5 sm:px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs active:scale-95 whitespace-nowrap"
                          >
                            <DollarSign className="w-3.5 h-3.5 shrink-0" />
                            <span>Get Price</span>
                          </button>

                          {/* বাটন ২: Get Sample */}
                          <button
                            type="button"
                            onClick={() => handleOpenInquiry(item, "sample")}
                            className="py-2.5 px-1.5 sm:px-2 rounded-xl bg-[#0B2B43] hover:bg-[#071D2E] text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs active:scale-95 whitespace-nowrap"
                          >
                            <Send className="w-3 h-3 shrink-0" />
                            <span>Get Sample</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-14 text-center text-slate-400">
                  <p className="text-sm font-semibold">{t.products.noItemsPrefix} {currentCatObj?.name}.</p>
                  <button
                    onClick={() => setSubFilter("all")}
                    className="mt-2 text-xs font-bold text-emerald-600 underline cursor-pointer"
                  >
                    {t.products.viewAllPrefix} {currentCatObj?.name} {t.products.viewAllSuffix}
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ৪. আন্তর্জাতিক সাইজ চার্ট মোডাল
      ══════════════════════════════════════════════════════════════════ */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            
            <button
              onClick={() => setShowSizeModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
              <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
                {t.sizeChart.kicker}
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-[#0B2B43] mt-1">
                {t.sizeChart.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t.sizeChart.subtitle}
              </p>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse border border-slate-200 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-[#0B2B43] font-black">
                      <th className="border border-slate-200 py-2.5 sm:py-3 px-2 sm:px-3 text-left whitespace-nowrap">{t.sizeChart.standardRegion}</th>
                      {internationalSizeGuide.map((item) => (
                        <th
                          key={item.standard}
                          className={`border border-slate-200 py-2.5 sm:py-3 px-2 ${
                            ["XS", "M", "XL"].includes(item.standard)
                              ? "bg-emerald-50 text-emerald-800"
                              : ""
                          }`}
                        >
                          {item.standard}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="border border-slate-200 py-2.5 sm:py-3 px-2 sm:px-3 text-left font-bold text-slate-900 bg-slate-50/50 whitespace-nowrap">
                        {t.sizeChart.usaRow}
                      </td>
                      {internationalSizeGuide.map((item) => (
                        <td key={item.standard} className="border border-slate-200 py-2.5 sm:py-3 px-2 font-mono">
                          {item.usa}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="border border-slate-200 py-2.5 sm:py-3 px-2 sm:px-3 text-left font-bold text-slate-900 bg-slate-50/50 whitespace-nowrap">
                        {t.sizeChart.ukAuRow}
                      </td>
                      {internationalSizeGuide.map((item) => (
                        <td key={item.standard} className="border border-slate-200 py-2.5 sm:py-3 px-2 font-mono">
                          {item.uk_au}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="border border-slate-200 py-2.5 sm:py-3 px-2 sm:px-3 text-left font-bold text-slate-900 bg-slate-50/50 whitespace-nowrap">
                        {t.sizeChart.euRow}
                      </td>
                      {internationalSizeGuide.map((item) => (
                        <td key={item.standard} className="border border-slate-200 py-2.5 sm:py-3 px-2 font-mono">
                          {item.eu}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <Rich text={t.sizeChart.customNote} strongClassName="text-slate-800" />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSizeModal(false)}
                className="px-5 py-2 rounded-lg bg-[#0B2B43] hover:bg-emerald-600 text-white text-xs font-bold transition cursor-pointer"
              >
                {t.sizeChart.closeChart}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          ৫. ইনকোয়ারি ও প্রাইস কোটেশন মোডাল (MODAL WITH TYPE SWITCHER)
      ══════════════════════════════════════════════════════════════════ */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* মোডাল হেডার */}
            <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
                  {inquiryType === "price" ? "FOB Direct Pricing Request" : t.products.sampleTechpackRequest}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#0B2B43]">
                {selectedProduct.name}
              </h3>

              {/* সিলেক্টেড প্রোডাক্ট প্রিভিউ স্ট্রিপ */}
              <div className="flex items-center gap-3 mt-3 p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 truncate space-y-0.5">
                  <span className="font-bold text-slate-900 block truncate">{selectedProduct.material}</span>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {t.products.weightLabel} <strong className="text-slate-800">{selectedProduct.gsm}</strong> · MOQ: <strong className="text-emerald-700">{selectedProduct.moq}</strong>
                  </div>
                </div>
              </div>

              {/* ইনকোয়ারি টাইপ সুইচ (Price Quote vs Sample) */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/80 rounded-xl mt-3 border border-slate-300">
                <button
                  type="button"
                  onClick={() => setInquiryType("price")}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    inquiryType === "price"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Request FOB Price</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType("sample")}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    inquiryType === "sample"
                      ? "bg-white text-[#0B2B43] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Inquire Sample</span>
                </button>
              </div>
            </div>

            {/* ফর্ম বডি */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0B2B43]">
                    {inquiryType === "price" ? "Price Quote Request Received!" : t.products.inquiryReceivedTitle}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Our senior merchandising desk will calculate direct mill costing and email you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.products.form.name}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.products.form.namePh}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.products.form.email}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t.products.form.emailPh}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.products.form.brand}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.products.form.brandPh}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {inquiryType === "price" ? "Target Order Quantity (Pcs)" : t.products.form.targetSizing}
                      </label>
                      {inquiryType === "price" ? (
                        <input
                          type="text"
                          required
                          placeholder="e.g. 1,000 Pcs (250 pcs/color)"
                          className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <select className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                          <option>{t.products.form.sizingUsa}</option>
                          <option>{t.products.form.sizingUk}</option>
                          <option>{t.products.form.sizingEu}</option>
                          <option>{t.products.form.sizingCustom}</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {inquiryType === "price" ? "Target Price ($) & Delivery Notes" : t.products.form.colorNotes}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={
                        inquiryType === "price"
                          ? "Mention target FOB price per piece, destination port (e.g. Valencia/Barcelona/Hamburg), or custom wash requirements..."
                          : t.products.form.colorNotesPh
                      }
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                      inquiryType === "price"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-[#0B2B43] hover:bg-[#071D2E] text-white"
                    }`}
                  >
                    {inquiryType === "price" ? (
                      <>
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Submit Price Quotation Request</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.products.form.submit}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
