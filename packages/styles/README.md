# @tile-ui/styles

[English](./README.md) | [简体中文](./README.zh-CN.md)

Shared SCSS source files and compiled CSS for the Tile UI runtime design system.

## Installation

```bash
pnpm add @tile-ui/styles
```

## Included Assets

- Tile extension tokens: `@tile-ui/styles/tokens.css`, `@tile-ui/styles/tokens.scss`
- Optional default theme: `@tile-ui/styles/theme.css`, `@tile-ui/styles/theme.scss`
- Reset and global base styles: `@tile-ui/styles/reset.css`, `@tile-ui/styles/reset.scss`
- Backward-compatible combined entry: `@tile-ui/styles/globals.css`, `@tile-ui/styles/globals.scss`
- Component styles under `@tile-ui/styles/css/*`
- SCSS modules and tokens under `@tile-ui/styles/scss/*`

## Usage

```ts
import '@tile-ui/styles/globals.css';
import '@tile-ui/styles/css/components/button.css';
```

`globals.css` is the backward-compatible bridge entry. It installs Tile's default shadcn palette and reset together, preserving the previous package behavior. Applications that already own shadcn variables should load Tile extension tokens, the reset, and component styles separately:

```ts
import '@tile-ui/styles/tokens.css';
import '@tile-ui/styles/reset.css';
import '@tile-ui/styles/css/components/button.css';
```

## Runtime Theme

Tile components consume the standard shadcn semantic variables at runtime:

```css
:root {
	--background: #ffffff;
	--foreground: #18181b;
	--card: #ffffff;
	--card-foreground: #18181b;
	--popover: #ffffff;
	--popover-foreground: #18181b;
	--primary: #18181b;
	--primary-foreground: #fafafa;
	--secondary: #f4f4f5;
	--secondary-foreground: #18181b;
	--muted: #f4f4f5;
	--muted-foreground: #71717a;
	--accent: #f4f4f5;
	--accent-foreground: #18181b;
	--destructive: #ef4444;
	--destructive-foreground: #fafafa;
	--border: #e4e4e7;
	--input: #e4e4e7;
	--ring: #18181b;
	--radius: 0.5rem;
}
```

The optional default theme also provides `--chart-1` through `--chart-5` and the standard `--sidebar*` variables. `tokens.css` only installs literal Tile-specific defaults under the `--tile-*` namespace. Values derived from semantic variables, such as hover colors, field states, shadow recipes, font aliases, and radius steps, are emitted directly in component CSS as fallbacks like `var(--tile-primary-hover, color-mix(...))`. This lets them recompute from the closest scoped theme while preserving `--tile-*` as an explicit override hook. The installed defaults use zero selector specificity, so importing them does not replace an application's existing `:root` or `.dark` values.

Load `theme.css` before `reset.css` when Tile should own the default light and dark shadcn palette. Unlike `tokens.css`, this entry declares `--background`, `--primary`, and the other standard semantic variables; normal CSS cascade order still applies if application styles are loaded later.

```ts
import '@tile-ui/styles/theme.css';
import '@tile-ui/styles/reset.css';
```

## Independent themes

Shared component styles expose CSS custom properties with default fallbacks. Independent theme packages supply appearance values; this package does not select or identify them.

Import the selected theme's CSS or Sass entry in the application. Do not combine an independent palette with the default `theme.*` or `globals.*` palette. Component styles are imported as usual. Applications own mode markers, persistence, system preferences, and fonts. Consult the selected theme's documentation for its mode selectors and installation details.

`createThemeVariables` and `applyThemeVariables` generate the default palette's concrete values; they are not a generic mode-switching mechanism for independent themes.

## Sass compatibility

```scss
@use '@tile-ui/styles/scss/variables/colors' as *;
@use '@tile-ui/styles/scss/mixins/utils' as *;
```

The legacy Sass names remain available, but theme-facing names now compile to CSS variable references rather than fixed Sass colors.

## Build

The package compiles `scss/` into `css/` with `node build.js`.

```bash
pnpm --filter @tile-ui/styles build
pnpm --filter @tile-ui/styles lint
```
