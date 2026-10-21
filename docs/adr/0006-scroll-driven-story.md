# 0006. Scroll-Driven Story

## Status

Accepted

## Context

The portfolio was already a single page with Lenis smooth scrolling, but scroll drove very little of it: almost every section faded in once with `whileInView`, and the case-study runway switched beats with an `IntersectionObserver`. Only the top progress bar, the Hero card parallax and the experience timeline line followed the scroll position.

The user asked for the page to read as one continuous, scroll-driven story, under the constraint from `PRODUCT.md` that a recruiter scanning for 60–90 seconds still reaches contacts and the résumé immediately. Before the change, the page measured 14.6 viewports on a 1440×900 desktop (Selected Work alone was 7.16, or 49%) and 18.9 on a 375×812 phone.

Alternatives considered:

1. **A device that travels through every chapter**: the strongest continuity, but it means merging three case studies with separate state into one stage, and it is hard to do on phones.
2. **Scroll-snap / full-page chapters**: takes the scroll away from the reader, fights Lenis, frustrates fast scanning, and several bilingual chapters are taller than one screen.
3. **GSAP ScrollTrigger**: convenient pinning and timelines, but a second animation system next to Motion, extra bundle weight, and Lenis glue code.
4. **Atmosphere and bridge lines, Motion only (chosen)**: continuity from lighting and copy, with scrub and pinning only where the story needs them.

## Decision

1. **Scope**: Evolve this portfolio. Scrub (scroll-linked progress) and pinning are used in the key chapters; the other chapters keep a plain reveal.
2. **Story state** (`StoryScrollProvider`): one provider works out the chapter under a reading line at 40% of the viewport and a continuous story position (2.5 means halfway through the third chapter). Chapter ids and labels live in `src/data/chapters.ts`.
3. **Atmosphere** (`Atmosphere.tsx`): two fixed glows (Primary Blue, Electric Cyan) and a lift layer toward the `surface` tone. Each chapter has its own light position, intensity and lift, blended across chapter boundaries. Only transform and opacity animate, and the palette stays within the 80 / 15 / 5 rule.
4. **Chapter bridges** (`ChapterBridge.tsx`): every chapter after the intro opens with a lead line that picks up from the chapter before it. It replaces the old lead paragraph and keeps its facts, so the desktop page does not grow. Words light up with the scroll; Thai is split with `Intl.Segmenter`, and the line is fully lit by the time a chapter jump lands.
5. **Hero → Approach hand-off**: the display headline lifts and dims as the Hero leaves. The name row, contacts and CTAs never fade. The Approach opening rises with the scroll.
6. **Selected Work runway** (`useBeatScrub`): the desktop device stays pinned over the same scroll distance as before. The HUD rail, beat opacity and a slight device drift are continuous. The screen changes at beat boundaries, and only after the reading line clears a boundary by 32px, in either direction.
7. **Events**: each beat change emits exactly one `BLoCStreamEvent`, scrolling down or up. A tap on the device holds until the scroll crosses into another beat.
8. **Jump nav instead of a filter**: the origin filter changed the page length under the pinned runways, so it became links to each case study (`#case-<id>`). The Hero proof list links there too.
9. **Small screens (< lg)**: scrub without pinning. The runway stepper fills and advances as the device scrolls past.
10. **Reduced motion**: no pinning and no scrub. Content shows in its final state, the atmosphere holds the intro look, and on desktop the stepper sits beside the case-study header.
11. **Length budget**: the desktop page must not grow beyond its previous 14.6 viewports.
12. **URL**: the hash follows the chapter through `replaceState`, so Back does not step through every chapter, and is cleared on the intro. Deep links land after the load event and web fonts, at the chapter offset (`CHAPTER_OFFSET`).
13. **Progress indicators**: the top bar tracks the whole page. `StoryProgress` fills one rail segment per chapter on 2XL+ and shows the current chapter's progress in the mobile capsule.
14. **Tooling**: Motion `useScroll` / `useTransform` and CSS `sticky`, with no new dependency. CSS `animation-timeline` is allowed only for decoration behind `@supports`. Where Motion's ScrollTimeline acceleration misbehaved (the Hero headline opacity), the function form of `useTransform` keeps the value on the JS path.

## Consequences

- The page reads as one narrative without adding height on desktop (still 13,130px at 1440×900). The phone page grew by about 0.1 viewport, because the bridge lines are slightly longer than the leads they replaced.
- `AGENTS.md` rule 3 now asks for one event per beat change instead of one per viewport intersection.
- Case studies can no longer be filtered by origin; the jump nav covers the "show me the POS work" path.
- The verification checklist for scroll work is: the desktop length budget, no sticky elements on small screens or with reduced motion, hash updates and deep-link landings, zero layout shift on language toggle, and one event per beat.
