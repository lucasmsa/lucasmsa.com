/// <reference types="react/canary" />

// Next's experimental React build ships the component under its unstable name,
// while @types/react only types the stable one.
declare module "react" {
  export const unstable_ViewTransition: typeof ViewTransition;
}

export {};
