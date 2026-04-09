# Contributing

## Overview

This repository is a pnpm workspace managed with Turbo.

- `apps/react`: React documentation site
- `apps/vue`: Vue documentation site
- `packages/core`: shared framework-agnostic logic
- `packages/styles`: shared SCSS and generated CSS assets
- `packages/react`: React components and hooks
- `packages/vue`: Vue components and composables

Workspace packages are defined in `pnpm-workspace.yaml`.

## Prerequisites

- Node.js version compatible with the repo dependencies
- `pnpm` via Corepack or a local installation

Install dependencies from the repository root:

```bash
corepack pnpm install
```

## Common Commands

Run from the repository root unless a command explicitly targets a workspace.

```bash
corepack pnpm dev
corepack pnpm build
corepack pnpm lint
corepack pnpm type-check
corepack pnpm check
corepack pnpm docs:check
```

Useful targeted commands:

```bash
corepack pnpm --filter @tile-ui/react-docs dev
corepack pnpm --filter @tile-ui/vue-docs dev
corepack pnpm --filter @tile-ui/react build
corepack pnpm --filter @tile-ui/vue build
```

Registry-related commands:

```bash
corepack pnpm registry:build:react
corepack pnpm registry:build:vue
corepack pnpm registry:build
corepack pnpm test:buildx
```

## Linting

This repository uses Oxlint instead of ESLint.

- Each workspace owns its local Oxlint config in `.oxlintrc.json`
- Root `pnpm lint` runs `turbo lint`
- Workspace lint scripts use `oxlint -c .oxlintrc.json .`

Current workspaces with Oxlint configuration:

- `apps/react/.oxlintrc.json`
- `apps/vue/.oxlintrc.json`
- `packages/core/.oxlintrc.json`
- `packages/react/.oxlintrc.json`
- `packages/vue/.oxlintrc.json`
- `packages/buildx/.oxlintrc.json`
- `packages/styles/.oxlintrc.json`

When adding a new app or package, add:

1. A local `.oxlintrc.json`
2. A `lint` script in that workspace `package.json`
3. Any necessary ignore patterns for generated output

## Type Checking

Run:

```bash
corepack pnpm type-check
```

Notes:

- Root `type-check` runs through Turbo
- Library packages use `tsc --noEmit`
- `packages/styles` includes a no-op `type-check` script so the workspace can participate in the shared pipeline
- `apps/react` currently sets `typescript.ignoreBuildErrors: true` in `next.config.ts`, so `pnpm type-check` should be treated as a required validation step

## Turbo Conventions

Turbo tasks are defined in `turbo.json`.

- `build` caches `dist/**`, `css/**`, `.next/**`, `.nuxt/**`, and `.output/**`
- `lint` has no declared outputs and should not trigger builds
- `type-check` depends on upstream builds

If you add a workspace that generates new build output directories, update `turbo.json` so Turbo can cache them correctly.

## Working on Docs Apps

React docs:

- Path: `apps/react`
- Dev port: `3001`

Vue docs:

- Path: `apps/vue`
- Dev port: `3002`

Before changing docs structure or content loading behavior, also run:

```bash
corepack pnpm docs:check
```

## Working on Registries

Registry sources live in:

- `packages/react/src/registry`
- `packages/vue/src/registry`

If package source changes should be reflected in registry output, rebuild the app-owned artifacts:

```bash
corepack pnpm registry:build
```

## Change Guidelines

- Prefer the smallest correct change
- Keep behavior aligned between React and Vue docs where the feature is shared
- Do not commit generated output unless the change intentionally updates checked-in artifacts
- Avoid broad refactors while making focused fixes

## Before Opening a PR

Run the relevant checks for your change. In most cases, this is enough:

```bash
corepack pnpm lint
corepack pnpm type-check
```

For docs or registry changes, also run:

```bash
corepack pnpm docs:check
corepack pnpm registry:build
```
