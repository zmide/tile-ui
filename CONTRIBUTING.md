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
corepack pnpm check
corepack pnpm type:check
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
corepack pnpm type:check
```

Notes:

- Root `type:check` runs each workspace check from the repository root
- Library packages use `tsc --noEmit`
- `packages/styles` includes a no-op `type:check` script so the workspace can participate in the shared pipeline
- `apps/react` currently sets `typescript.ignoreBuildErrors: true` in `next.config.ts`, so `pnpm type:check` should be treated as a required validation step

## Turbo Conventions

Turbo tasks are defined in `turbo.json`.

- `build` caches `dist/**`, `css/**`, `.next/**`, `.nuxt/**`, and `.output/**`
- `lint` has no declared outputs and should not trigger builds
- `type:check` depends on upstream builds

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

## Releasing Packages

Publishable packages currently live under `packages/`:

- `@tile-ui/core`
- `@tile-ui/styles`
- `@tile-ui/react`
- `@tile-ui/vue`

GitHub Actions publishes packages through npm Trusted Publishing with OIDC. The workflow is defined in `.github/workflows/publish-packages.yml` and requires `id-token: write`.

### Release Tag Format

Releases are package-specific. Use a tag in this format:

```bash
<package>/v<version>
```

Examples:

```bash
git tag core/v1.0.1
git push origin core/v1.0.1

git tag react/v1.0.1
git push origin react/v1.0.1
```

Supported package tag prefixes:

- `core`
- `styles`
- `react`
- `vue`

### Release Requirements

Before pushing a release tag:

1. Update the target package version in `packages/<name>/package.json`
2. Make sure the version matches the tag version exactly
3. Run the target package build locally when possible

The workflow will:

1. Parse the package name and version from the tag
2. Verify the package version matches the tag version
3. Build only the targeted package
4. Publish only the targeted package with `--provenance`

### npm Trusted Publishing Setup

The npm package must be configured to trust this GitHub repository and workflow.

For each published package, configure a Trusted Publisher entry in npm that matches:

- The current GitHub repository
- The workflow file `.github/workflows/publish-packages.yml`
- The package name being published

Without that npm-side setup, the OIDC publish step will fail even if the GitHub workflow is correct.

## Change Guidelines

- Prefer the smallest correct change
- Keep behavior aligned between React and Vue docs where the feature is shared
- Do not commit generated output unless the change intentionally updates checked-in artifacts
- Avoid broad refactors while making focused fixes

## Before Opening a PR

Run the relevant checks for your change. In most cases, this is enough:

```bash
corepack pnpm lint
corepack pnpm type:check
```

For docs or registry changes, also run:

```bash
corepack pnpm docs:check
corepack pnpm registry:build
```
