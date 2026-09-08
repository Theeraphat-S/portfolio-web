# Space Theme Brief

Status: Completed and verified against all acceptance criteria. ADR-0004 recorded.

## Confirmed decisions

- Add visitor-selectable Original / Space visual themes.
- Preserve content layout and navigation while restyling backgrounds, cards, buttons, and decoration for Space.
- Use cinematic, realistic space imagery with dimensional planets, fine stars, blue horizon lighting, and glass-like cards.
- Continue following the system light/dark preference for both visual themes.
- In light mode, use a blue-tinted white backdrop, softly lit planets, pale glass-like cards, and dark text. In dark mode, use deep-black space.
- Keep motion gentle and slow: subtle star twinkling, slow planetary movement, and depth while scrolling.
- Show Original on a first visit.
- Remember the selected visual theme in the same browser for future visits.
- Place the Original / Space selector in the navbar near the language control and show the selected theme name.
- Use Earth's curved horizon viewed from orbit as the hero's main image, with blue atmospheric light and room for the introductory text.
- Keep Earth prominent only in the hero. Subsequent sections use sparse stars and soft blue light, with space-themed cards and buttons that keep portfolio content easy to read.

## Implementation considerations

- Visual-theme persistence is separate from color mode. ADR-0003's system-driven color mode remains applicable.
- Respect reduced-motion preferences.
- Check navbar fit on narrow screens; the existing header also contains branding, language selection, and a mobile menu button.

## Acceptance criteria

- A first-time visitor sees Original; choosing Space updates the visual presentation while retaining the content layout and navigation.
- Reloading or revisiting in the same browser restores the selected visual theme when browser storage is available.
- Both visual themes follow system light/dark changes independently of the saved visual-theme choice.
- The navbar selector is usable in Thai and English, with keyboard access and a clear selected state, on desktop and narrow mobile screens.
- Space uses the agreed Earth-horizon hero and restrained scenery in subsequent sections in both color modes.
- Reduced-motion preferences suppress decorative movement; text and controls remain readable and usable over the scenery.
- Switching visual themes preserves the visitor's current content position and entered form data.
