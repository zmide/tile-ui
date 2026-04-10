# @tile-ui/core

Framework-agnostic logic, types, utility helpers, and design tokens shared across the Tile UI packages.

## Installation

```bash
pnpm add @tile-ui/core
```

## Exports

- Component logic and types for button, input, textarea, label, and card
- Utility helpers from `@tile-ui/core/utils`
- Design tokens via `tokens`

## Usage

```ts
import { cn, getButtonStyleKeys, type ButtonVariant, tokens } from '@tile-ui/core';

const styleKeys = getButtonStyleKeys({ variant: 'default' as ButtonVariant });
const className = cn('tile-button', ...styleKeys);
const primaryColor = tokens.colors.primary;
```

## Package Entrypoints

- `@tile-ui/core`
- `@tile-ui/core/utils`
- `@tile-ui/core/tokens`

## Development

```bash
pnpm --filter @tile-ui/core build
pnpm --filter @tile-ui/core type:check
pnpm --filter @tile-ui/core lint
```
