# @tile-ui/styles

Shared SCSS source files and compiled CSS for the Tile UI design system.

## Installation

```bash
pnpm add @tile-ui/styles
```

## Included Assets

- Global styles: `@tile-ui/styles/globals.css`, `@tile-ui/styles/globals.scss`
- Component styles under `@tile-ui/styles/css/*`
- SCSS modules and tokens under `@tile-ui/styles/scss/*`

## Usage

```ts
import '@tile-ui/styles/globals.css';
import '@tile-ui/styles/css/components/button.css';
```

```scss
@use '@tile-ui/styles/scss/variables/colors' as *;
@use '@tile-ui/styles/scss/mixins/utils' as *;
```

## Build

The package compiles `scss/` into `css/` with `node build.js`.

```bash
pnpm --filter @tile-ui/styles build
pnpm --filter @tile-ui/styles lint
```
