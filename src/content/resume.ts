export type Bullet = {
  text: string;
  metric?: string;
};

export type Role = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  summary?: string;
  bullets: Bullet[];
  stack: string[];
};

export type Project = {
  name: string;
  tagline: string;
  stack: string[];
  url?: string;
};

export const profile = {
  name: "Lucas Moreira e Silva Alves",
  shortName: "Lucas Moreira",
  title: "Software Engineer",
  location: "João Pessoa, Brazil",
  email: "lmsa.moreira@gmail.com",
  phone: "+55 (83) 99106-7863",
  github: "github.com/lucasmsa",
  linkedin: "linkedin.com/in/lucasmsa",
  site: "lucasmsa.com",
  summary:
    "Full-stack engineer with 5+ years across TypeScript, React, Ruby on Rails, Node.js and Python. Works on the parts of a codebase most people avoid: build systems, circular dependency graphs, test coverage on mature Rails apps, and production incidents.",
};

export const roles: Role[] = [
  {
    company: "Koltin",
    title: "Software Engineer, Backend",
    location: "Remote",
    start: "Aug 2025",
    end: "Present",
    summary: "Backend for the sales domain of an eldercare platform.",
    bullets: [
      {
        text: "Owns the sales domain of the backend, running the service and its dependencies on Docker",
      },
    ],
    stack: ["TypeScript", "Docker", "PostgreSQL"],
  },
  {
    company: "Daduca",
    title: "Co-founder & Software Engineer",
    location: "Remote",
    start: "Apr 2025",
    end: "Present",
    summary:
      "Text-centric e-learning platform for data engineering, built end to end.",
    bullets: [
      {
        text: "Built an embedded IDE with sandboxed execution through Judge0, plus LLM-driven validation that grades free-form answers instead of matching strings",
      },
    ],
    stack: ["Next.js", "Vite", "FastAPI", "Judge0", "AWS"],
  },
  {
    company: "TapGoods",
    title: "Software Engineer",
    location: "Dallas, Texas (remote)",
    start: "Jul 2023",
    end: "Jul 2025",
    summary:
      "Rental e-commerce platform at scale. Owned build tooling, front-end architecture and a large share of the Rails test suite.",
    bullets: [
      {
        text: "Replaced Create React App, Webpack and Babel with Vite and SWC, and dropped 80+ stale dependencies",
        metric: "Boot time −80%, production builds −60%",
      },
      {
        text: "Untangled deeply coupled modules and upgraded React Redux, Apollo Client and Axios",
        metric: "1,500+ circular dependencies removed",
      },
      {
        text: "Migrated the front-end to TypeScript, deleting JavaScript as types landed",
        metric: "5,700+ lines deleted, codebase −10%",
      },
      {
        text: "Wrote RSpec coverage across features in a mature Rails codebase",
        metric: "2,000+ tests, ~10% of all test additions",
      },
      {
        text: "Diagnosed and shipped critical production hotfixes using Datadog, Airbrake and the Rails console",
        metric: "Under 1 hour to fix, lowering MTTR",
      },
      {
        text: "Engineered subrental and missing-inventory tracking, server-side rendering for SEO, and accessible auto-contrast theming",
      },
      {
        text: "Acted as the team's front-end reference: mentored engineers, reviewed PRs in depth and unblocked cross-functional work",
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Ruby on Rails",
      "Vite",
      "redux-observable",
      "RSpec",
      "Datadog",
    ],
  },
  {
    company: "Ília",
    title: "Software Engineer",
    location: "Brasília, Brazil",
    start: "Jan 2022",
    end: "May 2023",
    summary:
      "Consultancy work delivering web and mobile products for Mirae, Livelo and Cargonave.",
    bullets: [
      {
        text: "Built screens and features on the Mirae platform in Next.js, backed by Strapi as a headless CMS",
      },
      {
        text: "Shipped features for the Livelo Marketplace mobile app, with Storybook and Atomic Design as the component system",
      },
      {
        text: "Delivered a port and vessel management app with offline-persisted sessions via redux-persist, i18n, and Firebase dynamic links and cloud messaging",
      },
    ],
    stack: [
      "Next.js",
      "React Native",
      "TypeScript",
      "Redux",
      "Strapi",
      "Storybook",
      "Jest",
    ],
  },
  {
    company: "iCods Tech",
    title: "Co-founder & Software Engineer",
    location: "João Pessoa, Brazil",
    start: "Aug 2020",
    end: "Aug 2022",
    summary:
      "Startup of 3 engineers and 1 designer. QR codes carrying edited video as digital gift cards, shipped to the app stores.",
    bullets: [
      {
        text: "Published the React Native app and built the Node.js API behind it, with TypeORM, tsyringe dependency injection and the repository pattern",
      },
      {
        text: "Ran video concatenation on AWS Lambda so mobile clients never did the stitching",
      },
      {
        text: "Built the Next.js business console for printing, batching and monitoring active QR codes",
      },
    ],
    stack: [
      "React Native",
      "Node.js",
      "TypeScript",
      "TypeORM",
      "PostgreSQL",
      "AWS Lambda",
      "Next.js",
    ],
  },
  {
    company: "Digivox",
    title: "Software Engineer Intern",
    location: "João Pessoa, Brazil",
    start: "Jan 2021",
    end: "Jun 2021",
    bullets: [
      {
        text: "Built a ZeroMQ microservice backend with NLP.js for intent extraction and Danfo.js for structured data",
      },
      {
        text: "Automated scheduled website tasks with Puppeteer",
      },
    ],
    stack: ["Node.js", "TypeScript", "ZeroMQ", "NLP.js", "Puppeteer"],
  },
  {
    company: "LAVID",
    title: "Software Engineering Scholar",
    location: "João Pessoa, Brazil",
    start: "Jan 2020",
    end: "Dec 2020",
    bullets: [
      {
        text: "Cleaned and augmented large datasets in Python for deep-learning training on a Portuguese to Libras translator",
      },
      {
        text: "Contributed to Vlibras-Console for model training and testing; results published in SBC Proceedings",
      },
    ],
    stack: ["Python", "Pandas", "React"],
  },
];

export const projects: Project[] = [
  {
    name: "open-portfolio",
    tagline:
      "Elixir MCP server and LiveView dashboard that reads a real brokerage portfolio and answers questions about it",
    stack: ["Elixir", "Phoenix LiveView", "MCP"],
  },
  {
    name: "claude-checkpoint-diagram",
    tagline:
      "Published Claude Code plugin that renders Mermaid checkpoints at agent pauses",
    stack: ["TypeScript", "Mermaid"],
    url: "github.com/lucasmsa/claude-checkpoint-diagram",
  },
  {
    name: "HIIT Maker",
    tagline:
      "Interval training builder from 2021, rebuilt on Vite and React 19 with an offline-installable PWA and a gym mode",
    stack: ["React 19", "Vite", "Zustand", "Playwright"],
  },
  {
    name: "crimp-studio",
    tagline:
      "Climbing wall route setter with draggable 3D holds and undo/redo history",
    stack: ["React", "Three.js", "TypeScript"],
  },
];

export const education = {
  degree: "B.S. Computer Engineering",
  school: "Federal University of Paraíba (UFPB)",
  start: "Aug 2017",
  end: "Jun 2023",
  detail: "GPA 8.29 / 10",
};

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "Ruby", "Python", "Elixir", "SQL"],
  },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Tailwind",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    group: "Backend",
    items: ["Ruby on Rails", "Node.js", "FastAPI", "GraphQL", "REST"],
  },
  {
    group: "Data & Infra",
    items: ["PostgreSQL", "Docker", "AWS", "Vercel", "Datadog"],
  },
  {
    group: "Testing",
    items: ["RSpec", "Vitest", "Jest", "Playwright"],
  },
];

export const languages = [
  { name: "Portuguese", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Limited working" },
  { name: "French", level: "Limited working" },
  { name: "German", level: "Elementary" },
];
