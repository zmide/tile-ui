# @tile-ui/vue

Vue components and composables built on top of `@tile-ui/core` and `@tile-ui/styles`.

## Installation

```bash
pnpm add @tile-ui/vue @tile-ui/core @tile-ui/styles
```

## Exports

- Components: `TButton`, `TInput`, `TTextarea`, `TLabel`, `TCard`
- Card parts: `TCardHeader`, `TCardTitle`, `TCardDescription`, `TCardContent`, `TCardFooter`
- Composables: `useLocalStorage`, `useSessionStorage`, `useWindowSize`, `useMediaQuery`, `useIsMobile`, `useOnlineStatus`, `useScrollPosition`, `useCopyToClipboard`, `useClickOutside`, `useKeyPress`, `useMousePosition`
- Composables subpath export: `@tile-ui/vue/composables`

## Usage

```vue
<script setup lang="ts">
import '@tile-ui/styles/css/globals.css';

import { TButton, TCard, TCardContent, TCardHeader, TCardTitle, useMediaQuery } from '@tile-ui/vue';

const isDesktop = useMediaQuery('(min-width: 1024px)');
</script>

<template>
	<TCard>
		<TCardHeader>
			<TCardTitle>{{ isDesktop ? 'Desktop' : 'Mobile' }}</TCardTitle>
		</TCardHeader>
		<TCardContent>
			<TButton>Tile UI</TButton>
		</TCardContent>
	</TCard>
</template>
```

## Development

```bash
pnpm --filter @tile-ui/vue build
pnpm --filter @tile-ui/vue type:check
pnpm --filter @tile-ui/vue lint
```
