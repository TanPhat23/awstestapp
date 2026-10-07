# awsapp

A modern web application built with [Next.js](https://nextjs.org) (App Router), [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org), and [Tailwind CSS v4](https://tailwindcss.com).

---

## Tech Stack

| Category | Technology | Version / Details |
| --- | --- | --- |
| **Framework** | [Next.js](https://nextjs.org) | `15.3.4` (App Router architecture) |
| **Bundler / Dev Engine** | [Turbopack](https://turbo.build/pack) | Enabled for local development (`--turbopack`) |
| **Core UI Library** | [React](https://react.dev) | `^19.0.0` |
| **Language** | [TypeScript](https://www.typescriptlang.org) | `^5` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | `^4` (via `@tailwindcss/postcss` plugin) |
| **PostCSS** | PostCSS | Configured via `postcss.config.mjs` |
| **Typography** | Geist Font Family | Loaded via `next/font/google` (`--font-geist-sans`, `--font-geist-mono`) |

---

## Project Structure

```text
awsapp/
├── public/                 # Static assets (SVG icons, public images)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   └── app/                # Next.js App Router root directory
│       ├── favicon.ico     # Application favicon
│       ├── globals.css     # Global styles & Tailwind CSS v4 setup (@theme inline)
│       ├── layout.tsx      # Root layout component with Geist font configurations
│       └── page.tsx        # Application homepage component
├── next.config.ts          # Next.js configuration (TypeScript format)
├── package.json            # Project manifest, dependencies, and scripts
├── postcss.config.mjs      # PostCSS configuration with @tailwindcss/postcss
├── tsconfig.json           # TypeScript configuration with path aliases (`@/*` -> `./src/*`)
└── README.md               # Project documentation
```

### Architectural Highlights

- **App Router (`src/app`)**: Uses Next.js App Router for server-first layouts, metadata definition, and nested routing.
- **Geist Fonts**: Font variables `--font-geist-sans` and `--font-geist-mono` are configured in `src/app/layout.tsx` using `next/font/google` and exposed through CSS variables in `src/app/globals.css`.
- **Tailwind CSS v4**: Built with the next-generation Tailwind engine utilizing `@import "tailwindcss";` and `@theme inline` blocks inside `src/app/globals.css` alongside `postcss.config.mjs`.

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.18+ or v20+ recommended) and `npm` installed.

### Installation

Install dependencies using npm:

```bash
npm install
```

### Development Server

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Available Scripts

Defined in `package.json`:

| Command | Action |
| --- | --- |
| `npm run dev` | Starts the development server using Turbopack (`next dev --turbopack`) for fast updates. |
| `npm run build` | Builds the production application bundle (`next build`). |
| `npm run start` | Runs the compiled Next.js production server (`next start`). Run after building. |
| `npm run lint` | Runs Next.js ESLint checks (`next lint`). |

---

## Tooling & Configuration

- **`next.config.ts`**: TypeScript-typed configuration for Next.js runtime, build parameters, and plugins.
- **`tsconfig.json`**: Configures strict TypeScript settings and path aliases (`@/*` pointing to `./src/*`).
- **`postcss.config.mjs`**: Specifies PostCSS plugins, including `@tailwindcss/postcss` for Tailwind CSS processing.
