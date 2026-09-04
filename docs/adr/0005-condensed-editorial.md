# 5. Condensed editorial as the visual direction

Date: 2026-09-04

## Status

Accepted

## Decision

- Display face is **Anton**, set very large. The name is the masthead, across two
  lines, uppercase.
- Body face is **Work Sans**.
- Ground is `#101012`. Foreground `#F5F2ED`, a warm off-white rather than pure
  white. Muted `#96918A`. Rules `#2A2926`.
- One accent, `#E2593B`, spent on a single clause in the bio and on nothing else
  above the fold.
- The photo prints at real size in the lede, unprocessed, roughly 128 by 158.
- Projects and writing are ruled index rows, not cards. No border, no fill, no
  radius, no shadow. A hairline rule separates entries.

## Context

Four directions were built as full page mockups on the real content and photo, and
judged side by side:

| | Direction | Outcome |
|---|---|---|
| A | Spec sheet: fixed rail, numbered datasheet rows | Reads as an instrument panel, fights the photo |
| B | Condensed editorial | Chosen |
| C | Quiet serif: one column, no accent, no boxes | Best ageing, least presence |
| D | Instrument: panels, measurement grid, mono readouts | Same disconnect as A, heaviest |

The hero's premise from [ADR-0002](0002-hero-rigid-body-letters.md) is that the
name is a physical object that can be thrown. That only lands if the name is set
big enough to read as an object rather than as a heading. B is the direction that
does that, and the only one where the display type is doing the same job the
simulation is.

A and D both look precise and both frame the page as a readout. That conflicts with
the register set in [ADR-0003](0003-copy-register.md), which keeps the warmth of
the previous copy and puts a casual photo next to the bio.

## Consequences

Anton has no lowercase variation to fall back on and no weight axis, so all
typographic hierarchy below the masthead is carried by Work Sans in size and
weight. Anton is used only at display sizes and never for running text.

Cards are unavailable as a grouping device. Sections are separated by rules and
space, which means the project index has to stay scannable by alignment alone as it
grows.

The accent is a single colour used sparingly. Adding a second accent, or spending
this one on more than one element per screen, breaks the direction.
