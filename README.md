# Game Magnet PLR

A library of brutalist-style puzzle games that run in the browser and print as KDP-ready activity pages.

- **FE package** – 5 core games (Sudoku Master, Word Search, Maze Escape, Quick Math, Sliding Puzzle).
- **OTO 1 (KDP Empire)** – 14 extra KDP games.
- **OTO 2** – PLR white-label generator: rebrand any unlocked game and download it as a standalone HTML file.

Each package is unlocked with an access code. The codes are checked in the browser (only their SHA-256 hashes ship in the bundle), so this is a convenience gate, not strong protection: anyone who can run code in their own browser can bypass it. Use a server-side check if you need real access control.

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

- `npm run lint` – type-check with `tsc`
- `npm run build` – production build into `dist/`
- `npm run preview` – serve the production build

## Project layout

- `src/components/Dashboard.tsx` – library page, unlock modals, white-label generator
- `src/components/GameView.tsx` / `GameFrame.tsx` – plays a game inside a sandboxed iframe and tracks the score
- `src/data/games.ts` – game list (title, icon, package)
- `src/data/game-content/*.ts` – each game's standalone HTML, loaded on demand via `src/data/gameContent.ts`
- `src/lib/access.ts` – access-code checks and unlock state

### Changing an access code

Hash the new code (trimmed, uppercase) and put the hash in `CODE_HASHES` in `src/lib/access.ts`:

```bash
printf %s "NEWCODE" | sha256sum
```

### Adding a game

1. Add `src/data/game-content/<id>.ts` exporting the game's HTML.
2. Register its loader in `src/data/gameContent.ts`.
3. Add an entry to `src/data/games.ts`. If its `icon` is a new lucide icon, add it to the `Icons` map in `Dashboard.tsx`.
