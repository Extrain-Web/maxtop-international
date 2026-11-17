// New product line (Nov 2026) — images live in ./catalog-images/
// Imported with:  npm run import-products   (safe to run again: existing ids are skipped)

export const newCategories = [
  {
    id: "innerwear",
    coverImg: "@1304", // "@<productId>" = use that product's uploaded image
    bannerImg: "@1302",
    t: {
      en: {
        name: "Innerwear",
        fullName: "Innerwear & Intimates",
        desc: "Cotton-stretch trunks, boxer briefs, woven boxers, lace briefs & padded bras in multi-packs",
      },
      bn: {
        name: "ইনারওয়্যার",
        fullName: "ইনারওয়্যার ও ইন্টিমেটস",
        desc: "কটন-স্ট্রেচ ট্রাঙ্কস, বক্সার ব্রিফ, ওভেন বক্সার, লেস ব্রিফ ও প্যাডেড ব্রা — মাল্টি-প্যাকে",
      },
      ar: {
        name: "ملابس داخلية",
        fullName: "ملابس داخلية ونسائية",
        desc: "بوكسر قطني مطّاط، بوكسر بريف، بوكسر منسوج، سراويل دانتيل وحمّالات صدر مبطّنة بعبوات متعددة",
      },
      fa: {
        name: "لباس زیر",
        fullName: "لباس زیر و پوشاک داخلی",
        desc: "ترانک کتان کشی، باکسر بریف، باکسر بافته، شورت توری و سوتین فوم‌دار در بسته‌های چندتایی",
      },
    },
  },
];

const P = (id, file, categoryId, audience, gsm, moq, colors, sizes, isFeatured, t) => ({
  id, file, categoryId, audience, gsm, moq, colors, sizes, isFeatured, t,
});

const KID = ["2Y", "3Y", "4Y", "5Y", "6Y", "8Y"];
const BABY = ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M", "18-24M"];

