export interface Template {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  authorAttribution?: string;
  sourceUrl?: string;
  previewImage: string;
  previewVideo?: string;
  prompt: string;
  category: string;
  stack: string;
  tags: string[];
  price: string;
  isPremium: boolean;
  likes: number;
  views: number;
  downloads?: number;
  createdAt: string;
}

export const INITIAL_TEMPLATES: Template[] = [
  // --- 1. SaaS Landing Page (Existing) ---
  {
    id: "saas-landing-page",
    title: "SaaS Landing Page",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "LENZL Studio",
    sourceUrl: "https://dribbble.com/tags/saas-website",
    price: "Free",
    isPremium: false,
    category: "Landing Page",
    stack: "React + Tailwind",
    description:
      "A sleek, high-converting SaaS landing page with dark aesthetic, hero waitlist, social proof badges, and feature grid cards.",
    tags: ["Landing Page", "SaaS", "React", "Tailwind", "Dark Mode"],
    views: 14200,
    downloads: 840,
    likes: 1240,
    createdAt: "Apr 14, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=70",
    previewVideo:
      "https://cdn.dribbble.com/userupload/47775769/file/814cf81f46a91ed258f093fd0577df99.mp4",
    prompt:
      "Create a modern high-converting dark mode SaaS landing page in React and Tailwind CSS. Include a sticky minimalist header with logo, navigation links, and auth buttons; a hero section with animated badge, bold headline, email waitlist capture; an interactive product mockup preview with subtle glow; and a 3-column feature grid with sleek borders and clean typography.",
  },

  // --- 2. Analytics Dashboard (Existing) ---
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    author: "React + Recharts",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "LENZL Studio",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "Free",
    isPremium: false,
    category: "Dashboard",
    stack: "React",
    description:
      "Comprehensive analytics dashboard featuring multi-series line charts, metric KPI summary cards, time-range selectors, and responsive sidebar.",
    tags: ["Dashboard", "Analytics", "Recharts", "React", "Metrics"],
    views: 9800,
    downloads: 512,
    likes: 890,
    createdAt: "Apr 12, 2026",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    previewVideo:
      "https://cdn.dribbble.com/userupload/43898638/file/original-1971d8b552b526fed60a6bdba6c8ef59.mp4",
    prompt:
      "Build an interactive analytics dashboard in React with Recharts and Tailwind CSS. Display key summary metric cards (MRR, Active Users, Churn Rate) with percentage change chips, a smooth multi-series revenue growth line chart, recent activity data table with sortable columns, and filter controls for 7D, 30D, and 90D intervals.",
  },

  // --- 3. Dev Portfolio (Existing) ---
  {
    id: "dev-portfolio",
    title: "Dev Portfolio",
    author: "HTML + CSS + JS",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Pixelcraft Design",
    sourceUrl: "https://dribbble.com/tags/portfolio",
    price: "Free",
    isPremium: false,
    category: "Portfolio",
    stack: "HTML + CSS + JS",
    description:
      "Minimalist developer portfolio with interactive project showcases, experience timeline, skills matrix, and instant contact drawer trigger.",
    tags: ["Portfolio", "Developer", "Minimal", "HTML + CSS + JS"],
    views: 8100,
    downloads: 430,
    likes: 720,
    createdAt: "Apr 10, 2026",
    previewImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    previewVideo:
      "https://cdn.dribbble.com/userupload/46369825/file/66de4eff2518c6308a5eda684251822a.mp4",
    prompt:
      "Design a minimalist, high-contrast developer portfolio layout using clean HTML, modern CSS, and vanilla JS. Include an introduction with status badge ('Available for work'), a responsive 2-column project showcase with live preview links and tech tags, an experience timeline with company logos, and a quick keyboard shortcut dialog.",
  },

  // --- 4. E-commerce Store (Existing) ---
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Craftwork UI",
    sourceUrl: "https://dribbble.com/search/ecommerce-app-dashboard",
    price: "$9",
    isPremium: true,
    category: "E-commerce",
    stack: "React + Tailwind",
    description:
      "Curated luxury e-commerce storefront with product grid, slide-over cart drawer, facet category filters, and polished product detail dialogs.",
    tags: ["E-commerce", "Store", "Shop", "Tailwind", "Cart"],
    views: 16400,
    downloads: 920,
    likes: 1540,
    createdAt: "Apr 08, 2026",
    previewImage: "https://images.unsplash.com/photo-1561069934-eee225952461?w=600&q=80",
    previewVideo:
      "https://cdn.dribbble.com/userupload/44548846/file/7f470e7f133054a02d49f79348e2bd3c.mp4",
    prompt:
      "Create an elegant e-commerce storefront in React + Tailwind CSS with high-end product cards, color swatch selector, hover image preview, interactive slide-over cart drawer with subtotal calculator, free shipping progress bar, and category filter tabs.",
  },

  // --- 5. Startup Waitlist (Existing) ---
  {
    id: "startup-waitlist",
    title: "Startup Waitlist",
    author: "HTML + CSS + JS",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Vercel Labs Inspired",
    sourceUrl: "https://dribbble.com/tags/saas",
    price: "Free",
    isPremium: false,
    category: "Landing Page",
    stack: "HTML + CSS + JS",
    description:
      "Ultra-clean startup pre-launch waitlist page with email capture, live position counter, social proof avatar stack, and feature pills.",
    tags: ["Waitlist", "Startup", "LeadGen", "HTML + CSS + JS"],
    views: 7300,
    downloads: 340,
    likes: 610,
    createdAt: "Apr 05, 2026",
    previewImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    previewVideo:
      "https://cdn.dribbble.com/userupload/45349094/file/79ec4bf629f27cf86e1cb630a6334643.mp4",
    prompt:
      "Build a high-conversion viral startup waitlist page. Include an email input that displays an instant queue position counter (e.g., #412 on the waitlist), referral link share buttons with one-click copy, and an avatar stack showing recent joiners with subtle live pulse indicators.",
  },

  // --- 6. AI Chatbot UI (Existing) ---
  {
    id: "ai-chatbot-ui",
    title: "AI Chatbot UI",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Outcrowd Studio",
    sourceUrl: "https://dribbble.com/search/ai-website",
    price: "$9",
    isPremium: true,
    category: "AI",
    stack: "React + Tailwind",
    description:
      "Streaming conversational message bubbles, prompt starter chips, model selector dropdown, code syntax highlighting, and auto-expanding input.",
    tags: ["AI", "Chatbot", "LLM", "React", "Tailwind"],
    views: 22100,
    downloads: 1450,
    likes: 2180,
    createdAt: "Apr 02, 2026",
    previewImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    previewVideo:
      "https://cdn.dribbble.com/userupload/48015410/file/246fee6ef2dac18d5e530eb185aad155.mp4",
    prompt:
      "Build a modern AI chat workspace in React + Tailwind. Feature a model switcher pill (GPT-4o, Claude 3.5, Gemini 1.5 Pro), suggested prompt starter chips, markdown and code block rendering with a copy code button, and a clean pinned input bar with attachments icon and stop generation button.",
  },

  // --- 7. SaaS Pricing Page (Existing) ---
  {
    id: "saas-pricing-page",
    title: "SaaS Pricing Page",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Bento Systems",
    sourceUrl: "https://dribbble.com/tags/saas",
    price: "$9",
    isPremium: true,
    category: "SaaS",
    stack: "React + Tailwind",
    description:
      "Tier comparison cards, monthly/annual billing toggle switch with 20% discount badge, feature checklist matrix, and interactive FAQ accordion.",
    tags: ["Pricing", "SaaS", "Billing", "React + Tailwind"],
    views: 11500,
    downloads: 670,
    likes: 980,
    createdAt: "Mar 29, 2026",
    previewImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    previewVideo:
      "https://cdn.dribbble.com/userupload/45892543/file/large-27856ee44638596ba1ef72007d2bb179.mp4",
    prompt:
      "Create a transparent 3-tier SaaS pricing comparison page with monthly and annual toggle (20% off discount badge), highlighted 'Most Popular' card with subtle border glow, comprehensive checklist of features with tooltips, and an accordion FAQ section at the bottom.",
  },

  // --- 8. Mobile App Landing (Existing) ---
  {
    id: "mobile-app-landing",
    title: "Mobile App Landing",
    author: "HTML + CSS + JS",
    authorAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Morph UI Studio",
    sourceUrl: "https://dribbble.com/search/mobile-app-ui",
    price: "Free",
    isPremium: false,
    category: "Mobile",
    stack: "HTML + CSS + JS",
    description:
      "App Store & Google Play badges, realistic 3D mobile mockup slider, feature deep-dives, and verified user ratings carousel.",
    tags: ["Mobile", "App", "Landing Page", "iOS", "Android"],
    views: 6400,
    downloads: 290,
    likes: 540,
    createdAt: "Mar 25, 2026",
    previewImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    previewVideo:
      "https://cdn.dribbble.com/userupload/12370236/file/original-3fd1770fb116f9649858a7c3bb40e40d.mp4",
    prompt:
      "Develop a modern mobile app landing page showcasing iOS and Android download badges, an interactive smartphone device mockup showing app UI screens, customer testimonial star ratings, and key benefit highlight cards.",
  },

  // --- 9. Admin Panel (Existing) ---
  {
    id: "admin-panel",
    title: "Admin Panel",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Enterprise UI Lab",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "$9",
    isPremium: true,
    category: "Admin",
    stack: "React + Tailwind",
    description:
      "Full-featured responsive administration panel with sortable data tables, bulk selection actions, user role permissions, and activity timeline.",
    tags: ["Admin", "Dashboard", "Table", "Management", "React + Tailwind"],
    views: 18700,
    downloads: 1100,
    likes: 1690,
    createdAt: "Mar 20, 2026",
    previewImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    previewVideo:
      "https://cdn.dribbble.com/userupload/48106679/file/large-0388e25a4bed901f580f834ac3e7d0f7.mp4",
    prompt:
      "Design a production-ready web admin panel in React and Tailwind CSS. Include a collapsible left sidebar, header breadcrumbs with notification bell, full data table with multi-select checkboxes, search and status filter chips, pagination, and a slide-over sheet for editing user permissions.",
  },

  // ==========================================
  // --- NEW TEMPLATES (EXPANDED TO 33 TOTAL) ---
  // ==========================================

  // --- 10. Fintech Dashboard ---
  {
    id: "voltpay-fintech-dashboard",
    title: "VoltPay Global Treasury",
    author: "Aura Finance Studio",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Dribbble Fintech Collective",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "$19",
    isPremium: true,
    category: "Fintech",
    stack: "React + Tailwind",
    description:
      "Corporate treasury dashboard featuring multi-currency balances, cross-border FX spot conversion rates, and live liquidity flow diagrams.",
    tags: ["Fintech", "Treasury", "Banking", "React + Tailwind", "Dashboard"],
    views: 13400,
    downloads: 710,
    likes: 1120,
    createdAt: "Apr 18, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build a high-end corporate treasury fintech dashboard in React and Tailwind CSS. Feature a dark theme with neon emerald accents, multi-currency wallet cards (USD, EUR, GBP, JPY), interactive FX conversion graph with time sliders, recent corporate wire table with status pills (Settled, Pending, Flagged), and two-step transfer modal.",
  },

  // --- 11. B2B CRM Dashboard ---
  {
    id: "pipeline-velocity-crm",
    title: "Pipeline Velocity CRM",
    author: "HyperGrowth Lab",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "UI8 Product Team",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "Free",
    isPremium: false,
    category: "Dashboard",
    stack: "React",
    description:
      "Kanban deal-flow CRM dashboard tracking sales cycle velocities, lead scoring probabilities, and account executive quota progress.",
    tags: ["CRM", "Dashboard", "Sales", "B2B", "Kanban"],
    views: 8900,
    downloads: 460,
    likes: 780,
    createdAt: "Apr 17, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Create a modern B2B SaaS CRM pipeline dashboard in React. Implement a draggable deal stage kanban board (Lead, Discovery, Demo, Negotiation, Closed-Won), top summary metrics for Weighted Pipeline and Win Rate, deal card tags with company logos and deal size, and a quick-add deal modal.",
  },

  // --- 12. AI Creative Studio Workspace ---
  {
    id: "neurocanvas-ai-studio",
    title: "NeuroCanvas Generative Studio",
    author: "Synthetix Labs",
    authorAvatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Dribbble AI Showcase",
    sourceUrl: "https://dribbble.com/search/ai-website",
    price: "$24",
    isPremium: true,
    category: "AI",
    stack: "Next.js",
    description:
      "Creative generative studio with visual prompt builder, aspect ratio canvas selector, seed history drawer, and latency inspector.",
    tags: ["AI", "Generative", "Next.js", "Studio", "Creative"],
    views: 18200,
    downloads: 980,
    likes: 1890,
    createdAt: "Apr 16, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Design a sleek generative AI canvas in Next.js and Tailwind CSS with dark glassmorphism. Include prompt input with negative prompt toggle, model parameter sliders (Guidance Scale, Steps, Sampler), aspect ratio selector pills (1:1, 16:9, 9:16), image generation grid with zoom inspection modal, and downloadable seed presets.",
  },

  // --- 13. Healthcare Telehealth Platform ---
  {
    id: "medsync-telehealth-portal",
    title: "MedSync Clinical Portal",
    author: "VitalHealth Systems",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Medical UX Collective",
    sourceUrl: "https://dribbble.com/tags/saas",
    price: "$14",
    isPremium: true,
    category: "Healthcare",
    stack: "React + Tailwind",
    description:
      "HIPAA-compliant telemedicine dashboard with electronic patient records, live vitals telemetry chart, and digital prescription refill drawer.",
    tags: ["Healthcare", "Telehealth", "Medical", "React + Tailwind", "Dashboard"],
    views: 7400,
    downloads: 380,
    likes: 640,
    createdAt: "Apr 15, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build a HIPAA-compliant telehealth patient portal in React and Tailwind CSS. Feature an upcoming appointments schedule timeline, vital sign trend charts (Heart Rate, Blood Pressure, SpO2) with alert thresholds, prescription refill request cards, and secure doctor messaging drawer with encrypted status indicators.",
  },

  // --- 14. Interactive Education Sandbox ---
  {
    id: "codecraft-academy-lms",
    title: "CodeCraft Academy Sandbox",
    author: "EduStack Design",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Dribbble Education UX",
    sourceUrl: "https://dribbble.com/tags/saas-website",
    price: "Free",
    isPremium: false,
    category: "Education",
    stack: "React + Tailwind",
    description:
      "Interactive coding learning platform with split markdown curriculum, live browser execution console, and milestone certificate badges.",
    tags: ["Education", "LMS", "Coding", "Interactive", "React + Tailwind"],
    views: 11200,
    downloads: 620,
    likes: 910,
    createdAt: "Apr 13, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Design an interactive coding course learning platform. Include a sidebar course curriculum tree with checkmarks, split layout with markdown lesson explanation on the left and an interactive browser code sandbox on the right, run code console output, and completion streak badges.",
  },

  // --- 15. Luxury Architectural Real Estate ---
  {
    id: "estatevue-luxury-realestate",
    title: "EstateVue Luxury Residences",
    author: "Verve Living",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Architectural Digest Inspired",
    sourceUrl: "https://dribbble.com/tags/saas-website",
    price: "$19",
    isPremium: true,
    category: "Real Estate",
    stack: "Next.js",
    description:
      "Editorial real estate showcase featuring high-res architectural photography, interactive mortgage amortization slider, and viewing scheduler.",
    tags: ["Real Estate", "Luxury", "Architecture", "Next.js", "Landing Page"],
    views: 12800,
    downloads: 690,
    likes: 1150,
    createdAt: "Apr 11, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Create a luxury architectural real estate listing showcase in Next.js and Tailwind CSS. Implement high-resolution hero gallery with thumbnail filmstrip, property specifications grid (sq ft, bedrooms, year built, energy rating), interactive monthly mortgage amortization calculator, and private viewing booking form.",
  },

  // --- 16. Private Wealth Banking Portal ---
  {
    id: "zenith-private-wealth",
    title: "Zenith Private Wealth Hub",
    author: "Sterling & Co.",
    authorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Swiss Private Bank UX",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "$29",
    isPremium: true,
    category: "Fintech",
    stack: "React + Tailwind",
    description:
      "Private banking wealth management portal with asset allocation breakdown, historical benchmark vs S&P 500, and concierge hotline.",
    tags: ["Fintech", "Banking", "Wealth", "Dashboard", "React + Tailwind"],
    views: 15900,
    downloads: 870,
    likes: 1420,
    createdAt: "Apr 09, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Design an ultra-luxurious private wealth management client portal. Feature an asset allocation donut breakdown (Equities, Fixed Income, Real Estate, Alternatives), historical performance benchmark vs S&P 500, upcoming dividend calendar list, and a one-click dedicated wealth advisor concierge drawer.",
  },

  // --- 17. Boutique Travel Retreats ---
  {
    id: "wanderlust-nomad-retreats",
    title: "Wanderlust Nomad Lodges",
    author: "Terra Travel Lab",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Dribbble Travel & Hospitality",
    sourceUrl: "https://dribbble.com/tags/saas-website",
    price: "Free",
    isPremium: false,
    category: "Landing Page",
    stack: "HTML + CSS + JS",
    description:
      "Warm earthy boutique travel retreat booking page with sticky date filter bar, amenity badges, and verified host credentials.",
    tags: ["Travel", "Hospitality", "Booking", "Landing Page", "HTML + CSS + JS"],
    views: 8600,
    downloads: 410,
    likes: 680,
    createdAt: "Apr 07, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build a boutique travel lodge booking landing page with warm earthy tones, date/guest availability search bar with sticky pill navbar, destination curated cards with high-res photo sliders, guest review score testimonials, and instant reservation sheet.",
  },

  // --- 18. Linear-Style Issue Tracker ---
  {
    id: "linearflow-issue-tracker",
    title: "LinearFlow Issue Tracker",
    author: "Monospace Tools",
    authorAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Keyboard-First UI Systems",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "$14",
    isPremium: true,
    category: "Productivity",
    stack: "React",
    description:
      "Keyboard-first task and issue tracker with cycle velocity indicators, priority status matrices, and command palette navigation.",
    tags: ["Productivity", "Issues", "Linear", "Keyboard-First", "React"],
    views: 17100,
    downloads: 940,
    likes: 1610,
    createdAt: "Apr 06, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Create a high-speed, keyboard-first task and issue tracker in React. Feature a command palette (Cmd+K), issue priority icons (Urgent, High, Medium, Low), sprint cycle velocity progress bar, inline issue title editing, and filter chips for assignees and milestone releases.",
  },

  // --- 19. Streetwear Sneaker Marketplace ---
  {
    id: "kicksvault-streetwear-drop",
    title: "KicksVault Sneaker Drop",
    author: "DropCulture Design",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Dribbble E-commerce Showcase",
    sourceUrl: "https://dribbble.com/search/ecommerce-app-dashboard",
    price: "$19",
    isPremium: true,
    category: "E-commerce",
    stack: "React + Tailwind",
    description:
      "High-energy streetwear sneaker drop storefront with live drop countdown, size availability matrix, and authenticity guarantee badge.",
    tags: ["E-commerce", "Sneakers", "Drops", "Streetwear", "React + Tailwind"],
    views: 19800,
    downloads: 1180,
    likes: 1950,
    createdAt: "Apr 04, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build a high-energy streetwear sneaker drop marketplace in React and Tailwind. Feature a live drop countdown timer, size availability pills with out-of-stock strikethrough, authenticity guarantee badge, slide-over bid/buy checkout drawer, and recent sales transaction ticker.",
  },

  // --- 20. DeFi & Web3 Staking Tracker ---
  {
    id: "ledgerx-crypto-tracker",
    title: "LedgerX DeFi & Staking",
    author: "0xDesign Studio",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Web3 Design Guild",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "Free",
    isPremium: false,
    category: "Fintech",
    stack: "React + Tailwind",
    description:
      "Dark Web3 DeFi dashboard tracking multi-chain wallet balances, liquidity pool APYs, live Ethereum gas fee ticker, and token swap slips.",
    tags: ["Fintech", "Crypto", "DeFi", "Web3", "React + Tailwind"],
    views: 14700,
    downloads: 810,
    likes: 1330,
    createdAt: "Apr 03, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Develop a dark Web3 DeFi dashboard in React + Tailwind. Include multi-chain wallet connector pill, APY yield farming pool comparison table with liquidity badges, portfolio net worth sparkline chart, live Ethereum gas fee tracker, and token swap card with slippage tolerance settings.",
  },

  // --- 21. Spatial Creative Director Portfolio ---
  {
    id: "studio-mono-creative-portfolio",
    title: "Studio Mono Spatial Index",
    author: "Mono Collective",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Awwwards & Dribbble Pick",
    sourceUrl: "https://dribbble.com/tags/portfolio",
    price: "Free",
    isPremium: false,
    category: "Portfolio",
    stack: "Next.js",
    description:
      "Editorial typography-led creative portfolio featuring filmstrip project reels, interactive client awards index, and full-screen inquiry form.",
    tags: ["Portfolio", "Creative", "Editorial", "Typography", "Next.js"],
    views: 9500,
    downloads: 530,
    likes: 870,
    createdAt: "Apr 01, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Design an editorial, typography-forward creative director portfolio in Next.js. Feature oversized serif headers, project case study grid with hover video reel previews, client awards index table, awards ticker, and a full-screen minimalist contact drawer.",
  },

  // --- 22. Enterprise Cloud SaaS Platform ---
  {
    id: "hyperscale-cloud-platform",
    title: "HyperScale Cloud Platform",
    author: "InfraPulse",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Enterprise SaaS Design",
    sourceUrl: "https://dribbble.com/tags/saas-website",
    price: "$19",
    isPremium: true,
    category: "SaaS",
    stack: "React + Tailwind",
    description:
      "Enterprise infrastructure landing page featuring interactive terminal CLI demo, SOC2 compliance badges, and automated scaling calculator.",
    tags: ["SaaS", "Cloud", "Enterprise", "Infrastructure", "React + Tailwind"],
    views: 16100,
    downloads: 910,
    likes: 1470,
    createdAt: "Mar 30, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Create an enterprise cloud infrastructure SaaS landing page in React and Tailwind. Include sticky top navbar with enterprise dropdown, interactive interactive CLI terminal component with copy button, SOC2 and HIPAA compliance badges, customer logo wall, and 3-tier pricing calculator with sliders.",
  },

  // --- 23. Mobile Mindfulness & Sleep App ---
  {
    id: "calmpulse-wellness-mobile",
    title: "CalmPulse HRV & Wellness",
    author: "Serene Studio",
    authorAvatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Dribbble Mobile App UI",
    sourceUrl: "https://dribbble.com/search/mobile-app-ui",
    price: "Free",
    isPremium: false,
    category: "Mobile",
    stack: "React + Tailwind",
    description:
      "Calming mobile web app mockup featuring sleep quality radial recovery gauge, ambient audio soundscape mixer, and biometric HRV trends.",
    tags: ["Mobile", "Wellness", "Sleep", "Health", "React + Tailwind"],
    views: 7900,
    downloads: 390,
    likes: 670,
    createdAt: "Mar 28, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build a calming mobile wellness & mindfulness web app in React. Feature a sleep quality score circular progress gauge, ambient soundscape audio player with volume slider, daily mood check-in slider, and weekly HRV recovery trend line graph.",
  },

  // --- 24. Enterprise Access Control & RBAC ---
  {
    id: "sentinel-rbac-panel",
    title: "Sentinel Access & RBAC",
    author: "CyberCore Systems",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Security UX Studio",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "$24",
    isPremium: true,
    category: "Admin",
    stack: "React + Tailwind",
    description:
      "Security access governance matrix with role permission toggles, real-time geolocation audit trails, and API token secret manager.",
    tags: ["Admin", "Security", "RBAC", "Governance", "React + Tailwind"],
    views: 12100,
    downloads: 670,
    likes: 1040,
    createdAt: "Mar 26, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Design a corporate security and RBAC admin panel in React and Tailwind. Feature user role permission matrix (SuperAdmin, Editor, Auditor, Viewer) with toggle checkboxes, live security event audit log with IP geo badges, two-factor authentication enforcement banner, and API key generation modal.",
  },

  // --- 25. Private Jet Route Charter ---
  {
    id: "aeropass-aviation-portal",
    title: "AeroPass Private Aviation",
    author: "Apex Aviation",
    authorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Luxury Hospitality Guild",
    sourceUrl: "https://dribbble.com/tags/saas-website",
    price: "$29",
    isPremium: true,
    category: "Landing Page",
    stack: "Next.js",
    description:
      "Bespoke private aviation portal with empty-leg flight search, interactive cabin interior inspection, and safety rating credentials.",
    tags: ["Travel", "Aviation", "Luxury", "Charter", "Next.js"],
    views: 10900,
    downloads: 590,
    likes: 920,
    createdAt: "Mar 24, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Create an ultra-luxury private jet booking experience in Next.js. Include an empty leg route search widget (Origin, Destination, Passengers, Aircraft Class), interactive cabin interior 360-degree photo carousel, safety rating credentials, and bespoke charter quote inquiry modal.",
  },

  // --- 26. Language Immersion Platform ---
  {
    id: "polyglot-language-immersion",
    title: "Polyglot Language Immersion",
    author: "LinguaLab",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "EdTech Interface Lab",
    sourceUrl: "https://dribbble.com/tags/saas",
    price: "Free",
    isPremium: false,
    category: "Education",
    stack: "React + Tailwind",
    description:
      "AI-guided language immersion hub with CEFR level milestones, interactive flip flashcards, and microphone waveform pronunciation scoring.",
    tags: ["Education", "Language", "AI", "Learning", "React + Tailwind"],
    views: 8900,
    downloads: 480,
    likes: 750,
    createdAt: "Mar 22, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build an AI language learning interface in React and Tailwind. Feature CEFR level progress roadmap (A1 to C2), interactive spaced repetition vocabulary flashcards with flip animation, real-time audio waveform mic recorder for pronunciation feedback, and daily practice streak counter.",
  },

  // --- 27. Longevity Biomarker Dashboard ---
  {
    id: "vitalis-longevity-biomarkers",
    title: "Vitalis Longevity Biomarkers",
    author: "BioAge Labs",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "HealthTech UI Collective",
    sourceUrl: "https://dribbble.com/search/dashboard-ui",
    price: "$19",
    isPremium: true,
    category: "Healthcare",
    stack: "Next.js",
    description:
      "Preventive medicine portal comparing chronological vs biological age, lab blood panels, and personalized biomarker supplement protocols.",
    tags: ["Healthcare", "Longevity", "Biomarkers", "Next.js", "Dashboard"],
    views: 11400,
    downloads: 610,
    likes: 980,
    createdAt: "Mar 19, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Design a preventive longevity medicine dashboard in Next.js. Feature a biological vs chronological age comparison gauge, biomarker lab blood panel table with optimal vs reference ranges (ApoB, HbA1c, hs-CRP, VO2 Max), personalized supplement protocol tracker, and consultation booking form.",
  },

  // --- 28. Distraction-Free Prose Editor ---
  {
    id: "focusdraft-prose-editor",
    title: "FocusDraft Zen Editor",
    author: "CleanType Design",
    authorAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Minimalist Tools Group",
    sourceUrl: "https://dribbble.com/tags/portfolio",
    price: "Free",
    isPremium: false,
    category: "Productivity",
    stack: "HTML + CSS + JS",
    description:
      "Distraction-free markdown writing studio with paragraph focus illumination, live sprint word counter, and multi-format exporter.",
    tags: ["Productivity", "Writing", "Markdown", "Minimalist", "HTML + CSS + JS"],
    views: 7800,
    downloads: 420,
    likes: 690,
    createdAt: "Mar 17, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Develop a distraction-free writing app in clean HTML, CSS, and vanilla JS. Feature a zen mode that dims inactive paragraphs, live word and character count target indicator, markdown syntax preview toggle, and quick export dropdown (Markdown, PDF, HTML, Copy Plaintext).",
  },

  // --- 29. Usage-Based Pricing Calculator ---
  {
    id: "tiermatrix-usage-pricing",
    title: "TierMatrix Usage Calculator",
    author: "RevOps Kit",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "SaaS Billing Patterns",
    sourceUrl: "https://dribbble.com/tags/saas",
    price: "$9",
    isPremium: true,
    category: "SaaS",
    stack: "React + Tailwind",
    description:
      "Dynamic consumption pricing modeler with real-time sliders for MAUs and API operations, sticky comparison matrix, and currency selector.",
    tags: ["Pricing", "SaaS", "Calculator", "Billing", "React + Tailwind"],
    views: 13900,
    downloads: 780,
    likes: 1220,
    createdAt: "Mar 15, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build a consumption and usage-based SaaS pricing calculator in React + Tailwind. Include an interactive slider for monthly active users (MAU) and API calls that calculates estimated pricing dynamically, feature matrix comparison table with sticky headers, and currency switcher (USD, EUR, GBP).",
  },

  // --- 30. Brutalist Seed Incubator ---
  {
    id: "foundryos-seed-incubator",
    title: "FoundryOS Hardware Incubator",
    author: "Foundry Capital",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Brutalist Web Directory",
    sourceUrl: "https://dribbble.com/tags/saas-website",
    price: "Free",
    isPremium: false,
    category: "Landing Page",
    stack: "Next.js",
    description:
      "Brutalist hardware seed incubator landing page featuring prototype blueprint cards, cohort deadline countdown, and angel investor index.",
    tags: ["Startup", "Incubator", "Hardware", "Brutalist", "Next.js"],
    views: 8400,
    downloads: 450,
    likes: 710,
    createdAt: "Mar 12, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Create a brutalist, industrial-minimalist hardware incubator landing page in Next.js. Feature upcoming batch application deadline banner, cohort portfolio grid with hardware prototype schematics, partner angel investor list, and multi-step founder application modal.",
  },

  // --- 31. Commercial Office Workspace Finder ---
  {
    id: "metrolease-commercial-spaces",
    title: "MetroLease Commercial Hub",
    author: "SpaceCraft Properties",
    authorAvatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Commercial Real Estate UX",
    sourceUrl: "https://dribbble.com/tags/saas",
    price: "$14",
    isPremium: true,
    category: "Real Estate",
    stack: "React + Tailwind",
    description:
      "Commercial office workspace directory with desk capacity filters, interactive floor plan blueprints, and automated lease estimate calculators.",
    tags: ["Real Estate", "Office", "Commercial", "Workspace", "React + Tailwind"],
    views: 10400,
    downloads: 560,
    likes: 880,
    createdAt: "Mar 10, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Design a commercial real estate platform in React. Include a split map and listing view, filter drawer for office capacity (10-500 desks), lease terms, interactive architectural floor plan viewer with downloadable blueprints, and lease quote calculator.",
  },

  // --- 32. Monospace Staff Engineer Index ---
  {
    id: "kaito-staff-engineer-index",
    title: "Kaito Staff Engineer Index",
    author: "Kaito Takahashi",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Systems Engineering Portfolios",
    sourceUrl: "https://dribbble.com/tags/portfolio",
    price: "Free",
    isPremium: false,
    category: "Portfolio",
    stack: "HTML + CSS + JS",
    description:
      "High-density monospace engineering index with architectural RFCs, open-source repositories with star badges, and conference speaking timeline.",
    tags: ["Portfolio", "Engineer", "Monospace", "Systems", "HTML + CSS + JS"],
    views: 9200,
    downloads: 510,
    likes: 830,
    createdAt: "Mar 08, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build a high-density, terminal-inspired staff engineer index in HTML + CSS + JS. Include a monospace font theme, pinned GitHub open-source repositories with star badges, architectural RFCs library with reading time tags, conference speaking timeline, and GPG key copy modal.",
  },

  // --- 33. Realtime Audio AI Assistant ---
  {
    id: "voiceflow-audio-assistant",
    title: "VoiceFlow Realtime Audio AI",
    author: "Acoustic AI Studio",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    authorAttribution: "Next-Gen Audio UI Showcase",
    sourceUrl: "https://dribbble.com/search/ai-website",
    price: "$24",
    isPremium: true,
    category: "AI",
    stack: "React + Tailwind",
    description:
      "Audio-first conversational intelligence workspace featuring multi-frequency waveform visualizer orb, speaker diarization, and voice persona toggles.",
    tags: ["AI", "Audio", "Voice", "Assistant", "React + Tailwind"],
    views: 18900,
    downloads: 1040,
    likes: 1910,
    createdAt: "Mar 05, 2026",
    previewImage:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&auto=format&fit=crop&q=80",
    prompt:
      "Build an audio-first conversational AI interface in React and Tailwind CSS. Feature an animated multi-frequency audio visualizer orb, real-time live transcription speech bubble with speaker diarization, voice persona switcher (Natural, British, Energetic, Formal), and latency meter.",
  },
];

export const CATEGORIES = [
  "All Categories",
  "SaaS",
  "Dashboard",
  "Landing Page",
  "E-commerce",
  "AI",
  "Mobile",
  "Portfolio",
  "Fintech",
  "Analytics",
  "Admin",
  "Developer Tools",
  "Healthcare",
  "Education",
  "Real Estate",
  "Productivity",
] as const;

export const STACKS = [
  "All Stacks",
  "React",
  "Next.js",
  "HTML + CSS + JS",
  "Vue",
  "Tailwind",
  "React + Tailwind",
  "Other",
] as const;

export const TEMPLATE_TYPES = ["All Templates", "Free", "Premium"] as const;
