export interface Template {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
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
  {
    id: "saas-landing-page",
    title: "SaaS Landing Page",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
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
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    author: "React + Recharts",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
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
  {
    id: "dev-portfolio",
    title: "Dev Portfolio",
    author: "HTML + CSS + JS",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
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
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
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
  {
    id: "startup-waitlist",
    title: "Startup Waitlist",
    author: "HTML + CSS + JS",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
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
  {
    id: "ai-chatbot-ui",
    title: "AI Chatbot UI",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
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
  {
    id: "saas-pricing-page",
    title: "SaaS Pricing Page",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
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
  {
    id: "mobile-app-landing",
    title: "Mobile App Landing",
    author: "HTML + CSS + JS",
    authorAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
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
  {
    id: "admin-panel",
    title: "Admin Panel",
    author: "React + Tailwind",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
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
