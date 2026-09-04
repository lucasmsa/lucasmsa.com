export type Bullet = {
  text: string;
  metric?: string;
  /** Only the few numbers worth stopping on render bold. */
  highlight?: boolean;
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
  title: "Product Engineer",
  location: "João Pessoa, Brazil",
  email: "lmsa.moreira@gmail.com",
  phone: "+55 (83) 99106-7863",
  github: "github.com/lucasmsa",
  linkedin: "linkedin.com/in/lucasmsa",
  site: "lucasmsa.com",
  summary:
    "Product engineer with 5+ years across TypeScript, React Native, Ruby on Rails and Python. Builds products end to end, from the first commit to the AI features running in production, and takes on the parts of a codebase most people avoid.",
};

export const roles: Role[] = [
  {
    company: "Koltin",
    title: "Product Engineer",
    location: "Mexico City (remote)",
    start: "Aug 2025",
    end: "Present",
    summary:
      "Insurance and preventive care that keeps Mexican seniors independent for longer.",
    bullets: [
      {
        text: "Built the mobile app from scratch and still own it, from the first commit through every release",
        metric: "183 of the app's 240 commits",
        highlight: true,
      },
      {
        text: "Shipped an OpenAI support-ticket classifier that routes by reason in production, scored daily against human experts",
        metric: "Over 90% accuracy",
        highlight: true,
      },
      {
        text: "Took a WhatsApp integration on the Meta Business API from investigation and ADR through production rollout",
        metric: "Account-activation tickets down 63% in 3 weeks",
        highlight: true,
      },
      {
        text: "Built photo medication capture: a member photographs the box, the name, presentation and concentration come back extracted, and a verify step confirms them before the entry wizard resumes",
      },
      {
        text: "Built voice-filled medical records: recording with live level metering fills the health-habits sections, with a confirmation sheet before anything is saved",
      },
      {
        text: "Set the technical foundation: Expo and React Native, Apollo GraphQL with a persisted cache, Zustand, Nativewind, TanStack Form, Sentry, and a Jest and React Native Testing Library suite",
      },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Apollo GraphQL",
      "Zustand",
      "OpenAI",
    ],
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
        metric: "Boot time down 80%, production builds down 60%",
        highlight: true,
      },
      {
        text: "Migrated the front-end to TypeScript and untangled deeply coupled modules, deleting 5,700+ lines of JavaScript and removing 1,500+ circular dependencies",
      },
      {
        text: "Wrote 2,000+ RSpec tests across features in a mature Rails codebase, about 10% of all test additions",
      },
      {
        text: "Shipped critical production hotfixes in under an hour with Datadog and Airbrake, and acted as the team's front-end reference in reviews and architecture",
      },
    ],
    stack: ["React", "TypeScript", "Ruby on Rails", "Vite", "RSpec", "Datadog"],
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
    name: "crimp-studio",
    tagline:
      "Climbing wall route setter: draggable 3D holds, procedurally generated routes and full undo/redo history",
    stack: ["React", "Three.js", "TypeScript"],
    url: "github.com/lucasmsa/crimp-studio",
  },
  {
    name: "coast-to-cup",
    tagline:
      "Which 2026 World Cup group draws the worst logistics, modelling travel, circadian shift, altitude and heat against a base camp",
    stack: ["React Three Fiber", "Python", "Go"],
    url: "github.com/lucasmsa/coast-to-cup",
  },
  {
    name: "claude-checkpoint-diagram",
    tagline:
      "Published Claude Code plugin that draws a Mermaid checkpoint diagram at each pause in an agent run",
    stack: ["Go", "Mermaid"],
    url: "github.com/lucasmsa/claude-checkpoint-diagram",
  },
  {
    name: "vscodethemes-scrapper",
    tagline:
      "Scrapes theme screenshots across seven languages behind bot detection and partitions them into S3, as the collection stage feeding a theme classifier",
    stack: ["TypeScript", "Puppeteer", "AWS S3", "Jest"],
    url: "github.com/lucasmsa/vscodethemes-scrapper",
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
