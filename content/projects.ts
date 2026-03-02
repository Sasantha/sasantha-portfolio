export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  featured?: boolean;
  highlights: string[];
};

export const projects: Project[] = [
  {
  slug: "mark-shell-corporate-website",
  title: "Mark-Shell Pvt Ltd Corporate Website",
  summary:
    "High-performance corporate website and digital product catalog built for a premium B2B sustainable cutlery supplier.",
  description:
    "Designed and developed a green-themed corporate website for Mark-Shell Pvt Ltd to establish a centralized digital presence for their Ecomark sustainable wooden cutlery brand. The platform showcases a structured B2B product catalog, integrates direct-to-WhatsApp quote requests, and provides a fast, scannable experience tailored for procurement officers and corporate buyers.",
  stack: [
    "Next.js",
    "React",
    "Express",
    "MongoDB",
    "WhatsApp API",
    "Vercel"
  ],
  tags: ["Corporate Website", "B2B", "Product Catalog", "Lead Generation"],
  liveUrl: "https://markshell.lk",
  repoUrl: "https://github.com/Sasantha/Mark-Shell",
  featured: true,
  highlights: [
    "Architected a scalable product catalog structure supporting size variations (7mm–16mm) for wooden cutlery.",
    "Implemented direct WhatsApp API integration with pre-filled inquiry context for frictionless B2B lead capture.",
    "Optimized performance using image compression and responsive design for mobile and desktop procurement users.",
    "Structured navigation flow: Category → Product Detail → Quote Request.",
    "Delivered complete project lifecycle from discovery and UI strategy to deployment and handoff."
  ],
},
  {
    slug: "fintrack-dashboard",
    title: "FinTrack Dashboard",
    summary:
      "A financial analytics dashboard with multi-tenant reporting and role-based access control.",
    description:
      "FinTrack helps operations teams monitor revenue, expense trends, and business unit KPIs in one place. The platform includes secure multi-tenant architecture, custom report builders, and export workflows.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    tags: ["SaaS", "Analytics", "RBAC"],
    liveUrl: "https://fintrack-demo.vercel.app",
    repoUrl: "https://github.com/Sasantha",
    featured: true,
    highlights: [
      "Designed a tenant-safe data access pattern for reporting endpoints.",
      "Implemented dynamic chart rendering with memoized dataset transforms.",
      "Reduced dashboard load time by introducing server-side caching strategies.",
    ],
  },
  {
    slug: "ebenezer-double-edged-solutions-pvt-ltd",
    title: "Ebenezer Double Edged Solutions Pvt Ltd",
    summary:
      "Simple Static Website built with HTML, CSS, and JavaScript to showcase the services and portfolio of Ebenezer Double Edged Solutions Pvt Ltd.",
    description:
      "Developed the full company website from scratch, creating a responsive and user friendly design while implementing all backend functionality.",
    stack: ["HTML", "CSS", "JavaScript", "PHP"],
    tags: ["Healthcare", "Business Consultancy", "Modern Design"],
    liveUrl: "https://www.consultebenezer.lk/",
    repoUrl: "https://github.com/Sasantha",
    featured: true,
    highlights: [
      "Simple Website built with HTML, CSS, and JavaScript to showcase the services and portfolio of Ebenezer Double Edged Solutions Pvt Ltd as requested by the owner.",
    ],
  },
  {
    slug: "hireflow-platform",
    title: "HireFlow Platform",
    summary:
      "Recruitment workflow system for posting jobs, reviewing candidates, and coordinating interviews.",
    description:
      "HireFlow enables hiring teams to handle candidate pipelines with clear stage ownership and timeline visibility. It supports candidate feedback loops and interview scorecards.",
    stack: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Docker"],
    tags: ["HRTech", "Workflows", "B2B"],
    liveUrl: "https://hireflow-demo.vercel.app",
    repoUrl: "https://github.com/Sasantha",
    featured: false,
    highlights: [
      "Implemented stage-based candidate transitions with audit history.",
      "Created reusable forms for job posting and scorecard evaluation.",
      "Containerized app services for consistent staging deployments.",
    ],
  },
  {
    slug: "localmart-commerce",
    title: "LocalMart Commerce",
    summary:
      "Headless commerce storefront with fast category discovery and streamlined checkout.",
    description:
      "LocalMart offers a modern shopping experience with product filtering, cart persistence, and secure payments. It was optimized for mobile-first browsing and regional delivery flows.",
    stack: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Supabase"],
    tags: ["E-commerce", "Payments", "Performance"],
    liveUrl: "https://localmart-demo.vercel.app",
    repoUrl: "https://github.com/Sasantha",
    featured: false,
    highlights: [
      "Implemented responsive category filtering with URL-synced state.",
      "Added resilient checkout flows with payment intent recovery.",
      "Optimized product page rendering for better Core Web Vitals.",
    ],
  },
   {
    slug: "laboura-marketplace",
    title: "Laboura Marketplace",
    summary:
      "Subscription-based labor marketplace platform connecting customers with skilled workers.",
    description:
      "Laboura is a service marketplace concept designed to help customers find and hire verified workers for tasks like house painting, renovation, carpentry, and related services. The system focuses on structured service listings, customer requests, and scalable onboarding for service providers.",
    stack: ["C#", ".NET", "MVC", "SQL Server"],
    tags: ["Marketplace", "Services", "B2B/B2C"],
    liveUrl: "https://laboaura.page.gd",
    repoUrl: "https://github.com/Sasantha/Laboura_Connect",
    featured: true,
    highlights: [
      "Designed marketplace flows for service listing, request handling, and worker onboarding.",
      "Structured the database to support subscriptions, users, services, and transaction records.",
      "Built with an MVC architecture approach for maintainability and scalability.",
    ],
  },
  {
    slug: "fitzone-gym-system",
    title: "FitZone Gym System",
    summary:
      "Gym management system for handling members, plans, attendance, and basic administration.",
    description:
      "FitZone is a web-based gym management system built to streamline membership operations. It supports managing members, membership plans, and administrative workflows to reduce manual tracking.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
    tags: ["Management System", "Admin Panel", "SMB"],
    liveUrl: "https://fitzone.free.nf",
    repoUrl: "https://github.com/Sasantha/FitZone",
    featured: true,
    highlights: [
      "Implemented member and plan management to replace manual spreadsheets.",
      "Created admin-friendly UI with Bootstrap for fast daily operations.",
      "Designed relational tables for members, plans, payments, and attendance tracking.",
    ],
  },
  {
    slug: "gadget-hub-system",
    title: "Gadget Hub System",
    summary:
      "Full-stack gadget inventory and sales workflow system with a C# API and React UI.",
    description:
      "Gadget Hub is a web application that combines a backend API with a modern frontend interface to manage gadgets, categories, and operational workflows. Built to demonstrate clean separation between backend services and client consumption.",
    stack: ["C#", "ASP.NET Core Web API", "React", "SQL Server", "Entity Framework"],
    tags: ["Full-Stack", "API", "Inventory"],
    liveUrl: "https://fitzone.free.nf",
    repoUrl: "https://github.com/Sasantha",
    featured: true,
    highlights: [
      "Built REST APIs for managing products, categories, and inventory operations.",
      "Developed a React frontend consuming the API with clean component structure.",
      "Used Entity Framework for maintainable database access and modeling.",
    ],
  },
  {
    slug: "vetcare360",
    title: "VetCare360",
    summary:
      "Veterinary clinic management system for appointments, pet records, and admin workflows.",
    description:
      "VetCare360 is an ASP.NET Core MVC application designed for veterinary operations. It structures pet profiles, client details, and appointment scheduling to improve clinic workflow and record keeping.",
    stack: ["C#", "ASP.NET Core MVC", "SQL Server", "Entity Framework Core"],
    tags: ["Healthcare", "Management System", "MVC"],
    liveUrl: "https://fitzone.free.nf",
    repoUrl: "https://github.com/Sasantha",
    featured: false,
    highlights: [
      "Modeled clinic entities such as clients, pets, appointments, and services.",
      "Built MVC-based views for admin-friendly workflows and data entry.",
      "Implemented structured database relationships for consistent record management.",
    ],
  },
  {
    slug: "student-management-system",
    title: "Student Management System",
    summary:
      "Student records management system for handling profiles, courses, and administration.",
    description:
      "A structured student management system focused on maintaining student profiles and academic data in a centralized system. Built to demonstrate clean CRUD workflows and relational database design.",
    stack: ["C#", ".NET", "SQL Server"],
    tags: ["CRUD", "Database Design", "Education"],
    liveUrl: "https://fitzone.free.nf",
    repoUrl: "https://github.com/Sasantha",
    featured: false,
    highlights: [
      "Implemented CRUD flows for student and course records.",
      "Designed relational tables for scalable academic data management.",
      "Focused on validation and consistent data handling patterns.",
    ],
  },
  {
    slug: "pharma-ecommerce",
    title: "Pharma E-commerce",
    summary:
      "E-commerce platform concept for browsing and ordering pharmaceutical products online.",
    description:
      "A pharmacy e-commerce web application built to simulate product discovery and ordering flows. It includes structured product catalog browsing and customer-oriented UI patterns.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    tags: ["E-commerce", "Catalog", "Web App"],
    liveUrl: "https://fitzone.free.nf",
    repoUrl: "https://github.com/Sasantha",
    featured: false,
    highlights: [
      "Developed product catalog browsing and structured product pages.",
      "Designed database tables for products, categories, and customer orders.",
      "Implemented clean UI flows for searching and selecting items.",
    ],
  },
  {
    slug: "luxevista-mobile-app",
    title: "LuxeVista Mobile App",
    summary:
      "Mobile app project showcasing structured UI flows and core app architecture patterns.",
    description:
      "LuxeVista is a mobile application project created to demonstrate mobile UI flows and app structure. It focuses on clean navigation, modular screens, and maintainable code organization.",
    stack: ["Kotlin", "Android Studio", "SQLite"],
    tags: ["Mobile App", "Android", "UI/UX"],
    liveUrl: "https://fitzone.free.nf",
    repoUrl: "https://github.com/Sasantha",
    featured: false,
    highlights: [
      "Built modular screens with structured navigation patterns.",
      "Used SQLite for local storage and simple data persistence.",
      "Focused on clean architecture and maintainable project structure.",
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
