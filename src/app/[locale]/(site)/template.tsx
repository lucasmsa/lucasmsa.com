import { unstable_ViewTransition as ViewTransition } from "react";

// A template remounts on every navigation, so each page change is an exit and an
// enter here, even between pages that share no heading.
export default function SiteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
