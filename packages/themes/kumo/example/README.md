# Kumo Vue Playground

A standalone, single-page Vue + TypeScript TSX + Vite example. Explore Tile UI components in the Kumo theme, including forms, charts, tables, dialogs, menus, and light/dark modes. All actions are local demonstrations; no backend is required.

## Prepare the local theme

From `packages/themes/kumo`, install its build dependency and compile the theme:

```bash
pnpm install
pnpm build
```

The example's only local package dependency is `@tile-ui/theme-kumo` (`file:..`). It reads the theme's compiled `dist/theme.css`. Rebuild the theme manually after changing its Sass source.

## Run the example

From this `example` directory:

```bash
pnpm install
pnpm dev
```

Open the URL printed by Vite (normally `http://127.0.0.1:3010`). The example has its own package boundary and does not run repository-root scripts, build framework packages, or use workspace dependencies. Vue, Tile UI framework packages, and development tools are installed from npm.

**Release prerequisite:** the normal npm setup targets `@tile-ui/vue`, `@tile-ui/core`, and `@tile-ui/styles` `^1.1.3`, matching the local theme's compatibility requirement. These versions must be available from your npm registry before installation. For temporary local framework development, see Development below; keep the committed dependencies pointing to npm versions.

## Build a static site

```bash
pnpm build
pnpm preview
```

Deploy the contents of `dist/` to a static host. Relative asset paths support hosting in a subdirectory. No Nuxt or server-side rendering is involved.

## Development

### Theme changes

The theme is already a local dependency (`file:..`). Manually rebuild it from `packages/themes/kumo` with `pnpm build`, then restart the example's dev server if the updated CSS is not picked up. The example never builds the theme or framework packages automatically.

### Temporarily test local framework packages

For framework development, you can temporarily link the local packages instead of using their npm releases. First build the local core and Vue packages from their respective directories with `pnpm build` (core before Vue). Build the theme separately as described above. The linked packages expose their build outputs; linking does not compile TypeScript or watch for changes.

From `packages/themes/kumo/example`, run:

```bash
pnpm link ../../../core ../../../styles ../../../vue
pnpm dev
```

The paths are relative to this example directory. Link all three together to keep the framework and shared styles compatible. No extra link is needed for the theme. After changing framework source, manually rebuild the affected package and restart Vite if necessary. The Vite configuration deduplicates Vue so linked packages use the same Vue runtime.

Keep this setup local. Do not commit temporary `file:` / `link:` framework dependencies, overrides, or link-related lockfile changes. Inspect the example's manifest and lockfile before committing:

```bash
git diff -- package.json pnpm-lock.yaml
git status --short
```

To return to the declared npm dependencies:

```bash
pnpm unlink
pnpm install
```

If linking changed the manifest or lockfile, remove only the temporary link-related edits before reinstalling; preserve unrelated work. Reinstallation requires the declared framework versions to exist in your registry. Linking is a local development option, not a way to make the documented npm setup work before those releases are published. A first-time install may still need temporary local dependency configuration if npm cannot resolve the required versions; do not commit that configuration.

## Start here

- `src/main.tsx`: imports the theme, optional reset, and mounts Vue.
- `src/App.tsx`: imports real components from `@tile-ui/vue` and connects local interactions.
- `src/style.css`: page layout and decoration, not copies of component styles.
- `index.html`: restores the saved color mode before the page appears.
- `vite.config.ts`: enables Vue JSX and resolves the component Sass include path from the installed styles package.

Switch modes using the header toggle. The application sets `data-theme` on `html` and saves the preference when browser storage is available. No theme Provider is needed. The gallery covers common components, not every possible state or a complete accessibility audit.

## Use the same setup elsewhere

Install the framework packages from npm, then add the theme package (or your manually built local theme). Import:

```ts
import '@tile-ui/theme-kumo/theme.css';
import '@tile-ui/styles/reset.css'; // Optional if your application has a reset.
```

Do not also load the default `theme` or `globals` palette. Keep `sass` available because Tile UI components import Sass modules. See the [theme README](../README.md) for more setup details.