export const newProducts = [
  // ── PANTS ────────────────────────────────────────────────────────────────
  P(604, "604-fleece-cargo-joggers.jpeg", "pants", "men", "320 GSM", "500 Pcs",
    ["#3F3F46", "#7F1D1D", "#E7DCC8", "#B45309"], ["S", "M", "L", "XL", "2XL"], true, {
      en: { name: "Men's Fleece Cargo Joggers", desc: "Tapered cargo jogger with side flap pockets, drawcord waist & ribbed ankle cuffs", material: "80% Cotton / 20% Polyester Brushed Fleece (320 GSM)" },
      bn: { name: "পুরুষদের ফ্লিস কার্গো জগার্স", desc: "সাইড ফ্ল্যাপ পকেট, ড্রকর্ড কোমর ও রিব অ্যাঙ্কেল কাফ সহ টেপারড কার্গো জগার", material: "৮০% কটন / ২০% পলিয়েস্টার ব্রাশড ফ্লিস (৩২০ GSM)" },
      ar: { name: "بنطال جوجر كارغو فليس للرجال", desc: "جوجر كارغو بقصة ضيّقة مع جيوب جانبية بغطاء وخصر برباط وأساور كاحل مضلّعة", material: "80% قطن / 20% بوليستر فليس مُصفّف (320 GSM)" },
      fa: { name: "شلوار جاگر کارگو فلیس مردانه", desc: "جاگر کارگو جذب با جیب‌های درب‌دار کناری، کمر بنددار و مچ کشباف", material: "۸۰٪ پنبه / ۲۰٪ پلی‌استر فلیس برس‌خورده (320 GSM)" },
    }),
  P(605, "605-kids-twill-cargo-pants.jpeg", "pants", "kids", "240 GSM", "600 Pcs",
    ["#D6C7A1", "#A47E4F", "#18181B"], KID, true, {
      en: { name: "Kids' Relaxed Twill Cargo Pants", desc: "Wide-leg cargo trousers with elastic drawstring waist & bellow side pockets", material: "100% Cotton Twill (240 GSM)" },
      bn: { name: "বাচ্চাদের রিল্যাক্সড টুইল কার্গো প্যান্ট", desc: "ইলাস্টিক ড্রস্ট্রিং কোমর ও বেলো সাইড পকেট সহ ওয়াইড-লেগ কার্গো ট্রাউজার", material: "১০০% কটন টুইল (২৪০ GSM)" },
      ar: { name: "بنطال كارغو تويل مريح للأطفال", desc: "بنطال كارغو واسع بخصر مطاطي برباط وجيوب جانبية منفوخة", material: "100% قطن تويل (240 GSM)" },
      fa: { name: "شلوار کارگو جناقی راحت بچگانه", desc: "شلوار کارگو گشاد با کمر کشی بنددار و جیب‌های کناری فانوسی", material: "۱۰۰٪ پنبه جناقی (240 GSM)" },
    }),
  P(606, "606-kids-cargo-joggers.jpeg", "pants", "kids", "260 GSM", "600 Pcs",
    ["#E8DCC4", "#FFFFFF", "#1E3A5F", "#111827"], KID, false, {
      en: { name: "Kids' Stretch Cargo Joggers", desc: "Drawstring jogger with cargo pockets, embroidered flag badge & cuffed hem", material: "97% Cotton / 3% Elastane Twill (260 GSM)" },
      bn: { name: "বাচ্চাদের স্ট্রেচ কার্গো জগার্স", desc: "কার্গো পকেট, এমব্রয়ডারি ব্যাজ ও কাফড হেম সহ ড্রস্ট্রিং জগার", material: "৯৭% কটন / ৩% ইলাস্টেন টুইল (২৬০ GSM)" },
      ar: { name: "جوجر كارغو مطّاط للأطفال", desc: "جوجر برباط مع جيوب كارغو وشارة مطرّزة وحافة بأساور", material: "97% قطن / 3% إيلاستين تويل (260 GSM)" },
      fa: { name: "جاگر کارگو کشی بچگانه", desc: "جاگر بنددار با جیب کارگو، نشان گلدوزی‌شده و لبه مچ‌دار", material: "۹۷٪ پنبه / ۳٪ الاستین جناقی (260 GSM)" },
    }),

  // ── DENIM ────────────────────────────────────────────────────────────────
  P(504, "504-kids-denim-cargo-joggers.jpeg", "denim", "kids", "9 oz / 300 GSM", "600 Pcs",
    ["#3B5B8C", "#1E3A8A", "#9CA3AF"], KID, true, {
      en: { name: "Kids' Denim Cargo Jogger Jeans", desc: "Pull-on denim jogger with cargo pockets, elastic waist & cuffed ankles", material: "98% Cotton / 2% Spandex Stretch Denim (9 oz)" },
      bn: { name: "বাচ্চাদের ডেনিম কার্গো জগার জিন্স", desc: "কার্গো পকেট, ইলাস্টিক কোমর ও কাফড অ্যাঙ্কেল সহ পুল-অন ডেনিম জগার", material: "৯৮% কটন / ২% স্প্যানডেক্স স্ট্রেচ ডেনিম (৯ oz)" },
      ar: { name: "جينز جوجر كارغو للأطفال", desc: "جوجر دنيم سهل اللبس بجيوب كارغو وخصر مطاطي وأساور عند الكاحل", material: "98% قطن / 2% سباندكس دنيم مطّاط (9 oz)" },
      fa: { name: "شلوار جین جاگر کارگو بچگانه", desc: "جاگر جین راحت‌پوش با جیب کارگو، کمر کشی و مچ پاچه", material: "۹۸٪ پنبه / ۲٪ اسپندکس جین کشی (9 oz)" },
    }),
  P(505, "505-boys-denim-cargo-jeans.jpeg", "denim", "kids", "11 oz / 340 GSM", "500 Pcs",
    ["#7FA1C9", "#3B5B8C"], ["4Y", "5Y", "6Y", "8Y", "10Y", "12Y"], false, {
      en: { name: "Boys' Light Wash Cargo Jeans", desc: "Relaxed straight-leg jeans with flap cargo pockets & chenille letter patch", material: "100% Cotton Denim, Stone Wash (11 oz)" },
      bn: { name: "ছেলেদের লাইট ওয়াশ কার্গো জিন্স", desc: "ফ্ল্যাপ কার্গো পকেট ও শেনিল লেটার প্যাচ সহ রিল্যাক্সড স্ট্রেইট-লেগ জিন্স", material: "১০০% কটন ডেনিম, স্টোন ওয়াশ (১১ oz)" },
      ar: { name: "جينز كارغو فاتح للأولاد", desc: "جينز بساق مستقيمة مريحة مع جيوب كارغو بغطاء ورقعة حروف شانيل", material: "100% قطن دنيم، غسيل حجري (11 oz)" },
      fa: { name: "شلوار جین کارگو روشن پسرانه", desc: "جین راسته راحت با جیب‌های کارگو درب‌دار و وصله حروف شنیل", material: "۱۰۰٪ پنبه جین، سنگ‌شور (11 oz)" },
    }),

  // ── WOVEN ────────────────────────────────────────────────────────────────
  P(404, "404-mens-oxford-shirt-22-colors.jpeg", "woven", "men", "130 GSM", "800 Pcs",
    ["#FFFFFF", "#BFDBFE", "#FBCFE8", "#FDE68A", "#A7F3D0", "#1E3A8A", "#7F1D1D", "#111827"], ["S", "M", "L", "XL", "2XL", "3XL"], true, {
      en: { name: "Men's Premium Oxford Shirt — 22 Colors", desc: "Regular-fit long-sleeve shirt with button-down collar, offered in 22 ready fabric colors", material: "100% Cotton Oxford, Easy-Care Finish (130 GSM)" },
      bn: { name: "পুরুষদের প্রিমিয়াম অক্সফোর্ড শার্ট — ২২ রঙ", desc: "বাটন-ডাউন কলার সহ রেগুলার-ফিট ফুল হাতা শার্ট, ২২টি রেডি ফ্যাব্রিক রঙে", material: "১০০% কটন অক্সফোর্ড, ইজি-কেয়ার ফিনিশ (১৩০ GSM)" },
      ar: { name: "قميص أكسفورد فاخر للرجال — 22 لونًا", desc: "قميص بأكمام طويلة وقصة عادية وياقة بأزرار، متوفر بـ 22 لون قماش جاهز", material: "100% قطن أكسفورد، تشطيب سهل العناية (130 GSM)" },
      fa: { name: "پیراهن آکسفورد ممتاز مردانه — ۲۲ رنگ", desc: "پیراهن آستین‌بلند با فیت معمولی و یقه دکمه‌دار، در ۲۲ رنگ پارچه آماده", material: "۱۰۰٪ پنبه آکسفورد، تکمیل آسان‌نگهداری (130 GSM)" },
    }),

  // ── SLEEPWEAR ────────────────────────────────────────────────────────────
  P(1003, "1003-girls-pajama-shorts-set.jpeg", "sleepwear", "kids", "180 GSM", "600 Sets",
    ["#FBCFE8", "#DDD6FE", "#FDE68A", "#A7F3D0"], KID, true, {
      en: { name: "Girls' Printed Tee & Shorts Pajama Set", desc: "Soft summer sleep set with playful all-over prints in assorted colorways", material: "95% Cotton / 5% Elastane Rib Jersey (180 GSM)" },
      bn: { name: "মেয়েদের প্রিন্টেড টি ও শর্টস পায়জামা সেট", desc: "বিভিন্ন রঙে মজার অল-ওভার প্রিন্টের নরম সামার স্লিপ সেট", material: "৯৫% কটন / ৫% ইলাস্টেন রিব জার্সি (১৮০ GSM)" },
      ar: { name: "طقم بيجامة تيشيرت وشورت مطبوع للبنات", desc: "طقم نوم صيفي ناعم بطبعات مرحة شاملة وألوان متنوعة", material: "95% قطن / 5% إيلاستين جيرسي مضلّع (180 GSM)" },
      fa: { name: "ست پیژامه تیشرت و شورت طرح‌دار دخترانه", desc: "ست خواب تابستانی نرم با طرح‌های شاد سرتاسری در رنگ‌های متنوع", material: "۹۵٪ پنبه / ۵٪ الاستین جرسی کبریتی (180 GSM)" },
    }),

  // ── KIDS & BABYWEAR ──────────────────────────────────────────────────────
  P(1103, "1103-baby-knit-romper.jpeg", "kids", "kids", "200 GSM", "800 Pcs",
    ["#7C2D12", "#FFFFFF", "#F5E6D3"], BABY, true, {
      en: { name: "Baby Waffle-Knit Strappy Romper", desc: "Sleeveless snap-bottom romper in stripe, floral & heart prints", material: "100% Organic Cotton Waffle Knit (200 GSM)" },
      bn: { name: "বেবি ওয়াফল-নিট স্ট্র্যাপি রম্পার", desc: "স্ট্রাইপ, ফ্লোরাল ও হার্ট প্রিন্টে স্লিভলেস স্ন্যাপ-বটম রম্পার", material: "১০০% অর্গানিক কটন ওয়াফল নিট (২০০ GSM)" },
      ar: { name: "رومبر محبوك وافل بحمالات للرضّع", desc: "رومبر بلا أكمام بأزرار كبس سفلية بطبعات مخطّطة وزهور وقلوب", material: "100% قطن عضوي محبوك وافل (200 GSM)" },
      fa: { name: "رامپر بندی بافت وافلی نوزاد", desc: "رامپر بدون آستین با دکمه‌قابلمه‌ای پایین، طرح راه‌راه، گل و قلب", material: "۱۰۰٪ پنبه ارگانیک بافت وافلی (200 GSM)" },
    }),
  P(1104, "1104-baby-bodysuit-5-pack.jpeg", "kids", "kids", "180 GSM", "1000 Packs",
    ["#FDBA74", "#FFFFFF", "#F5E6D3", "#FCD34D"], BABY, false, {
      en: { name: "Baby Short-Sleeve Bodysuit 5-Pack", desc: "Envelope-neck bodysuits with nickel-free snaps in coordinated prints", material: "100% Cotton Interlock (180 GSM)" },
      bn: { name: "বেবি শর্ট-স্লিভ বডিস্যুট ৫-প্যাক", desc: "নিকেল-ফ্রি স্ন্যাপ সহ এনভেলপ-নেক বডিস্যুট, ম্যাচিং প্রিন্টে", material: "১০০% কটন ইন্টারলক (১৮০ GSM)" },
      ar: { name: "عبوة 5 بودي بأكمام قصيرة للرضّع", desc: "بودي بياقة مغلّفة وأزرار كبس خالية من النيكل بطبعات متناسقة", material: "100% قطن إنترلوك (180 GSM)" },
      fa: { name: "بسته ۵ عددی بادی آستین‌کوتاه نوزاد", desc: "بادی یقه پاکتی با دکمه‌های بدون نیکل در طرح‌های هماهنگ", material: "۱۰۰٪ پنبه اینترلاک (180 GSM)" },
    }),
  P(1105, "1105-boys-denim-shirt-shorts-set.jpeg", "kids", "kids", "6 oz / 200 GSM", "500 Sets",
    ["#1E40AF", "#3B5B8C"], KID, true, {
      en: { name: "Boys' Denim Shirt & Shorts Set", desc: "Short-sleeve chambray-denim shirt with twin chest pockets & matching drawstring shorts", material: "100% Cotton Lightweight Denim (6 oz)" },
      bn: { name: "ছেলেদের ডেনিম শার্ট ও শর্টস সেট", desc: "দুই বুক-পকেটের হাফ হাতা ডেনিম শার্ট ও ম্যাচিং ড্রস্ট্রিং শর্টস", material: "১০০% কটন লাইটওয়েট ডেনিম (৬ oz)" },
      ar: { name: "طقم قميص وشورت دنيم للأولاد", desc: "قميص دنيم بأكمام قصيرة وجيبين على الصدر مع شورت مطابق برباط", material: "100% قطن دنيم خفيف (6 oz)" },
      fa: { name: "ست پیراهن و شورت جین پسرانه", desc: "پیراهن جین آستین‌کوتاه با دو جیب سینه و شورت بنددار هم‌ست", material: "۱۰۰٪ پنبه جین سبک (6 oz)" },
    }),
  P(1106, "1106-girls-sweatshirt-legging-set.jpeg", "kids", "kids", "260 GSM", "600 Sets",
    ["#EC4899", "#FAF5EF", "#F9A8D4"], KID, false, {
      en: { name: "Girls' Sweatshirt & Leopard Legging Set", desc: "Crewneck graphic sweatshirt paired with soft leopard-print leggings", material: "Sweatshirt: 80% Cotton / 20% Poly Fleece · Legging: 95% Cotton / 5% Elastane" },
      bn: { name: "মেয়েদের সোয়েটশার্ট ও লেপার্ড লেগিংস সেট", desc: "ক্রুনেক গ্রাফিক সোয়েটশার্ট, সাথে নরম লেপার্ড-প্রিন্ট লেগিংস", material: "সোয়েটশার্ট: ৮০% কটন / ২০% পলি ফ্লিস · লেগিংস: ৯৫% কটন / ৫% ইলাস্টেন" },
      ar: { name: "طقم سويتشيرت وليغنز نمر للبنات", desc: "سويتشيرت برسومات وياقة دائرية مع ليغنز ناعم بطبعة النمر", material: "السويتشيرت: 80% قطن / 20% بوليستر فليس · الليغنز: 95% قطن / 5% إيلاستين" },
      fa: { name: "ست سویشرت و لگ پلنگی دخترانه", desc: "سویشرت یقه‌گرد طرح‌دار همراه با لگ نرم طرح پلنگی", material: "سویشرت: ۸۰٪ پنبه / ۲۰٪ پلی فلیس · لگ: ۹۵٪ پنبه / ۵٪ الاستین" },
    }),
  P(1107, "1107-baby-printed-bodysuits.jpeg", "kids", "kids", "170 GSM", "1000 Packs",
    ["#FCD9C4", "#FFF7ED", "#F5E6D3"], BABY, false, {
      en: { name: "Baby Printed Bodysuit 4-Pack", desc: "Soft peach-tone short-sleeve bodysuits with delicate mini prints", material: "100% Combed Cotton Jersey (170 GSM)" },
      bn: { name: "বেবি প্রিন্টেড বডিস্যুট ৪-প্যাক", desc: "সূক্ষ্ম মিনি প্রিন্টের নরম পিচ-টোন শর্ট-স্লিভ বডিস্যুট", material: "১০০% কম্বড কটন জার্সি (১৭০ GSM)" },
      ar: { name: "عبوة 4 بودي مطبوع للرضّع", desc: "بودي بأكمام قصيرة بدرجات الخوخ الناعمة مع طبعات صغيرة رقيقة", material: "100% قطن ممشّط جيرسي (170 GSM)" },
      fa: { name: "بسته ۴ عددی بادی طرح‌دار نوزاد", desc: "بادی آستین‌کوتاه نرم با رنگ هلویی و طرح‌های ریز ظریف", material: "۱۰۰٪ پنبه شانه‌شده جرسی (170 GSM)" },
    }),
  P(1108, "1108-baby-long-sleeve-bodysuits.jpeg", "kids", "kids", "180 GSM", "1000 Packs",
    ["#D1FAE5", "#FFFFFF", "#F5E6D3"], BABY, false, {
      en: { name: "Baby Long-Sleeve Bodysuit 5-Pack", desc: "Everyday long-sleeve bodysuits with animal prints & easy envelope neck", material: "100% GOTS Organic Cotton Interlock (180 GSM)" },
      bn: { name: "বেবি লং-স্লিভ বডিস্যুট ৫-প্যাক", desc: "অ্যানিমেল প্রিন্ট ও সহজ এনভেলপ নেক সহ প্রতিদিনের ফুল হাতা বডিস্যুট", material: "১০০% GOTS অর্গানিক কটন ইন্টারলক (১৮০ GSM)" },
      ar: { name: "عبوة 5 بودي بأكمام طويلة للرضّع", desc: "بودي يومي بأكمام طويلة وطبعات حيوانات وياقة مغلّفة سهلة", material: "100% قطن عضوي GOTS إنترلوك (180 GSM)" },
      fa: { name: "بسته ۵ عددی بادی آستین‌بلند نوزاد", desc: "بادی روزمره آستین‌بلند با طرح حیوانات و یقه پاکتی آسان", material: "۱۰۰٪ پنبه ارگانیک GOTS اینترلاک (180 GSM)" },
    }),
  P(1109, "1109-baby-ribbed-floral-bodysuits.jpeg", "kids", "kids", "190 GSM", "800 Packs",
    ["#FBCFE8", "#FED7AA", "#FFF1F2"], BABY, true, {
      en: { name: "Baby Ribbed Floral Bodysuits", desc: "Stretchy rib bodysuits with ditsy floral print & cap sleeves", material: "95% Cotton / 5% Elastane Rib (190 GSM)" },
      bn: { name: "বেবি রিবড ফ্লোরাল বডিস্যুট", desc: "ছোট ফুলের প্রিন্ট ও ক্যাপ স্লিভ সহ স্ট্রেচি রিব বডিস্যুট", material: "৯৫% কটন / ৫% ইলাস্টেন রিব (১৯০ GSM)" },
      ar: { name: "بودي مضلّع بالزهور للرضّع", desc: "بودي مضلّع مرن بطبعة زهور صغيرة وأكمام قصيرة جدًا", material: "95% قطن / 5% إيلاستين مضلّع (190 GSM)" },
      fa: { name: "بادی کبریتی گل‌دار نوزاد", desc: "بادی کبریتی کشی با طرح گل‌های ریز و آستین کپ", material: "۹۵٪ پنبه / ۵٪ الاستین کبریتی (190 GSM)" },
    }),
  P(1110, "1110-baby-footed-sleepsuits.jpeg", "kids", "kids", "200 GSM", "800 Packs",
    ["#C2410C", "#FDBA74", "#7C2D12", "#F5E6D3"], BABY, false, {
      en: { name: "Baby Footed Sleepsuit 5-Pack", desc: "Snap-front footed sleepsuits in warm terracotta prints & stripes", material: "100% Cotton Interlock (200 GSM)" },
      bn: { name: "বেবি ফুটেড স্লিপস্যুট ৫-প্যাক", desc: "উষ্ণ টেরাকোটা প্রিন্ট ও স্ট্রাইপে সামনে স্ন্যাপ বোতামের ফুটেড স্লিপস্যুট", material: "১০০% কটন ইন্টারলক (২০০ GSM)" },
      ar: { name: "عبوة 5 بيجامة بقدمين للرضّع", desc: "بيجامة بقدمين وأزرار كبس أمامية بطبعات وخطوط تيراكوتا دافئة", material: "100% قطن إنترلوك (200 GSM)" },
      fa: { name: "بسته ۵ عددی سرهمی پادار نوزاد", desc: "سرهمی پادار با دکمه‌قابلمه‌ای جلو در طرح‌ها و راه‌راه‌های آجری گرم", material: "۱۰۰٪ پنبه اینترلاک (200 GSM)" },
    }),
  P(1111, "1111-boys-graphic-tee-shorts-set.jpeg", "kids", "kids", "160 GSM", "600 Sets",
    ["#4D7C0F", "#60A5FA", "#F97316", "#1E3A8A", "#D6C7A1"], KID, true, {
      en: { name: "Boys' Graphic Tee & Shorts Set", desc: "Adventure-themed printed tees with coordinated cotton shorts in 9 styles", material: "Tee: 100% Cotton Jersey (160 GSM) · Shorts: Cotton Twill" },
      bn: { name: "ছেলেদের গ্রাফিক টি ও শর্টস সেট", desc: "৯টি স্টাইলে অ্যাডভেঞ্চার-থিম প্রিন্টেড টি, সাথে ম্যাচিং কটন শর্টস", material: "টি: ১০০% কটন জার্সি (১৬০ GSM) · শর্টস: কটন টুইল" },
      ar: { name: "طقم تيشيرت برسومات وشورت للأولاد", desc: "تيشيرتات مطبوعة بطابع المغامرة مع شورت قطني متناسق بـ 9 تصاميم", material: "التيشيرت: 100% قطن جيرسي (160 GSM) · الشورت: قطن تويل" },
      fa: { name: "ست تیشرت طرح‌دار و شورت پسرانه", desc: "تیشرت‌های چاپی با تم ماجراجویی و شورت پنبه‌ای هماهنگ در ۹ مدل", material: "تیشرت: ۱۰۰٪ پنبه جرسی (160 GSM) · شورت: پنبه جناقی" },
    }),
  P(1112, "1112-baby-zip-sleepsuits.jpeg", "kids", "kids", "200 GSM", "800 Packs",
    ["#9CA3AF", "#F5E6D3", "#BE123C", "#FFFFFF"], BABY, false, {
      en: { name: "Baby Zip-Up Sleepsuit 4-Pack", desc: "Two-way zip footed sleepsuits with soft prints for easy night changes", material: "100% Cotton Interlock (200 GSM)" },
      bn: { name: "বেবি জিপ-আপ স্লিপস্যুট ৪-প্যাক", desc: "রাতে সহজে কাপড় বদলানোর জন্য টু-ওয়ে জিপ সহ নরম প্রিন্টের ফুটেড স্লিপস্যুট", material: "১০০% কটন ইন্টারলক (২০০ GSM)" },
      ar: { name: "عبوة 4 بيجامة بسحّاب للرضّع", desc: "بيجامة بقدمين وسحّاب باتجاهين وطبعات ناعمة لتغيير سهل ليلًا", material: "100% قطن إنترلوك (200 GSM)" },
      fa: { name: "بسته ۴ عددی سرهمی زیپ‌دار نوزاد", desc: "سرهمی پادار با زیپ دوطرفه و طرح‌های نرم برای تعویض آسان شبانه", material: "۱۰۰٪ پنبه اینترلاک (200 GSM)" },
    }),
  P(1113, "1113-boys-chambray-shirt-chino-set.jpeg", "kids", "kids", "150 GSM", "500 Sets",
    ["#60A5FA", "#D6C7A1"], KID, false, {
      en: { name: "Boys' Chambray Shirt & Chino Shorts Set", desc: "Roll-up sleeve chambray shirt with embroidery & drawstring chino shorts", material: "Shirt: 100% Cotton Chambray (150 GSM) · Shorts: Cotton Twill" },
      bn: { name: "ছেলেদের শ্যামব্রে শার্ট ও চিনো শর্টস সেট", desc: "এমব্রয়ডারি করা রোল-আপ হাতার শ্যামব্রে শার্ট ও ড্রস্ট্রিং চিনো শর্টস", material: "শার্ট: ১০০% কটন শ্যামব্রে (১৫০ GSM) · শর্টস: কটন টুইল" },
      ar: { name: "طقم قميص شامبري وشورت تشينو للأولاد", desc: "قميص شامبري بأكمام قابلة للطي وتطريز مع شورت تشينو برباط", material: "القميص: 100% قطن شامبري (150 GSM) · الشورت: قطن تويل" },
      fa: { name: "ست پیراهن شامبره و شورت چینو پسرانه", desc: "پیراهن شامبره با آستین تاشو و گلدوزی همراه شورت چینو بنددار", material: "پیراهن: ۱۰۰٪ پنبه شامبره (150 GSM) · شورت: پنبه جناقی" },
    }),

  // ── INNERWEAR ────────────────────────────────────────────────────────────
  P(1301, "1301-mens-cotton-stretch-trunks.jpeg", "innerwear", "men", "190 GSM", "1200 Pcs",
    ["#111827", "#FFFFFF", "#7F1D1D", "#1E3A8A", "#F9A8D4", "#166534"], ["S", "M", "L", "XL", "2XL"], true, {
      en: { name: "Men's Cotton Stretch Trunks (Multi-Pack)", desc: "Contour-pouch trunks with custom jacquard logo waistband — your brand on the elastic", material: "95% Cotton / 5% Elastane Jersey (190 GSM)" },
      bn: { name: "পুরুষদের কটন স্ট্রেচ ট্রাঙ্কস (মাল্টি-প্যাক)", desc: "কাস্টম জ্যাকার্ড লোগো ওয়েস্টব্যান্ড সহ কনট্যুর-পাউচ ট্রাঙ্কস — ইলাস্টিকে আপনার ব্র্যান্ড", material: "৯৫% কটন / ৫% ইলাস্টেন জার্সি (১৯০ GSM)" },
      ar: { name: "بوكسر قطني مطّاط للرجال (عبوة متعددة)", desc: "بوكسر بتصميم مريح وحزام جاكار بشعار مخصّص — علامتك على المطاط", material: "95% قطن / 5% إيلاستين جيرسي (190 GSM)" },
      fa: { name: "ترانک کتان کشی مردانه (بسته چندتایی)", desc: "ترانک با کیسه آناتومیک و کمربند ژاکارد با لوگوی سفارشی — برند شما روی کش", material: "۹۵٪ پنبه / ۵٪ الاستین جرسی (190 GSM)" },
    }),
  P(1302, "1302-mens-boxer-briefs.jpeg", "innerwear", "men", "200 GSM", "1200 Pcs",
    ["#111827", "#9CA3AF", "#1E3A8A"], ["S", "M", "L", "XL", "2XL", "3XL"], false, {
      en: { name: "Men's Everyday Boxer Briefs 3-Pack", desc: "Mid-length boxer briefs with soft brushed waistband & tag-free comfort", material: "92% Cotton / 8% Spandex Jersey (200 GSM)" },
      bn: { name: "পুরুষদের এভরিডে বক্সার ব্রিফ ৩-প্যাক", desc: "নরম ব্রাশড ওয়েস্টব্যান্ড ও ট্যাগ-ফ্রি আরাম সহ মিড-লেংথ বক্সার ব্রিফ", material: "৯২% কটন / ৮% স্প্যানডেক্স জার্সি (২০০ GSM)" },
      ar: { name: "عبوة 3 بوكسر بريف يومي للرجال", desc: "بوكسر بريف بطول متوسط وحزام ناعم مُصفّف وراحة بدون ملصقات", material: "92% قطن / 8% سباندكس جيرسي (200 GSM)" },
      fa: { name: "بسته ۳ عددی باکسر بریف روزمره مردانه", desc: "باکسر بریف با طول متوسط، کمربند نرم برس‌خورده و راحتی بدون برچسب", material: "۹۲٪ پنبه / ۸٪ اسپندکس جرسی (200 GSM)" },
    }),
  P(1303, "1303-mens-woven-check-boxers.jpeg", "innerwear", "men", "120 GSM", "1200 Pcs",
    ["#1E3A8A", "#166534", "#0EA5E9", "#7F1D1D"], ["S", "M", "L", "XL", "2XL"], false, {
      en: { name: "Men's Woven Check Boxer Shorts", desc: "Breathable yarn-dyed check boxers with covered elastic waist & button fly", material: "100% Cotton Yarn-Dyed Poplin (120 GSM)" },
      bn: { name: "পুরুষদের ওভেন চেক বক্সার শর্টস", desc: "ঢাকা ইলাস্টিক কোমর ও বোতাম ফ্লাই সহ বাতাস-চলাচলকারী ইয়ার্ন-ডাইড চেক বক্সার", material: "১০০% কটন ইয়ার্ন-ডাইড পপলিন (১২০ GSM)" },
      ar: { name: "شورت بوكسر منسوج مربّعات للرجال", desc: "بوكسر مربّعات مصبوغ الخيوط يسمح بالتهوية بخصر مطاطي مغطّى وفتحة بأزرار", material: "100% قطن بوبلين مصبوغ الخيوط (120 GSM)" },
      fa: { name: "شورت باکسر چهارخانه بافته مردانه", desc: "باکسر چهارخانه نخ‌رنگ قابل تنفس با کمر کشی پوشیده و دکمه جلو", material: "۱۰۰٪ پنبه پاپلین نخ‌رنگ (120 GSM)" },
    }),
  P(1304, "1304-womens-lace-pushup-bra.jpeg", "innerwear", "women", "Lace + Foam Cup", "1000 Pcs",
    ["#111827", "#1E3A8A", "#831843", "#F9A8D4", "#E7D3C2"], ["32B", "34B", "34C", "36B", "36C", "38C"], true, {
      en: { name: "Women's Lace Push-Up Bra", desc: "Underwire push-up bra with all-over floral lace, adjustable straps & hook-and-eye back", material: "Nylon/Spandex Lace with Molded Foam Cups" },
      bn: { name: "নারীদের লেস পুশ-আপ ব্রা", desc: "অল-ওভার ফ্লোরাল লেস, অ্যাডজাস্টেবল স্ট্র্যাপ ও হুক-অ্যান্ড-আই ব্যাক সহ আন্ডারওয়্যার পুশ-আপ ব্রা", material: "নাইলন/স্প্যানডেক্স লেস, মোল্ডেড ফোম কাপ" },
      ar: { name: "حمّالة صدر دانتيل بوش أب نسائية", desc: "حمّالة بوش أب بسلك داعم ودانتيل زهري كامل وأحزمة قابلة للتعديل وإغلاق خلفي بمشابك", material: "دانتيل نايلون/سباندكس مع أكواب إسفنجية مقولبة" },
      fa: { name: "سوتین توری پوش‌آپ زنانه", desc: "سوتین پوش‌آپ فنردار با تور گل‌دار سرتاسری، بند قابل تنظیم و قزن پشت", material: "تور نایلون/اسپندکس با کاپ فوم قالبی" },
    }),
  P(1305, "1305-womens-padded-tshirt-bra.jpeg", "innerwear", "women", "Spacer Foam Cup", "1000 Pcs",
    ["#F9A8D4", "#E7D3C2", "#A78BFA", "#9F1239"], ["32B", "34B", "34C", "36B", "36C", "38C"], false, {
      en: { name: "Women's Padded T-Shirt Bra", desc: "Smooth contour cups with lace trim, seamless under clothes for everyday wear", material: "Polyamide/Elastane Microfiber with Spacer Foam" },
      bn: { name: "নারীদের প্যাডেড টি-শার্ট ব্রা", desc: "লেস ট্রিম সহ স্মুথ কনট্যুর কাপ, প্রতিদিনের পোশাকের নিচে সিমলেস দেখায়", material: "পলিঅ্যামাইড/ইলাস্টেন মাইক্রোফাইবার, স্পেসার ফোম" },
      ar: { name: "حمّالة صدر مبطّنة تحت التيشيرت نسائية", desc: "أكواب ناعمة بتصميم انسيابي مع حواف دانتيل، غير ظاهرة تحت الملابس للاستخدام اليومي", material: "ألياف دقيقة بولياميد/إيلاستين مع إسفنج سبيسر" },
      fa: { name: "سوتین فوم‌دار تی‌شرتی زنانه", desc: "کاپ‌های صاف با لبه توری، بدون درز زیر لباس برای استفاده روزمره", material: "میکروفایبر پلی‌آمید/الاستین با فوم اسپیسر" },
    }),
  P(1306, "1306-womens-lace-briefs-5-pack.jpeg", "innerwear", "women", "Stretch Lace", "1500 Packs",
    ["#111827", "#1E3A8A", "#99F6E4", "#F5E6D3", "#9F1239"], ["XS", "S", "M", "L", "XL"], false, {
      en: { name: "Women's Lace Briefs 5-Pack", desc: "Full-coverage stretch lace briefs with soft cotton gusset in assorted colors", material: "90% Nylon / 10% Spandex Lace, Cotton Gusset" },
      bn: { name: "নারীদের লেস ব্রিফ ৫-প্যাক", desc: "নরম কটন গাসেট সহ ফুল-কভারেজ স্ট্রেচ লেস ব্রিফ, বিভিন্ন রঙে", material: "৯০% নাইলন / ১০% স্প্যানডেক্স লেস, কটন গাসেট" },
      ar: { name: "عبوة 5 سراويل دانتيل نسائية", desc: "سراويل دانتيل مطّاطة بتغطية كاملة وبطانة قطنية ناعمة بألوان متنوعة", material: "90% نايلون / 10% سباندكس دانتيل، بطانة قطنية" },
      fa: { name: "بسته ۵ عددی شورت توری زنانه", desc: "شورت توری کشی با پوشش کامل و آستر نرم پنبه‌ای در رنگ‌های متنوع", material: "۹۰٪ نایلون / ۱۰٪ اسپندکس توری، آستر پنبه‌ای" },
    }),
];
