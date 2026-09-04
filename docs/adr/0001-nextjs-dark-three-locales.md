# 1. Next 15 App Router, dark only, three locales

Date: 2026-09-04

## Status

Accepted

## Decision

- The site is the Next 15.5.2 / React 19 repo at `lucasmsa-dev`. The parallel Gatsby
  build of the same landing page stays committed and dormant; it is not developed
  further and not deployed.
- Dark only. No theme toggle, no light palette. `next-themes` stays installed for
  now but nothing renders a switch.
- Three locales: `en`, `pt-BR`, `es`, through the `next-intl` setup already wired
  up. Every string ships in all three.
- Routes: `/` (home), `/projects`, `/writing`, `/resume`.
- `/resume` keeps its own visual world: white paper sheet, serif headings, print
  stylesheet targeting letter paper. It does not adopt the site palette or type.

## Context

The hero is a full-bleed simulation on a dark ground. A canvas tuned to glow on
near-black washes out on white, so supporting both themes means tuning and testing
two simulations rather than one. Committing to dark removes that cost.

`/publications` was considered and rejected: there is one paper, the SBC Proceedings
entry on the Portuguese to Libras translator corpus, plus two talks given for
Information Systems at UFPB Rio Tinto. A route holding one academic row reads as
sparse. `/writing` holds the paper, the talks, and any later posts, with the paper
as the anchor entry rather than the only one.

No blog. The route structure leaves room for one so adding posts later does not
force a redesign, but nothing empty ships.

The resume is a document, not a page. Its break from the site's look is deliberate,
and restyling it to match would either lose the two-page print fidelity or require
maintaining a second stylesheet for print.

## Consequences

Every copy edit is three edits. Locale files are the single source for strings, so
no copy is inlined in components.

A single-theme design means the canvas, the type contrast and the photo treatment
get tuned once, against one ground.
