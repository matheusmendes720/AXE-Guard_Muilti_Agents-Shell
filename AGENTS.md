# AGENTS.md

AI Studio–sourced Gemini-powered multi-agent shell for the **PetroShield / AxeGuard** ecosystem. Runs on Vite + React 19 + TypeScript + Tailwind v4 with the `@google/genai` SDK. Original AI Studio project link is in `README.md`; this fork lives in the parent `central/` workspace and is committed to its own git repo.

## Setup commands

- Install deps: `npm install`  *(ships its own `package-lock.json`)*
- Env vars: copy `.env.example` to `.env.local` and set at minimum `GEMINI_API_KEY`. `.env.local` is **not** committed; only `.env.example` is checked in. `.env.example` also defines `APP_URL` (Cloud Run self-URL — keep the placeholder unless you actually deploy to Cloud Run).
- Start dev: `npm run dev`  *(Vite on port 3000, host `0.0.0.0`)*
- Build: `npm run build`
- Preview: `npm run preview`
- Clean: `npm run clean`  *(runs `rm -rf dist`; on Windows PowerShell prefer `npx rimraf dist` since `rm -rf` is not a native cmdlet)*
- Lint / typecheck: `npm run lint`  *(alias for `tsc --noEmit`)*
- Test: none configured

## Project layout

```
AXE-Guard_Muilti-Agents-Shell/
├── src/
│   ├── App.tsx            # Shell UI (single-page, no components/ split)
│   ├── main.tsx           # Vite entry point
│   ├── index.css          # Tailwind v4 + global styles + @theme design tokens (--color-bg #0a0b0d, --color-accent-green #00ff41, ...)
│   ├── simulationData.ts  # Mock data for the agent shell
│   └── types.ts           # TypeScript interfaces
├── BFF_DESIGN.md          # PT-BR architecture doc for the SOC multi-agent framework
├── metadata.json          # AI Studio export metadata
├── index.html             # Vite root HTML
├── vite.config.ts         # Vite + @tailwindcss/vite plugin + process.env.GEMINI_API_KEY `define` (see Security)
└── tsconfig.json          # TypeScript config (ES2022 + bundler resolution; no "strict" flag — only tsconfig.json, no app/node split)
```

The `src/` tree is **flat by design** — no `components/` or `services/` subdirectories. New views should follow this convention unless complexity forces otherwise.

## Code style

Sub-repo specifics only — defer to the parent workspace's `AGENTS.md` for the common rules (Node code-style baseline, commit hygiene, per-sub-project entry-point convention).

- **TypeScript config**: see `tsconfig.json`. Compiles with ES2022 + bundler resolution; **does not** enable `"strict": true`. Do not assume strict-null-checks are on; if you need them, add the flag explicitly per-file or in a follow-up PR (out of scope here).
- **Tailwind v4** via `@tailwindcss/vite` plugin (no `tailwind.config.js`). Design tokens live in `src/index.css` under `@theme { … }`.
- **React 19** + functional components + hooks.
- **Path alias**: `@/*` → `./*` (declared in both `tsconfig.json` `paths` and `vite.config.ts` `resolve.alias`). Use it instead of long relative imports.
- **No ESLint / Prettier configured** — `npm run lint` is just `tsc --noEmit`.
- **Gemini calls** go through `@google/genai`. **Reality check**: as of this writing, `vite.config.ts` inlines `GEMINI_API_KEY` into the client bundle via `define: { 'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY) }` — see Security. If a route needs the key server-side, propose a small Express handler (the dependency is already installed: `express ^4.21.2` + `@types/express`) and stop shipping the key via `define`.

## Architecture pointers

- `BFF_DESIGN.md` (PT-BR) is the canonical design doc for the SOC multi-agent framework — read it before non-trivial edits. Key concept is the **Client-Side BFF** pattern with an in-memory `SOCState` and heuristic fallback ("Circuit Breaker Heurístico") for when Gemini rate-limits.
- The companion **`SOC-sys_Dashboard`** (in this same `central/` workspace) is the simulation UI half of the same AxeGuard story; **`central/PetroShield_Finance-CyberSec`** is the API/Prisma backend half. They are independent git repos that share the conceptual model but do not import each other's code.

## Security

- `GEMINI_API_KEY` must live only in `.env.local`. The committed `.env.example` is a placeholder.
- Never log the key, even in mock-output flows. If a dev story needs to inspect it, mask all but the suffix.
- Do not commit real `.env` — only `.env.example`.
- **Reality check — key is currently inlined.** `vite.config.ts:10-12` runs `define: { 'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY) }`, which embeds the key as a literal in the client bundle. AGENTS.md's "keep the key off the client" guidance is therefore **aspirational** until that line is moved to a server-only path. **Treat any public deploy of `npm run build` output as exposing the key.** Local-only or trusted-network use is fine. To fix properly, route the SDK call through an Express handler (the dep is already installed) and remove the `define` line.

## Dependencies actually wired

- **Imported in `src/`:**
  - `@google/genai` (Gemini SDK — see Code style)
  - `lucide-react` (icons)
  - `react`, `react-dom`
- **Build-time:** `@tailwindcss/vite`, `@vitejs/plugin-react`, `tailwindcss`, `vite`, `typescript`, `@types/node`.
- **In `package.json` but not wired into `.ts`/`.tsx` yet:**
  - `dotenv` — Vite already loads `.env.*` natively; redundant
  - `motion` — Framer Motion successor, not yet imported
  - `autoprefixer` — Tailwind v4 ships its own; redundant
  - `express` + `@types/express` — no server code yet; available for the BFF handler proposed in `BFF_DESIGN.md` (see Security above)

## Dev conveniences

- `DISABLE_HMR=true` env var turns off Vite HMR (`vite.config.ts:18-22` — `hmr: process.env.DISABLE_HMR !== 'true'`). AI Studio uses this to prevent flicker during agent edits; safe to set locally when iterating on `vite.config.ts` itself.
- No test runner is configured (matches parent workspace).

## Notes about the AI Studio origin

- `package.json` `name` is still `"react-example"` (the AI Studio default). **Out of scope** to rename here; renaming touches lockfile + container labels and is its own PR.
- `metadata.json` is an AI Studio export artifact — do **not** remove (it documents the upstream origin and import target).
- `.env.example` ships `GEMINI_API_KEY` and `APP_URL` placeholders written for AI Studio's secrets panel; rename or strip them only if you stop deploying via AI Studio.

## Branching & commits

- Has its own `.git/` — branch and commit inside this sub-repo, not at the parent workspace level.
- Conventional commits where it makes sense (`feat:` / `fix:` / `docs:` / `refactor:`).