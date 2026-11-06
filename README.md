# Theeraphat Srimontha — Junior Mobile Developer Portfolio

A Thai / English portfolio for a junior Flutter developer. Each project is told as a short scroll story: a simulated phone shows the app at each step, with a BLoC event log underneath.

**[Open the live site →](https://theeraphat-portfolio.vercel.app/)**

## Projects

| Project                                  | What I built                                                                                   | Stack                      |
| :--------------------------------------- | :--------------------------------------------------------------------------------------------- | :------------------------- |
| **NCDs Risk Screening** · capstone, 2025 | On-device risk scoring in BLoC, records sent to MySQL via REST API. Screening: 10–15 → 3–5 min | Flutter, BLoC, REST, MySQL |
| **Pinto app** · internship, 2026         | Web menus in a WebView with a native cart, plus Chat Streaks saved through the Profile API     | Flutter, WebView, REST     |
| **Retail POS** · internship, 2026        | Checkout keeps working offline with a SQLite queue that replays without double charges         | Flutter, SQLite, REST      |

## Run it

```bash
npm install
npm run dev
```

Before a pull request, run:

```bash
npx tsc --noEmit
npm run lint
npm run format:check
npm run build
```

## Where things are

- `src/data/` — all text, facts and numbers (never in components)
- `src/components/` — page sections and the phone mockup
- [`AGENTS.md`](AGENTS.md) — rules for working on the code
- [`PRODUCT.md`](PRODUCT.md) · [`DESIGN.md`](DESIGN.md) — audience, claims, palette and motion

Built with React 19, TypeScript, Vite, Tailwind CSS v4 and Motion.

## Contact

**Theeraphat Srimontha (Oven)** · B.Sc. IT, Maejo University · Chiang Mai, open to onsite, hybrid or remote

[theeraphat.sm@gmail.com](mailto:theeraphat.sm@gmail.com) · [github.com/Theeraphat-S](https://github.com/Theeraphat-S)
