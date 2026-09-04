# 3. The home page is not the CV

Date: 2026-09-04

## Status

Accepted

## Decision

- The home page carries a short first-person bio: what gets built, and the kind of
  problem worth building. Two or three lines, not a manifesto and not a credential
  list.
- Positioning is efficient solutions to hard problems, plus interfaces that are
  good to use. Both halves are load-bearing; dropping either one leaves a
  description that fits any engineer.
- No metrics on the home page. No dependency counts, no test counts, no build-time
  percentages. Those live on `/resume`, where a reader has asked for them.
- The photo appears small and unprocessed next to the bio.
- The warmth of the previous copy is kept. The length is not.

## Context

The previous home page ran to 239 visible words across values, philosophy,
interests and a skills list broken into six labelled categories. The register was
right and the volume was wrong.

Three hero drafts were rejected before this framing landed. The rejected drafts led
with proof metrics, with a hard-problems thesis, and with role-at-company in the
style of the reference site. All three read as a CV compressed into a hero. The
site is not a job application and is not being written for a search.

`trekhleb.dev` supplied the target density, not the target content. It front-loads
credentials because a 190k-star repository and a well-known employer carry weight
on sight. Copying that structure without those assets produces a page that brags
without evidence.

## Consequences

Any claim on the home page has to survive without a number attached, which means
it has to be specific instead. "Efficient solutions to hard problems" earns its
place only if `/projects` shows problems that were actually hard.

Adjectives with nothing behind them get cut rather than softened.
