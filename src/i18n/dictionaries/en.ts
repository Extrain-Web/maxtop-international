// English dictionary — the source of truth for the translation shape.
// `Dictionary = typeof en`, so bn/ar/fa must mirror this structure exactly.

export const en = {
  nav: {
    home: "Home",
    about: "About Us",
    products: "Products",
    services: "Services",
    contact: "Contact Us",
    requestQuote: "Request Quote (RFQ)",
    submitRfq: "Submit RFQ / Tech-Pack",
    changeLanguage: "Change language",
  },

  common: {
    browseProducts: "Browse Products",
    exploreProducts: "Explore Products",
  },

  hero: {
    badge: "STRATEGIC APPAREL SOURCING · BANGLADESH",
    titleLead: "Connecting Global Fashion With",
    titleHighlight: "Certified Factories",
    subtitle:
      "Your agile RMG buying agency in Bangladesh. Transparent open-book costing, sustainable green facilities, and strict AQL 1.5 zero-defect guarantee.",
    ctaPrimary: "Request Quotation (RFQ)",
    ctaSecondary: "Browse Products",
  },

  about: {
    badge: "WHO WE ARE · STRATEGIC RMG SOURCING",
    titleLead: "The Bridge Between",
    titleHighlight: "Fashion Vision",
    titleTail: "& Factory Execution",
    intro:
      "**Maxtop International** is a premier apparel sourcing agency and registered buying house headquartered in Dhaka, Bangladesh. We serve as the agile, transparent link between international retail fashion brands and audited, socially compliant RMG manufacturing facilities.",
    sub: "Operating with deep industry expertise across Knitwear, Woven, Denim, and Activewear, we eliminate cross-border manufacturing risks through open-book FOB costing, aggressive lead-time management, and strict AQL 2.5 zero-defect control.",
    pillars: [
      {
        title: "12–18% Cost Advantage",
        desc: "Direct mill fabric procurement eliminating middleman markups.",
      },
      {
        title: "7–10 Days Sampling",
        desc: "In-house CAD pattern masters for rapid proto and fit approvals.",
      },
      {
        title: "100% Audited Facilities",
        desc: "Accord/RSC, BSCI, OEKO-TEX & Sedex audited partner mills.",
      },
      {
        title: "Low MOQ from 500 Pcs",
        desc: "Dedicated flexible lines supporting emerging & boutique labels.",
      },
    ],
    expYears: "10+",
    expYearsLabel: "Years",
    expTitle: "RMG Excellence",
    expSub: "Trusted by 30+ European & US retail buyers.",
    wheelTag: "360° SOURCING",
    wheelEcosystem: "FULL ECOSYSTEM",
    spinningProducts: [
      { name: "Outerwear & Jackets", spec: "Padded & Fleece" },
      { name: "Denim & Jeans Line", spec: "Rigid & Stretch" },
      { name: "Knitwear & Polos", spec: "100% Combed Cotton" },
      { name: "Woven & Dress Shirts", spec: "Oxford & Linen" },
      { name: "Hoodies & Sweatshirts", spec: "Heavyweight Fleece" },
      { name: "Activewear & Gym", spec: "Quick-Dry Performance" },
      { name: "Chinos & Cargo Bottoms", spec: "Twill & Ripstop" },
      { name: "Bags & Lifestyle Gear", spec: "Canvas & Nylon" },
    ],
    philosophyBadge: "SUSTAINABLE SOURCING PHILOSOPHY",
    philosophyTitleLead: "We Act For Sourcing",
    philosophyTitleHighlight: "Sustainable",
    philosophyTitleTail: "& High-Spec Products",
    philosophyIntro:
      "**Maxtop International** is an ISO 9001:2015-certified, progressive apparel export and sourcing company headquartered in Dhaka, Bangladesh. We supply sustainable, high-quality apparel and fashion accessories across Europe, North America, the UK, Australia, and the Middle East.",
    benefits: [
      "**Eco-Certified Materials:** GOTS Organic Cotton, BCI Cotton, and GRS recycled polyester.",
      "**Green Partner Facilities:** LEED-certified green partner factories with 45%+ water recycling.",
      "**Global Liaison Coordination:** Dhaka HQ with dedicated liaison support for London & NY time-zones.",
    ],
    ctaInquire: "Inquire Sourcing Capacity",
    ctaCatalog: "Explore Product Catalog",
    certKicker: "Certified Sourcing Network",
    certTitle: "Adhering to the World's Strictest Social & Environmental Audits",
    certs: [
      { name: "OEKO-TEX®", sub: "Standard 100" },
      { name: "amfori BSCI", sub: "Social Audit" },
      { name: "WRAP", sub: "Gold Certified" },
      { name: "Sedex SMETA", sub: "4-Pillar Audited" },
      { name: "GOTS Organic", sub: "Eco Certified" },
      { name: "ISO 9001", sub: "Quality Standard" },
    ],
  },

  services: {
    badge: "END-TO-END CAPABILITIES",
    title: "Full-Spectrum Apparel Sourcing Solutions",
    subtitle:
      "We operate as your on-ground sourcing office in Dhaka, Bangladesh—ensuring 100% factory transparency, competitive FOB pricing, and uncompromising quality.",
    cta: "Request Factory Costing",
    serviceLabel: "SERVICE",
    keyDeliverables: "Key Deliverables",
    items: [
      {
        title: "Design & R&D Sampling",
        category: "Product Development",
        desc: "From initial CAD tech-packs to fit sign-off. Our master pattern makers engineer sales-ready prototypes in 7–10 days.",
        deliverables: [
          "2D/3D CLO digital fit simulation & grading",
          "Proto & salesman sample turnaround in 7–10 days",
          "Cost-optimized fabric consumption planning",
        ],
        tags: ["2D/3D CAD", "Proto Samples", "Size Grading"],
      },
      {
        title: "Fabric & Trims Procurement",
        category: "Raw Material Sourcing",
        desc: "Direct yarn sourcing from certified mills. Pantone-matched lab dips, GOTS organic cotton, and eco-certified hardware trims.",
        deliverables: [
          "Mill-direct yarn booking for competitive pricing",
          "Pantone TCX lab-dip approval within 48–72 hours",
          "OEKO-TEX & GRS certified trims and accessories",
        ],
        tags: ["Mill Direct", "Pantone Lab Dips", "OEKO-TEX Trims"],
      },
      {
        title: "Inline & Final QA (AQL 2.5)",
        category: "Quality Assurance",
        desc: "On-ground QC inspectors stationed on factory floors conducting 4-point raw fabric audits, inline checks, and final pre-shipment sign-off.",
        deliverables: [
          "Daily digital inline inspection defect reports",
          "Strict AQL 1.5 / 2.5 international standard audits",
          "100% carton barcode & needle detection scanning",
        ],
        tags: ["AQL 2.5 Standard", "Daily Reports", "Pre-Shipment"],
      },
      {
        title: "Textile Laboratory Testing",
        category: "Lab & Compliance",
        desc: "Comprehensive in-house physical and chemical lab tests adhering to ISO, ASTM, and AATCC global buyer requirements.",
        deliverables: [
          "Dimensional stability, shrinkage & torque testing",
          "Color fastness to washing, perspiration & light",
          "Yarn count, GSM calibration & pilling resistance",
        ],
        tags: ["ISO / AATCC", "Color Fastness", "GSM Calibration"],
      },
      {
        title: "Global Export & Logistics",
        category: "Freight & Customs",
        desc: "Turnkey FOB, CIF, or DDP terms. Direct vessel booking out of Chittagong port with seamless customs clearance and documentation.",
        deliverables: [
          "Fast container clearance via Chittagong (CTG) Port",
          "Duty-free GSP+ / EU / US preferential trade docs",
          "Live container GPS tracking till warehouse delivery",
        ],
        tags: ["FOB / CIF / DDP", "Duty-Free GSP+", "Port Handling"],
      },
      {
        title: "Social & Environmental Audit",
        category: "Compliance & Safety",
        desc: "Every order is placed in BSCI, Sedex SMETA, WRAP, and LEED Green-certified garment factories with strict fire & building safety.",
        deliverables: [
          "100% child-labor-free audited factory floor allocation",
          "Higg Index environmental & water footprint audits",
          "Transparent worker wage & safety compliance checks",
        ],
        tags: ["BSCI & Sedex", "LEED Certified", "Zero Child Labor"],
      },
    ],
  },

  howWeWork: {
    badge: "WORKING PROCESS",
    title: "How We Work",
    intro:
      "We prioritize your requirements, functioning as your committed on-ground representative in Bangladesh. Our approach involves assessing inquiries, locking in factory cost savings, and safeguarding quality from design to vessel departure.",
    keyMilestones: "Key Milestones:",
    cta: "Start Sourcing Inquiry",
    hint: "Click any step on the wheel to view details ↺",
    stepWord: "Step",
    brandLine1: "MAXTOP",
    brandLine2: "INTERNATIONAL",
    brandLine3: "SOURCING LTD",
    steps: [
      {
        shortTitle: "Receiving Query",
        fullTitle: "1. Receiving Query & Costing",
        timeline: "24–48 Hours",
        summary:
          "We thoroughly analyze your design tech-packs, target price, and fabric requirements. Our team calculates open-book FOB costing with zero hidden fees.",
        deliverables: [
          "Tech-pack & fabric consumption analysis",
          "Competitive FOB/CIF target costing",
          "Lead time & MOQ feasibility breakdown",
        ],
      },
      {
        shortTitle: "Vendor Selection",
        fullTitle: "2. Compliant Vendor Allocation",
        timeline: "2–3 Days",
        summary:
          "We match your order with the most suitable partner factory based on specialized machinery, BSCI/Sedex compliance, and product category.",
        deliverables: [
          "BSCI / Sedex / WRAP audited factory mapping",
          "Category-specific production line locking",
          "Social & environmental compliance check",
        ],
      },
      {
        shortTitle: "Order & Execution",
        fullTitle: "3. Sampling & Order Execution",
        timeline: "7–10 Days",
        summary:
          "We develop proto samples, fit approvals, and Pantone TCX lab-dips. Bulk raw material procurement begins only after buyer sign-off.",
        deliverables: [
          "Physical proto & salesman samples",
          "Pantone-matched fabric lab dips (48h)",
          "Bulk raw material yarn & trim lock",
        ],
      },
      {
        shortTitle: "Quality Assurance",
        fullTitle: "4. Strict Quality Assurance (AQL 2.5)",
        timeline: "Continuous",
        summary:
          "Our stationed QC engineers monitor knitting, dying, cutting, and line sewing. Strict 4-point fabric inspection and pre-shipment AQL 2.5 audits.",
        deliverables: [
          "Daily digital inline inspection reports",
          "Strict AQL 1.5 / 2.5 defect audits",
          "100% metal/needle detection scan",
        ],
      },
      {
        shortTitle: "Shipping & Logistic",
        fullTitle: "5. Global Shipping & Logistics",
        timeline: "On-Schedule",
        summary:
          "Seamless freight coordination out of Chittagong Port. We handle commercial invoices, packing lists, bill of lading, and GSP+ duty-free documentation.",
        deliverables: [
          "Chittagong (CTG) Port vessel booking",
          "Duty-free GSP+ / Form-A customs papers",
          "Real-time container GPS voyage tracking",
        ],
      },
      {
        shortTitle: "After Sales Services",
        fullTitle: "6. After-Sales & Ongoing Support",
        timeline: "Post-Delivery",
        summary:
          "Our partnership continues after shipment arrival. We gather buyer feedback, review retail sell-through rates, and plan rapid repeat replenishment.",
        deliverables: [
          "Post-delivery quality satisfaction review",
          "Repeat order buffer stock management",
          "Continuous fabric R&D seasonal updates",
        ],
      },
    ],
  },

  whyChooseUs: {
    title: "Why Choose Us",
    cards: [
      {
        title: "In-House Quality Control Solutions",
        desc: "Stationed on-ground QC inspectors conducting 4-point raw fabric inspection, in-line sewing audits, and final AQL 2.5 pre-shipment sign-offs.",
        highlight: "Zero-Defect AQL 2.5",
      },
      {
        title: "Full Logistics & Supply Chain Services",
        desc: "Seamless freight forwarding and container booking out of Chittagong (CTG) Port, customs clearance, and GSP+ duty-free trade documentation.",
        highlight: "FOB / CIF / DDP Terms",
      },
      {
        title: "Cost Effectiveness & Factory Direct Prices",
        desc: "Transparent open-book costing directly with certified spinning mills. We re-engineer pattern consumption to maximize your gross margin.",
        highlight: "15–20% Cost Advantage",
      },
      {
        title: "Low MOQ & Seasoned Technical Team",
        desc: "Support for growing fashion brands with flexible MOQs starting from 500 pcs per style and dedicated merchandisers with 15+ years experience.",
        highlight: "Low MOQ from 500 Pcs",
      },
    ],
  },

  recognitions: {
    recognizedBy: "We Are Recognized By",
    partnerCerts: "Our Partner Certifications",
  },

  faq: {
    badge: "Frequently Asked Questions",
    titleLead: "Got Questions?",
    titleHighlight: "We Have Answers.",
    subtitle:
      "Everything you need to know about our sourcing, sampling timeline, MOQs, and global export compliance.",
    stillQuestions: "Still have questions?",
    talkToExperts: "Talk to our sourcing experts",
    items: [
      {
        question: "What is your Minimum Order Quantity (MOQ)?",
        answer:
          "Our flexible MOQ starts from 500 to 800 pcs per style/colorway for knitwear (T-shirts, polos, hoodies), and 800 to 1,000 pcs for woven shirts and denim. For emerging fashion brands and trial orders, we can split MOQs across multiple sizes based on fabric stock availability.",
      },
      {
        question:
          "How long does sample development take, and do you charge for proto samples?",
        answer:
          "Proto samples and 48-hour Pantone TCX lab dips are completed in 7 to 10 working days upon receiving your tech-pack specs. Initial proto samples are developed free of charge for confirmed inquiries (international courier charges apply). Fit and salesman samples are submitted prior to bulk cut sign-off.",
      },
      {
        question:
          "What is your typical production turnaround and delivery lead time?",
        answer:
          "Bulk garment production typically takes 45 to 60 calendar days from the date of final sample sign-off and payment/L/C confirmation. For repeat orders utilizing in-stock yarn or localized knitting mills, we can fast-track production within 30 to 35 days.",
      },
      {
        question:
          "What international payment terms and currencies do you support?",
        answer:
          "We operate primarily on Irrevocable Letter of Credit (L/C at sight) and Telegraphic Transfer (T/T: 30% advance deposit upon order confirmation and 70% balance against Bill of Lading copy). We transact in USD ($), EUR (€), and GBP (£) with zero foreign exchange hidden fees.",
      },
      {
        question:
          "How do you ensure AQL 2.5 quality control across partner factories?",
        answer:
          "We maintain our own stationed Quality Control (QC) engineers directly on partner factory floors. We enforce strict international AQL 1.5 / 2.5 standards: 4-point raw fabric inspection, inline sewing audits, 100% metal/needle detection scanning, and final pre-shipment audit reports sent digitally to the buyer before container stuffing.",
      },
      {
        question:
          "Which shipping terms do you handle, and which sea/air ports are used?",
        answer:
          "We handle FOB (Chittagong Port - CTG), CIF (named destination port), and DDP (doorstep warehouse delivery). Ocean vessels depart weekly from Chittagong Port, while express air shipments depart via Hazrat Shahjalal International Airport (DAC), Dhaka.",
      },
      {
        question:
          "Can your partner mills source organic cotton and GRS-certified recycled fabrics?",
        answer:
          "Yes. We have mill-direct partnerships supplying GOTS-certified 100% organic combed cotton, BCI (Better Cotton), GRS-certified recycled polyester, French terry, modal, bamboo, and sustainable low-water washed denim with full transaction certificates (TC).",
      },
      {
        question:
          "Are your manufacturing factories compliant with European and US labor standards?",
        answer:
          "100% of our allocated factories hold active audit certifications including amfori BSCI (Grade A/B), Sedex SMETA (4-Pillar), WRAP Gold, OEKO-TEX Standard 100, and RSC (RMG Sustainability Council) fire, electrical, and structural safety approval.",
      },
    ],
  },

  footer: {
    tagline: "Global Apparel Sourcing House · Dhaka, BD",
    about:
      "Your committed on-ground apparel sourcing agency in Dhaka, Bangladesh. We bridge international fashion retailers with audited, BSCI, Accord/RSC, and OEKO-TEX certified garment manufacturing facilities.",
    followUs: "Follow & Connect With Us",
    quickLinks: "Quick Links",
    apparelLines: "Apparel Lines",
    apparelLinesItems: [
      "Heavyweight T-Shirts",
      "Denim Jeans & Washes",
      "Woven Casual Shirts",
      "French Terry Hoodies",
      "Gym & Activewear",
      "Sustainable Organic",
    ],
    hqTitle: "Dhaka Headquarters",
    address: "Sector #03, Uttara, Dhaka-1230, Bangladesh",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM (GMT+6)",
    copyright:
      "© 2026 **Maxtop International Ltd.** All rights reserved. Registered Garments Buying House in Bangladesh.",
  },

  aboutPage: {
    bannerTitle: "About Us",
    bannerSubtitle:
      "A Reputed Apparel Buying House Company in Bangladesh Specialized for Sourcing Sustainable Quality Products and Garment Accessories.",
    directionBadge: "STRATEGIC DIRECTION",
    vmTitle: "Our Vision & Core Mission",
    vmSubtitle:
      "Guiding our daily sourcing operations, manufacturing partnerships, and long-term commitments to global fashion sustainability.",
    vision: {
      kicker: "Global Benchmark",
      title: "Our Vision",
      text: "To be the most trusted, agile, and forward-thinking apparel sourcing partner in South Asia—recognized globally for transforming Bangladesh's RMG manufacturing into a fully transparent, ethical, and carbon-conscious ecosystem.",
      points: [
        "100% Traceable Organic & Recycled Fiber Procurement",
        "Zero-Tolerance Ethical Labor Standards Across All Lines",
        "Digital Tech-Pack Integration & 3D Prototyping",
      ],
    },
    mission: {
      kicker: "Operational Excellence",
      title: "Our Mission",
      text: "To bridge international apparel brands with top-tier, compliant Bangladeshi factories by executing transparent FOB pricing, rigorous AQL 2.5 quality control, and dependable on-time delivery from initial sketch to final port dispatch.",
      points: [
        "Direct Mill Yarn & Fabric Sourcing Without Hidden Markups",
        "Fast-Track 7-10 Days Sampling for Accelerated Go-To-Market",
        "Dedicated 24/7 Client Merchandising Liaison in Dhaka HQ",
      ],
    },
  },

  servicesPage: {
    heroBadge: "Full-Service Apparel Buying House",
    heroTitle: "How We Power Your Apparel Brand In Bangladesh",
    heroSubtitle:
      "A transparent, reliable buying and sourcing partner. From fabric milling and rapid proto sampling to bulk manufacturing and port clearance.",
    provideKicker: "WHAT WE PROVIDE",
    provideTitle: "End-To-End Sourcing & Manufacturing Services",
    provideSubtitle:
      "Managing your entire supply chain with transparent costing, audited compliance, and strict AQL quality standards.",
    inquireThisService: "Inquire this service",
    deliverKicker: "HOW WE DELIVER",
    deliverTitle: "The 5-Step Order Execution Journey",
    deliverSubtitle:
      "From your initial tech-pack submission to final container dispatch at Chittagong Port.",
    sopCompliant: "SOP Compliant",
    ctaBadge: "Start Your Production With Us",
    ctaTitle: "Have a Tech-Pack or Looking for a Reliable Sourcing Partner?",
    ctaSubtitle:
      "Send us your garment specs or sketches. We will revert with a detailed open-costing proposal within 24–48 hours.",
    ctaPrimary: "Request Sourcing Quotation",
    ctaSecondary: "Explore Products",
    coreServices: [
      {
        title: "Yarn, Fabric & Trims Sourcing",
        tagline: "RAW MATERIAL PROCUREMENT",
        desc: "Direct mill linkage across Bangladesh & South Asia. Sourcing combed cotton, BCI organic yarn, CVC, linen, and specialized synthetic blends with zero broker overhead.",
        points: [
          "Mill-direct rates with strict yarn quality audit",
          "Custom pantone lab dips (3-5 days turnaround)",
          "High-grade trims, YKK zippers & custom metal hardware",
        ],
      },
      {
        title: "CAD Pattern & Sample Prototyping",
        tagline: "DESIGN & RAPID SAMPLING",
        desc: "Transforming buyer tech-packs and moodboards into production-grade patterns. Utilizing 2D/3D CAD to verify drape, tension, and fit before cutting bulk fabric.",
        points: [
          "Physical counter & fit samples in 5-7 days",
          "CLO 3D virtual fittings for rapid buyer sign-off",
          "Precision grading for US, EU & Asian size specs",
        ],
      },
      {
        title: "Factory Allocation & Merchandising",
        tagline: "VETTED VENDOR SELECTION",
        desc: "Allocating your orders to the most suitable audited manufacturing lines based on machine capability, gauge, washing specialty, and target lead-time.",
        points: [
          "Dedicated merchandiser managing daily T&A calendar",
          "Accord / RSC, BSCI, SEDEX vetted partner factories",
          "High capacity for Knitwear, Wovens, Denim & Outerwear",
        ],
      },
      {
        title: "Multi-Stage Quality Control (AQL 1.5)",
        tagline: "STATIONED IN-LINE AUDITS",
        desc: "Our on-site QA officers monitor every manufacturing stage from cut-to-pack, enforcing zero tolerance for measurement tolerances or sewing defects.",
        points: [
          "Strict ISO 2859-1 (AQL 1.5 / 2.5) inspection standards",
          "4-point fabric inspection & in-line roving checks",
          "100% metal detector scan prior to carton sealing",
        ],
      },
      {
        title: "In-House Lab Testing & Compliance",
        tagline: "SAFETY & CHEMICAL STANDARDS",
        desc: "Comprehensive physical and chemical laboratory testing ensuring every batch complies with international consumer safety and eco-regulations.",
        points: [
          "Wash fastness, rub fastness, pilling & shrinkage tests",
          "OEKO-TEX Standard 100, REACH & GOTS verification",
          "Detailed laboratory test reports issued before dispatch",
        ],
      },
      {
        title: "Chittagong Port Logistics & Export",
        tagline: "FOB CTG & CIF SHIPPING",
        desc: "From factory warehouse loading to container gate-in at Chittagong Port (CTG), our logistics department manages all customs clearing and export manifests.",
        points: [
          "Export documentation (BL, GSP Form A, Packing List, CO)",
          "Vessel space booking during peak shipping seasons",
          "Flexible Incoterms: FOB Chittagong, CIF, CFR & Air Express",
        ],
      },
    ],
    executionSteps: [
      {
        title: "Tech-Pack & Costing",
        time: "24 - 48 Hours",
        desc: "You send your garment sketch or specs. We calculate fabric yield and provide a transparent, open-book quote.",
      },
      {
        title: "Sampling & Fit Approval",
        time: "5 - 7 Days",
        desc: "We develop physical counter-samples and color lab dips. You review fit, fabric weight, and hand-feel for approval.",
      },
      {
        title: "Milling & Trims Booking",
        time: "15 - 20 Days",
        desc: "Mill yarn spinning, fabric knitting/weaving, dyeing, and custom trims development (custom buttons, YKK zips, labels).",
      },
      {
        title: "Bulk Production & In-Line QC",
        time: "30 - 45 Days",
        desc: "Cutting, sewing, and washing lines operate with our resident QC inspectors checking every seam, stitch, and measurement.",
      },
      {
        title: "Final Audit & Port Dispatch",
        time: "On Schedule",
        desc: "Final AQL 1.5 audit, export carton packing, customs clearance, and container handover at Chittagong Port for vessel departure.",
      },
    ],
  },

  productsPage: {
    heroBadge: "Export Ready RMG Catalog · 50+ Partner Lines",
    heroTitle: "Our Apparel Products",
    heroSubtitle:
      "Explore our full-package manufacturing capability spanning 12+ categories. Vetted green facilities, custom GSM weights, and flexible MOQs.",
    divisionsBadge: "Manufacturing Divisions",
    selectCategory: "Select A Category To Filter",
    selectCategorySub:
      "Click any division below to view tailored specs, or view our full export collection.",
    allCollections: "All Collections",
    viewFullCatalog: "View Full Catalog",
    activeFilter: "Active Division Filter",
    clearFilter: "Clear Filter (View All)",
    requestMoq: "Request Custom MOQ",
    searchPlaceholder: "Search fabric or style...",
    showingPrefix: "Showing",
    stylesIn: "styles in",
    allDivisions: "All Divisions",
    switchBack: "← Switch back to All Products",
    noResultsTitle: "No styles found for this filter",
    noResultsText:
      "We have over 50+ archived styles for this category. Send us your tech-pack for instant custom sampling.",
    resetFilters: "Reset All Filters",
    customRndBadge: "Custom R&D Development",
    customTitle: "Need Custom Fabrication or Private Label Trims?",
    customText:
      "Send us your Pantone specs, artwork, and measurements. Our in-house merchandising team will develop fast-track prototype samples in 7–10 days.",
    submitTechpack: "Submit Tech-Pack (RFQ)",
  },

  products: {
    divisionsBadge: "RMG Manufacturing Divisions",
    linesTitle: "Our Manufacturing Lines",
    linesSubtitle:
      "Explore our full-package export divisions. Click any category to view tailored specs, GSM weights, color options, and order details.",
    exploreCatalog: "Explore Catalog",
    backToCategories: "Back to All Categories",
    viewFullChart: "📐 View Full Conversion Chart",
    sourcingDivision: "Maxtop Apparel Sourcing Division",
    sizeChartBtn: "📐 Size Chart",
    colors: "Colors:",
    sizes: "Sizes:",
    chart: "Chart",
    clickRegionNote:
      "* Click **US**, **UK**, **EU**, or **AU** to see converted measurements.",
    inquireSampleSpec: "Inquire Sample / Spec",
    colorOption: "Color option",
    noItemsPrefix: "No items found in this sub-category for",
    viewAllPrefix: "View all",
    viewAllSuffix: "collection",
    tabs: {
      all: "ALL COLLECTION",
      men: "MEN",
      women: "WOMEN",
      kids: "KIDS",
    },
    audience: {
      men: "Men",
      women: "Women",
      kids: "Kids",
    },
    // Sample inquiry modal
    sampleTechpackRequest: "Sample & Tech-Pack Request",
    sampleProtocol: "Sample Request Protocol",
    requestSamplePrefix: "Request Sample:",
    weightLabel: "Weight:",
    gradedLabel: "Graded: US/UK/EU/AU",
    inquiryReceivedTitle: "Sample Inquiry Received!",
    inquiryReceivedText:
      "Our merchandising team will review your specifications and dispatch physical swatches within 24 to 48 hours.",
    sampleReceivedTitle: "Sample Request Received!",
    sampleReceivedText:
      "Our merchandising desk in Dhaka will review your request and contact you within 24 hours.",
    form: {
      name: "Your Name *",
      namePh: "e.g. John Doe",
      namePh2: "e.g. David Miller",
      email: "Business Email *",
      emailPh: "john@brand.com",
      emailPh2: "david@brand.com",
      brand: "Brand / Company *",
      brandPh: "e.g. Urban Label",
      company: "Company / Brand *",
      companyPh: "e.g. Next Retail Ltd",
      targetSizing: "Target Sizing Standard",
      colorNotes: "Target Colorway / Custom Notes",
      colorNotesPh:
        "e.g. Heather grey colorway, custom metal buttons, 100% combed cotton...",
      colorNotes2: "Specific Colorways / Target Notes",
      colorNotesPh2:
        "Mention colorways, target delivery timeline, or branding requirements...",
      submit: "Submit Sample Request",
      sizingUsa: "USA Standard Sizing",
      sizingUk: "UK / Australia Sizing",
      sizingEu: "European (EU) Sizing",
      sizingCustom: "Custom Buyer Tech-Pack Spec",
    },
  },

  sizeChart: {
    kicker: "International Apparel Sizing Conversion",
    title: "US · UK · EU · AU Sizing Standard",
    subtitle:
      "Standard export grading applied to all Maxtop woven, knit, and denim product lines.",
    standardRegion: "Standard Region",
    usaRow: "USA (United States)",
    ukAuRow: "UK & Australia (AU)",
    euRow: "EU (European Union)",
    customNote:
      "💡 **Custom Tech-Packs:** We strictly follow buyers custom grading specs, tolerance limits (±0.5cm), and proportion charts as per your Purchase Order (PO) sheet.",
    closeChart: "Close Chart",
  },

  contactPage: {
    breadcrumbContact: "Contact",
    heroBadge: "DEDICATED MERCHANDISING DESK",
    heroTitle: "Get In Touch With Maxtop International",
    heroSubtitle:
      "Submit your RFQ or schedule an on-ground factory tour in Bangladesh. Our technical merchandising team responds within 24 hours.",
    badge1: "24-Hour RFQ Turnaround",
    badge2: "Confidential Tech-Pack Review",
    badge3: "Direct Merchandiser WhatsApp",
    rfqBadge: "Request A Quotation (RFQ)",
    rfqTitle: "Tell Us About Your Apparel Requirements",
    rfqSubtitle:
      "Please provide your target specifications. Choose from our standard lines or type your custom product and volume.",
    successTitle: "Inquiry Submitted Successfully!",
    successTextLead: "Thank you,",
    successTextMid: "Your inquiry for",
    successTextTail:
      "has been forwarded to our Senior Merchandising Desk. We will get back to you within 24 hours.",
    successFallbackName: "partner",
    submitAnother: "Submit Another Inquiry",
    fullName: "Your Full Name",
    fullNamePh: "John Doe",
    workEmail: "Work Email Address",
    workEmailPh: "john@yourbrand.com",
    companyBrand: "Company / Fashion Brand",
    companyBrandPh: "e.g. Nordic Apparel Ltd.",
    countryMarket: "Country / Target Market",
    countryMarketPh: "e.g. United Kingdom, Germany, USA",
    garmentCategory: "Garment Category",
    typeCustom: "✏️ Type custom",
    selectFromList: "← Select from list",
    customCategoryPh: "e.g. Babywear, Canvas Bags...",
    estimatedQuantity: "Estimated Quantity (MOQ)",
    typeExactPcs: "✏️ Type exact pcs",
    customQuantityPh: "e.g. 2,500 Pcs (500 pcs/color)...",
    orderDetails: "Order Details, Fabric Specs or Target Price Point",
    orderDetailsPh:
      "Please mention fabric GSM, composition (e.g. 100% Combed Cotton), target delivery date, or special instructions...",
    submit: "Submit Sourcing Inquiry",
    nda: "Your design tech-packs and pricing inquiries are protected by strict NDA.",
    categoryOptions: {
      knitwear: "Knitwear (T-Shirts, Polos, Hoodies)",
      denim: "Denim & Washed Jeans Line",
      woven: "Woven Casual & Formal Shirts",
      outerwear: "Outerwear, Puffers & Jackets",
      activewear: "Activewear & Performance Gym",
      sweater: "Sweaters & Flat Knitwear",
      custom: "✏️ Other / Type Custom Product...",
    },
    quantityOptions: {
      sample: "Proto Samples & Sampling Only",
      q1: "500 – 1,000 Pcs (Flexible MOQ)",
      q2: "1,000 – 5,000 Pcs",
      q3: "5,000 – 20,000 Pcs",
      q4: "20,000+ Pcs (Large Production)",
      custom: "✏️ Type Exact / Custom Quantity...",
    },
    hqTitle: "Corporate Headquarters",
    hqCity: "Dhaka, Bangladesh",
    officeAddressLabel: "Office Address:",
    address: "Sector #03, Uttara, Dhaka-1230, Bangladesh",
    airportNote: "(Only 10 minutes from Hazrat Shahjalal International Airport)",
    emailLabel: "Email Inquiries:",
    phoneLabel: "Direct Phone / Merchandising:",
    hoursLabel: "Operating Hours:",
    hours: "Monday – Saturday: 9:00 AM – 7:00 PM (GMT+6)",
    whatsappChat: "Chat on WhatsApp Directly",
    quickResponse:
      "⚡ **Quick Response:** Inquiries reviewed by senior merchandisers within 2 hours during business hours.",
  },

  productCategories: [
    {
      name: "Knit",
      fullName: "Knitwear Collection",
      desc: "100% Combed compact cotton t-shirts, polos, hoodies & joggers",
    },
    {
      name: "Woven",
      fullName: "Woven & Casual Shirts",
      desc: "Yarn-dyed Oxford cotton, linen blends, poplin & formal shirts",
    },
    {
      name: "Denim",
      fullName: "Denim & Jeans Line",
      desc: "Rigid & stretch 5-pocket denim pants, truckers & enzyme washes",
    },
    {
      name: "Sweater",
      fullName: "Sweaters & Cardigans",
      desc: "Gauge 7-12 fine knit, cable pullovers, woolens & cardigans",
    },
    {
      name: "Outerwear",
      fullName: "Outerwear & Puffer Jackets",
      desc: "Quilted down puffers, waterproof parkas, windbreakers & coats",
    },
    {
      name: "Work Wear",
      fullName: "Industrial & Safety Workwear",
      desc: "High-visibility reflective jackets, flame-retardant coveralls & cargo",
    },
    {
      name: "Activewear",
      fullName: "Activewear & Athleisure",
      desc: "Seamless 4-way stretch gym tights, sports bras & compression wear",
    },
    {
      name: "Sportswear",
      fullName: "Sportswear & Technical Kits",
      desc: "Performance soccer/running jerseys, tracksuits & quick-dry shorts",
    },
    {
      name: "Rainwear",
      fullName: "Rainwear & Storm Parkas",
      desc: "Seam-sealed PU raincoats, waterproof storm slickers & windcheaters",
    },
    {
      name: "Lingeries",
      fullName: "Lingerie & Sleepwear",
      desc: "Breathable organic cotton bralettes, modal pajamas & intimates",
    },
    {
      name: "Baggage",
      fullName: "Baggage & Travel Luggage",
      desc: "Polycarbonate spinner luggage, canvas duffels & utility backpacks",
    },
    {
      name: "Handicraft",
      fullName: "Handicrafts & Eco Jute Gear",
      desc: "100% biodegradable natural jute totes, artisan baskets & woven gear",
    },
  ],

  productItems: [
    { name: "Men's Heavyweight Fleece Joggers", desc: "Ribbed cuff relaxed fit joggers with custom drawcords", material: "65% Cotton / 35% Polyester Terry" },
    { name: "Women's Cropped Boxy Tee", desc: "Short sleeve drop-shoulder organic cotton tee", material: "100% Combed Cotton Single Jersey" },
    { name: "Men's Classic Piqué Polo", desc: "Knitted collar 2-button front tailored polo shirt", material: "95% Cotton / 5% Spandex Piqué" },
    { name: "Kid's Soft Organic Crewneck Tee", desc: "Ultra-soft non-toxic dyed kids crewneck t-shirt", material: "100% GOTS Certified Cotton" },
    { name: "Men's Oxford Button-Down Shirt", desc: "Classic tailored collar with pearlized buttons", material: "100% Combed Compact Cotton" },
    { name: "Women's French Linen Blouse", desc: "Relaxed resort-style breathable linen button-up", material: "100% Pure Washed Linen" },
    { name: "Men's Slim Stretch Chino Pant", desc: "Garment-dyed 4-pocket casual woven trousers", material: "98% Cotton / 2% Elastane Twill" },
    { name: "Kid's Plaid Flannel Shirt", desc: "Cozy brushed cotton long-sleeve winter shirt", material: "100% Brushed Cotton Flannel" },
    { name: "Men's Selvedge Trucker Jacket", desc: "Heavyweight raw denim jacket with shank buttons", material: "100% Rigid Indigo Cotton" },
    { name: "Women's High-Rise Skinny Jeans", desc: "Contour waistband with super stretch recovery", material: "92% Cotton / 6% Poly / 2% Spandex" },
    { name: "Men's Vintage Straight Leg Jeans", desc: "5-Pocket authentic wash with laser whiskering", material: "99% Cotton / 1% Lycra Comfort" },
    { name: "Kid's Elastic Waist Stretch Jeans", desc: "Play-friendly soft enzyme washed denim", material: "98% Cotton / 2% Elastane" },
    { name: "Men's Cable-Knit Crewneck Pullover", desc: "Traditional textured cable stitch warm sweater", material: "70% Lambswool / 30% Polyamide" },
    { name: "Women's Ribbed Button Cardigan", desc: "V-neck cropped soft knit sweater with tortoiseshell buttons", material: "60% Cotton / 40% Acrylic Cashmere Feel" },
    { name: "Kid's Crewneck Striped Knit", desc: "Cozy itch-free knitted jacquard sweater", material: "100% Organic Cotton Knit" },
    { name: "Men's Heavyweight Puffer Parka", desc: "Water-repellent insulated winter hooded coat", material: "100% Recycled Nylon Shell / Polyfill" },
    { name: "Women's Cropped Down Puffer", desc: "Thermal stand-collar jacket with matte finish", material: "100% Polyester Taffeta" },
    { name: "Kid's Hooded Quilted Jacket", desc: "Lightweight windproof zip-up school jacket", material: "Water-Resistant Microfiber" },
    { name: "Men's High-Vis Industrial Safety Jacket", desc: "3M Reflective tape taped waterproof safety coat", material: "300D Oxford Polyester PU Coated" },
    { name: "Heavy-Duty Multi-Pocket Work Cargo Pant", desc: "Reinforced knee pad pockets & triple stitching", material: "65% Poly / 35% Cotton Ripstop" },
    { name: "Women's Tailored Utility Jumpsuit", desc: "Mechanic style zipper boiler suit with elastic waist", material: "100% Cotton Heavy Drill" },
    { name: "Women's High-Waist Seamless Leggings", desc: "Squat-proof moisture-wicking compressive athletic tights", material: "75% Nylon / 25% Spandex Interlock" },
    { name: "Women's Strappy Performance Sports Bra", desc: "Medium support removable pad athletic bralette", material: "80% Poly / 20% Elastane Dry-Fit" },
    { name: "Men's Quick-Dry Breathable Gym Tee", desc: "Anti-odor mesh panel workout t-shirt", material: "100% Recycled Polyester (GRS)" },
    { name: "Pro Performance Soccer Kit Jersey", desc: "Sublimated breathability panels team jersey", material: "100% Poly Birdseye Mesh" },
    { name: "Youth Training Tracksuit Set", desc: "Full zip jacket & tapered training pants set", material: "100% Tricot Polyester" },
    { name: "Men's Waterproof Hooded Storm Slicker", desc: "Heat-welded seams with storm flap & drawcord hood", material: "100% Polyurethane Coated Polyester" },
    { name: "Kid's Yellow Puddle Raincoat", desc: "Snap-button fleece lined waterproof raincoat", material: "Eco PU Waterproof Shell" },
    { name: "Women's Mulberry Silk Pajama Set", desc: "Notch collar button-up shirt and relaxed trouser set", material: "100% Grade 6A Mulberry Silk" },
    { name: "Seamless Organic Cotton Bralette", desc: "Wire-free second-skin breathable daily comfort bra", material: "95% Organic Cotton / 5% Elastane" },
    { name: "Polycarbonate Spinner Luggage (24-Inch)", desc: "TSA combination lock with 360-degree silent spinner wheels", material: "100% Bayer Makrolon Polycarbonate" },
    { name: "Waxed Canvas Weekender Duffel", desc: "Genuine leather handles with brass hardware & shoe pocket", material: "16 oz Water-Resistant Waxed Canvas" },
    { name: "Handwoven Eco Jute Shopping Tote", desc: "100% Biodegradable natural golden fiber export tote bag", material: "Natural Bangladeshi Raw Jute" },
    { name: "Artisan Braided Seagrass Storage Basket", desc: "Handcrafted natural fiber storage basket with handles", material: "100% Natural Seagrass & Cotton Cord" },
  ],
};

export type Dictionary = typeof en;
