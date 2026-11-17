// Bangla / Arabic / Persian texts for sections that existed only in English on the
// original website (Stats Banner, Gallery, Recognition logos). Applied by
// `npm run import-products`. Certification names (ISO, BSCI, GOTS…) stay as-is.

export const sectionFixes = {
  stats: {
    1: {
      bn: { label: "ব্যবসার", subLabel: "অভিজ্ঞতা" },
      ar: { label: "مدة", subLabel: "العمل" },
      fa: { label: "سابقه", subLabel: "کسب‌وکار" },
    },
    2: {
      bn: { label: "মালিকের অভিজ্ঞতা", subLabel: "সোর্সিংয়ে" },
      ar: { label: "خبرة المالك", subLabel: "في التوريد" },
      fa: { label: "تجربه مدیر", subLabel: "در تأمین" },
    },
    3: {
      bn: { label: "রপ্তানি", subLabel: "দেশে" },
      ar: { label: "التصدير إلى", subLabel: "دولة" },
      fa: { label: "صادرات به", subLabel: "کشور" },
    },
    4: {
      bn: { label: "উৎপাদনকারী", subLabel: "ফ্যাক্টরি" },
      ar: { label: "مصانع", subLabel: "التصنيع" },
      fa: { label: "کارخانه‌های", subLabel: "تولیدی" },
    },
    5: {
      bn: { label: "দৈনিক উৎপাদন", subLabel: "সক্ষমতা" },
      ar: { label: "الطاقة الإنتاجية", subLabel: "اليومية" },
      fa: { label: "ظرفیت تولید", subLabel: "روزانه" },
    },
  },
  galleryCategories: {
    all: { bn: { label: "সব সুবিধা" }, ar: { label: "كل المرافق" }, fa: { label: "همه امکانات" } },
    sewing: { bn: { label: "সেলাই ফ্লোর" }, ar: { label: "قسم الخياطة" }, fa: { label: "سالن دوخت" } },
    cutting: { bn: { label: "CAD ও কাটিং" }, ar: { label: "CAD والقص" }, fa: { label: "CAD و برش" } },
    lab: { bn: { label: "টেস্টিং ল্যাব" }, ar: { label: "مختبر الاختبار" }, fa: { label: "آزمایشگاه" } },
    sampling: { bn: { label: "স্যাম্পলিং রুম" }, ar: { label: "غرفة العيّنات" }, fa: { label: "اتاق نمونه‌سازی" } },
    warehouse: { bn: { label: "ফ্যাব্রিক ডিপো" }, ar: { label: "مستودع الأقمشة" }, fa: { label: "انبار پارچه" } },
  },
  gallery: {
    "sewing-floor-1": {
      bn: { title: "কম্পিউটারাইজড হাই-স্পিড সেলাই লাইন", categoryLabel: "সেলাই ফ্লোর", location: "ঢাকা হেড অফিস হাব", machinery: "১২০+ Juki ও Brother অটোমেটিক মেশিন" },
      ar: { title: "خطوط خياطة محوسبة عالية السرعة", categoryLabel: "قسم الخياطة", location: "مركز دكا الرئيسي", machinery: "أكثر من 120 ماكينة Juki وBrother أوتوماتيكية" },
      fa: { title: "خطوط دوخت کامپیوتری پرسرعت", categoryLabel: "سالن دوخت", location: "مرکز اصلی داکا", machinery: "بیش از ۱۲۰ دستگاه اتوماتیک Juki و Brother" },
    },
    "cad-cutting-1": {
      bn: { title: "অটোমেটেড CAD ফ্যাব্রিক কাটিং ও স্প্রেডিং", categoryLabel: "CAD ও কাটিং", location: "চট্টগ্রাম ইউনিট", machinery: "Gerber প্রিসিশন অটো-কাটার" },
      ar: { title: "قص وفرد الأقمشة الآلي بنظام CAD", categoryLabel: "CAD والقص", location: "وحدة شيتاغونغ", machinery: "آلة قص Gerber الدقيقة" },
      fa: { title: "برش و پهن کردن خودکار پارچه با CAD", categoryLabel: "CAD و برش", location: "واحد چیتاگونگ", machinery: "دستگاه برش دقیق Gerber" },
    },
    "lab-testing-1": {
      bn: { title: "নিজস্ব ফিজিক্যাল ও কেমিক্যাল টেস্টিং ল্যাব", categoryLabel: "টেস্টিং ল্যাব", location: "অ্যাক্রেডিটেড ল্যাব ডেস্ক", machinery: "ISO ও AATCC ক্যালিব্রেটেড" },
      ar: { title: "مختبر داخلي للاختبارات الفيزيائية والكيميائية", categoryLabel: "مختبر الاختبار", location: "مكتب المختبر المعتمد", machinery: "معايرة ISO وAATCC" },
      fa: { title: "آزمایشگاه داخلی تست فیزیکی و شیمیایی", categoryLabel: "آزمایشگاه", location: "میز آزمایشگاه معتبر", machinery: "کالیبره‌شده ISO و AATCC" },
    },
    "sampling-studio-1": {
      bn: { title: "মাস্টার প্যাটার্ন গ্রেডিং ও স্যাম্পলিং স্টুডিও", categoryLabel: "স্যাম্পলিং রুম", location: "R&D ফ্লোর", machinery: "3D CLO ডিজিটাল ফিটিং" },
      ar: { title: "استوديو تدريج النماذج الرئيسية والعيّنات", categoryLabel: "غرفة العيّنات", location: "طابق البحث والتطوير", machinery: "قياس رقمي ثلاثي الأبعاد CLO" },
      fa: { title: "استودیو درجه‌بندی الگو و نمونه‌سازی", categoryLabel: "اتاق نمونه‌سازی", location: "طبقه تحقیق و توسعه", machinery: "فیتینگ دیجیتال سه‌بعدی CLO" },
    },
    "fabric-storage-1": {
      bn: { title: "তাপমাত্রা-নিয়ন্ত্রিত ফ্যাব্রিক গুদাম", categoryLabel: "ফ্যাব্রিক ডিপো", location: "কেন্দ্রীয় স্টোরেজ", machinery: "৪-পয়েন্ট কাঁচা ফ্যাব্রিক পরিদর্শন" },
      ar: { title: "مستودع أقمشة مكيّف", categoryLabel: "مستودع الأقمشة", location: "المخزن المركزي", machinery: "فحص الأقمشة الخام بنظام النقاط الأربع" },
      fa: { title: "انبار پارچه با کنترل دما", categoryLabel: "انبار پارچه", location: "انبار مرکزی", machinery: "بازرسی ۴ امتیازی پارچه خام" },
    },
    "finishing-pack-1": {
      bn: { title: "প্রিসিশন মেটাল ডিটেকশন ও ফাইনাল ফিনিশিং", categoryLabel: "ফিনিশিং ও প্যাকিং", location: "এক্সপোর্ট প্যাকিং জোন", machinery: "Hashima নিডল ডিটেক্টর" },
      ar: { title: "كشف المعادن الدقيق والتشطيب النهائي", categoryLabel: "التشطيب والتغليف", location: "منطقة تغليف التصدير", machinery: "كاشف الإبر Hashima" },
      fa: { title: "تشخیص دقیق فلز و تکمیل نهایی", categoryLabel: "تکمیل و بسته‌بندی", location: "منطقه بسته‌بندی صادرات", machinery: "آشکارساز سوزن Hashima" },
    },
  },
  recognizedBy: {
    "gov-bd": {
      bn: { name: "বাংলাদেশ সরকার", tooltip: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার" },
      ar: { name: "حكومة بنغلاديش", tooltip: "حكومة جمهورية بنغلاديش الشعبية" },
      fa: { name: "دولت بنگلادش", tooltip: "دولت جمهوری خلق بنگلادش" },
    },
    bgba: {
      bn: { tooltip: "বাংলাদেশ গার্মেন্ট বায়িং হাউস অ্যাসোসিয়েশন" },
      ar: { tooltip: "جمعية مكاتب شراء الملابس في بنغلاديش" },
      fa: { tooltip: "انجمن دفاتر خرید پوشاک بنگلادش" },
    },
    "iso-9001": {
      bn: { tooltip: "ISO 9001:2015 কোয়ালিটি ম্যানেজমেন্ট সার্টিফায়েড" },
      ar: { tooltip: "شهادة إدارة الجودة ISO 9001:2015" },
      fa: { tooltip: "گواهی مدیریت کیفیت ISO 9001:2015" },
    },
    dcci: {
      bn: { tooltip: "ঢাকা চেম্বার অব কমার্স অ্যান্ড ইন্ডাস্ট্রি" },
      ar: { tooltip: "غرفة دكا للتجارة والصناعة" },
      fa: { tooltip: "اتاق بازرگانی و صنایع داکا" },
    },
    bgmea: {
      bn: { tooltip: "বাংলাদেশ পোশাক প্রস্তুতকারক ও রপ্তানিকারক সমিতি" },
      ar: { tooltip: "جمعية مصنّعي ومصدّري الملابس في بنغلاديش" },
      fa: { tooltip: "انجمن تولیدکنندگان و صادرکنندگان پوشاک بنگلادش" },
    },
  },
  partnerCerts: {
    ocs: {
      bn: { tooltip: "অর্গানিক ব্লেন্ডেড কনটেন্ট স্ট্যান্ডার্ড" },
      ar: { tooltip: "معيار المحتوى العضوي المخلوط" },
      fa: { tooltip: "استاندارد محتوای ارگانیک ترکیبی" },
    },
    rcs: {
      bn: { tooltip: "রিসাইকেলড ব্লেন্ডেড ক্লেইম স্ট্যান্ডার্ড" },
      ar: { tooltip: "معيار ادعاء المواد المعاد تدويرها المخلوطة" },
      fa: { tooltip: "استاندارد ادعای مواد بازیافتی ترکیبی" },
    },
    "recycled-100": {
      bn: { tooltip: "১০০% রিসাইকেলড ক্লেইম স্ট্যান্ডার্ড" },
      ar: { tooltip: "معيار ادعاء إعادة التدوير 100%" },
      fa: { tooltip: "استاندارد ادعای ۱۰۰٪ بازیافتی" },
    },
    "leed-gold": {
      bn: { tooltip: "U.S. Green Building Council — LEED গোল্ড সার্টিফায়েড ফ্যাক্টরি" },
      ar: { tooltip: "مجلس المباني الخضراء الأمريكي — مصنع حاصل على شهادة LEED الذهبية" },
      fa: { tooltip: "شورای ساختمان سبز آمریکا — کارخانه دارای گواهی طلایی LEED" },
    },
    "oeko-tex": {
      bn: { tooltip: "OEKO-TEX® Standard 100 — টেক্সটাইলে আস্থা" },
      ar: { tooltip: "OEKO-TEX® Standard 100 — الثقة في المنسوجات" },
      fa: { tooltip: "OEKO-TEX® Standard 100 — اطمینان در منسوجات" },
    },
    bsci: {
      bn: { tooltip: "amfori BSCI সোশ্যাল কমপ্লায়েন্স অডিট" },
      ar: { tooltip: "تدقيق الامتثال الاجتماعي amfori BSCI" },
      fa: { tooltip: "ممیزی انطباق اجتماعی amfori BSCI" },
    },
    gots: {
      bn: { tooltip: "গ্লোবাল অর্গানিক টেক্সটাইল স্ট্যান্ডার্ড" },
      ar: { tooltip: "المعيار العالمي للمنسوجات العضوية" },
      fa: { tooltip: "استاندارد جهانی منسوجات ارگانیک" },
    },
    sedex: {
      bn: { tooltip: "Sedex ৪-স্তম্ভ এথিক্যাল ট্রেড অডিট" },
      ar: { tooltip: "تدقيق Sedex للتجارة الأخلاقية بأربع ركائز" },
      fa: { tooltip: "ممیزی تجارت اخلاقی چهار ستونی Sedex" },
    },
  },
};
