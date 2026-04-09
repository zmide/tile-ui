# Tile UI

Tile UI is a lightweight component library built around a shared SCSS design system and framework-specific React and Vue packages.

This repository exposes two framework-specific applications and two independent registries:

- `apps/react` for the React documentation site and React registry.
- `apps/vue` for the Vue documentation site and Vue registry.

Shared docs styles and layout primitives live in `apps/common`.

The current docs implementation provides aligned page groups for both frameworks:

- installation
- registry
- registry/getting-started
- registry/schema
- registry/examples
- registry/faq
- components
- component detail pages
- hooks or composables
- examples

Docs architecture:

- React: Next.js App Router + `fumadocs-mdx` + `content/docs/*.mdx`
- Vue: Nuxt + `content/docs/*.mdx` + server-side content loader
- Shared presentation layer: `apps/common/styles/*` and selected shared docs components

Documentation pages now follow a richer structure with installation, usage, highlights, dependency notes, and API-style sections.

## Workspace Layout

```text
tile-ui/
├── apps/
│   ├── common/                     # Shared docs styles and helpers
│   ├── react/                      # React site + React registry output
│   └── vue/                        # Vue site + Vue registry output
├── packages/
│   ├── core/                       # Shared framework-agnostic logic
│   ├── styles/                     # Shared SCSS design system
│   ├── react/                      # React package
│   └── vue/                        # Vue package
├── registry/
│   ├── react/
│   │   ├── registry.json           # React registry source manifest
│   │   └── tile-ui/                # React registry source files
│   └── vue/
│       ├── registry.json           # Vue registry source manifest
│       └── tile-ui/                # Vue registry source files
└── scripts/
    └── build-registry.js          # Sync package sources into both registries
```

## Packages

| Package | Purpose |
|---|---|
| `@tile-ui/core` | Shared design logic and utility helpers |
| `@tile-ui/styles` | Global SCSS, variables, and mixins |
| `@tile-ui/react` | React components and hooks |
| `@tile-ui/vue` | Vue components and composables |

## Applications

### React

- App path: `apps/react`
- Local dev port: `3001`
- Registry output: `apps/react/public/r/*`
- Public registry URL shape: `https://react.tile-ui.dev/r/{name}.json`

### Vue

- App path: `apps/vue`
- Local dev port: `3002`
- Registry output: `apps/vue/public/r/*`
- Public registry URL shape: `https://vue.tile-ui.dev/r/{name}.json`

## Registries

### React Registry

- Source manifest: `registry/react/registry.json`
- Source files: `registry/react/tile-ui/*`

Example items:

- `button`
- `input`
- `textarea`
- `label`
- `card`
- `styles`
- `utils`
- `use-copy-to-clipboard`
- `use-media-query`
- `use-local-storage`

### Vue Registry

- Source manifest: `registry/vue/registry.json`
- Source files: `registry/vue/tile-ui/*`

Example items:

- `core`
- `button`
- `input`
- `textarea`
- `label`
- `card`
- `styles`
- `utils`
- `use-copy-to-clipboard`
- `use-media-query`
- `use-local-storage`

## Installation

### React package

```bash
pnpm add @tile-ui/react @tile-ui/styles @tile-ui/core
```

### Vue package

```bash
pnpm add @tile-ui/vue @tile-ui/styles @tile-ui/core
```

### React registry item

```bash
pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/button.json
```

### Vue registry item

```bash
pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/button.json
```

## Development

```bash
corepack pnpm install
corepack pnpm dev
```

Useful commands:

```bash
corepack pnpm registry:sync
corepack pnpm registry:build:react
corepack pnpm registry:build:vue
corepack pnpm registry:build
corepack pnpm docs:check
corepack pnpm --filter react build
corepack pnpm --filter vue build
```

`docs:check` validates both expected docs entry routes and internal `/docs/...` links inside MDX content.

## Current Scope

The current implementation provides:

- Separate React and Vue registries
- Separate React and Vue applications for docs and previews
- Shared docs styling in `apps/common`
- Unified homepage and component showcase patterns for both frameworks
- Expanded page groups for registry guides, components, utilities, and examples

The next iteration should continue the migration toward a more content-driven documentation system and richer live previews.

## License

MIT
