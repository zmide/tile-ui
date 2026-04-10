# @tile-ui/react

React components and hooks built on top of `@tile-ui/core` and `@tile-ui/styles`.

## Installation

```bash
pnpm add @tile-ui/react @tile-ui/core @tile-ui/styles
```

## Exports

- Components: `Button`, `Input`, `Textarea`, `Label`, `Card`
- Hooks: `useLocalStorage`, `useSessionStorage`, `useWindowSize`, `useMediaQuery`, `useIsMobile`, `useOnlineStatus`, `useScrollPosition`, `useCopyToClipboard`, `useClickOutside`, `useKeyPress`, `useMousePosition`
- Hooks subpath export: `@tile-ui/react/hooks`

## Usage

```tsx
import '@tile-ui/styles/css/globals.css';

import { Button, Card, CardContent, CardHeader, CardTitle, useMediaQuery } from '@tile-ui/react';

export function ExampleCard() {
	const isDesktop = useMediaQuery('(min-width: 1024px)');

	return (
		<Card>
			<CardHeader>
				<CardTitle>{isDesktop ? 'Desktop' : 'Mobile'}</CardTitle>
			</CardHeader>
			<CardContent>
				<Button>Tile UI</Button>
			</CardContent>
		</Card>
	);
}
```

## Development

```bash
pnpm --filter @tile-ui/react build
pnpm --filter @tile-ui/react type:check
pnpm --filter @tile-ui/react lint
```
