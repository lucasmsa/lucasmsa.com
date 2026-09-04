# 2. The hero is the name as rigid bodies

Date: 2026-09-04

## Status

Accepted

## Decision

- The home page hero is a full-bleed canvas running a rigid-body simulation of the
  letters of the name. Letters drop in, collide, stack and settle against the
  viewport floor and walls.
- The visitor can grab a letter and throw it. Double-click resets the drop.
- Physics runs on `matter.js`. Letters are chamfered rectangle bodies; the glyph is
  drawn on each body in the render pass so type and body stay in sync under
  rotation.
- The canvas fades out as the page scrolls past the hero. Content below it is
  static.
- `prefers-reduced-motion` disables the loop and renders a single settled frame.
  The first paint is never blank: the settled state is drawn before the loop starts.

## Context

Four candidates were built as live, grabbable panels under identical hero copy and
judged running rather than described:

| | Candidate | Why it lost |
|---|---|---|
| A | Verlet soft bodies with pressure | Tactile, but unconnected to anything about the subject |
| B | Rigid-body letters | Chosen |
| C | Advected dye on a velocity grid | Strongest craft answer, but decorative relative to the content |
| D | N-body gravity with fling-to-orbit | Calmest to read text over, same disconnect as A |

B is the only candidate where the flare and the content are the same object. The
others animate next to the name; B animates the name. That ties the visual to the
page instead of decorating it, which is the difference between a simulation that
says something and one that merely moves.

C remains the better demonstration of solving a hard problem efficiently, and is
the fallback if B reads as a gimmick once live.

## Consequences

The name is unreadable while the letters are in motion and after they are thrown,
so the name must also appear as real text for screen readers and for anyone who
scrolls past mid-simulation.

`matter.js` is a runtime dependency on the home page only. It is not pulled into
the other routes.
