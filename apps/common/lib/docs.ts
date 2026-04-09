export type DocsLinkItem = {
	title: string;
	description: string;
	href: string;
};

export type ComponentDoc = {
	slug: string;
	title: string;
	description: string;
	install: string;
	usage: string;
	highlights: string[];
};

export type UtilityDoc = {
	slug: string;
	title: string;
	description: string;
	install: string;
	usage: string;
};

export const reactHomeLinks: DocsLinkItem[] = [
	{
		title: 'Installation',
		description: 'Install the React package or add components from the React registry.',
		href: '/docs/installation',
	},
	{
		title: 'Registry',
		description: 'Browse the React registry items published by Tile UI.',
		href: '/docs/registry',
	},
	{
		title: 'Components',
		description: 'Read usage notes for Button, Input, Textarea, Label, and Card.',
		href: '/docs/components',
	},
	{
		title: 'Examples',
		description: 'See complete example compositions built from the same primitives.',
		href: '/docs/examples',
	},
];

export const vueHomeLinks: DocsLinkItem[] = [
	{
		title: 'Installation',
		description: 'Use the Vue package or install items from the Vue registry.',
		href: '/docs/installation',
	},
	{
		title: 'Registry',
		description: 'Browse the Vue registry URLs and item inventory.',
		href: '/docs/registry',
	},
	{
		title: 'Components',
		description: 'Read component notes for Button, Input, Textarea, Label, and Card.',
		href: '/docs/components',
	},
	{
		title: 'Examples',
		description: 'See complete example compositions built from the same primitives.',
		href: '/docs/examples',
	},
];

export const reactDocsGroups: DocsLinkItem[] = [
	{
		title: 'Installation',
		href: '/docs/installation',
		description: 'How to use the React package and the React registry.',
	},
	{
		title: 'Registry',
		href: '/docs/registry',
		description: 'The React registry layout, URLs, and supported items.',
	},
	{
		title: 'Components',
		href: '/docs/components',
		description: 'Component inventory with direct links to item docs.',
	},
	{
		title: 'Hooks',
		href: '/docs/hooks',
		description: 'Framework-specific client helpers packaged with Tile UI React.',
	},
	{
		title: 'Examples',
		href: '/docs/examples',
		description: 'Reusable example flows built from registry-compatible primitives.',
	},
];

export const vueDocsGroups: DocsLinkItem[] = [
	{
		title: 'Installation',
		href: '/docs/installation',
		description: 'How to use the Vue package and the Vue registry.',
	},
	{
		title: 'Registry',
		href: '/docs/registry',
		description: 'The Vue registry layout, URLs, and supported items.',
	},
	{
		title: 'Components',
		href: '/docs/components',
		description: 'Component inventory with direct links to item docs.',
	},
	{
		title: 'Composables',
		href: '/docs/composables',
		description: 'Vue-native helpers packaged with Tile UI Vue.',
	},
	{
		title: 'Examples',
		href: '/docs/examples',
		description: 'Reusable example flows built from registry-compatible primitives.',
	},
];

export const registryGuideLinks: DocsLinkItem[] = [
	{
		title: 'Getting Started',
		href: 'getting-started',
		description: 'Understand the source manifests, sync script, and build commands.',
	},
	{
		title: 'Schema',
		href: 'schema',
		description: 'Review how items, dependencies, and files are modeled in the registry manifests.',
	},
	{
		title: 'Examples',
		href: 'examples',
		description: 'See how base items combine into realistic application patterns.',
	},
	{
		title: 'FAQ',
		href: 'faq',
		description: 'Clarify framework boundaries, styling expectations, and installation choices.',
	},
];

export const reactComponents: ComponentDoc[] = [
	{
		slug: 'button',
		title: 'Button',
		description: 'A multi-variant action component with loading state and size variants.',
		install: 'pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/button.json',
		usage: "import { Button } from '@tile-ui/react';",
		highlights: ['Six visual variants', 'Loading state support', 'Small, default, large, and icon sizes'],
	},
	{
		slug: 'input',
		title: 'Input',
		description: 'A text input with built-in label, helper text, and error state handling.',
		install: 'pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/input.json',
		usage: "import { Input } from '@tile-ui/react';",
		highlights: ['Label and helper text built in', 'Consistent ARIA wiring', 'Error-state messaging'],
	},
	{
		slug: 'textarea',
		title: 'Textarea',
		description: 'A multi-line field with the same label and helper affordances as Input.',
		install: 'pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/textarea.json',
		usage: "import { Textarea } from '@tile-ui/react';",
		highlights: ['Multi-line content entry', 'Validation messaging', 'Same field anatomy as Input'],
	},
	{
		slug: 'label',
		title: 'Label',
		description: 'A lightweight form label with support for required-state styling.',
		install: 'pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/label.json',
		usage: "import { Label } from '@tile-ui/react';",
		highlights: ['Required marker styling', 'Simple form composition', 'Pairs cleanly with Input and Textarea'],
	},
	{
		slug: 'card',
		title: 'Card',
		description: 'Composable card primitives for headers, content, descriptions, and actions.',
		install: 'pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/card.json',
		usage: "import { Card, CardHeader, CardTitle, CardContent } from '@tile-ui/react';",
		highlights: ['Header, content, and footer primitives', 'Consistent section spacing', 'Useful for docs and app surfaces'],
	},
];

export const vueComponents: ComponentDoc[] = [
	{
		slug: 'button',
		title: 'Button',
		description: 'A multi-variant action component with loading state and size variants.',
		install: 'pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/button.json',
		usage: "import { TButton } from '@tile-ui/vue';",
		highlights: ['Six visual variants', 'Loading state support', 'Small, default, and large sizes'],
	},
	{
		slug: 'input',
		title: 'Input',
		description: 'A text input with built-in label, helper text, and error state handling.',
		install: 'pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/input.json',
		usage: "import { TInput } from '@tile-ui/vue';",
		highlights: ['Works with modelValue', 'Consistent ARIA wiring', 'Error-state messaging'],
	},
	{
		slug: 'textarea',
		title: 'Textarea',
		description: 'A multi-line field with the same label and helper affordances as Input.',
		install: 'pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/textarea.json',
		usage: "import { TTextarea } from '@tile-ui/vue';",
		highlights: ['Vue-native model updates', 'Validation messaging', 'Same field anatomy as Input'],
	},
	{
		slug: 'label',
		title: 'Label',
		description: 'A lightweight form label with support for required-state styling.',
		install: 'pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/label.json',
		usage: "import { TLabel } from '@tile-ui/vue';",
		highlights: ['Required marker styling', 'Simple form composition', 'Pairs cleanly with Input and Textarea'],
	},
	{
		slug: 'card',
		title: 'Card',
		description: 'Composable card primitives for headers, content, descriptions, and actions.',
		install: 'pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/card.json',
		usage: "import { TCard, TCardHeader, TCardTitle, TCardContent } from '@tile-ui/vue';",
		highlights: ['Slot-based composition', 'Header, content, and footer primitives', 'Useful for docs and app surfaces'],
	},
];

export const reactHooks: UtilityDoc[] = [
	{
		slug: 'use-local-storage',
		title: 'useLocalStorage',
		description: 'Persist client state into local or session storage for simple settings and drafts.',
		install: 'pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/use-local-storage.json',
		usage: "const [value, setValue] = useLocalStorage('theme', 'light')",
	},
	{
		slug: 'use-media-query',
		title: 'useMediaQuery',
		description: 'Read responsive state and viewport changes without rewriting browser event plumbing.',
		install: 'pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/use-media-query.json',
		usage: "const isMobile = useMediaQuery('(max-width: 768px)')",
	},
	{
		slug: 'use-copy-to-clipboard',
		title: 'useCopyToClipboard',
		description: 'Handle copy interactions, copied state, and timeout reset in a single helper.',
		install: 'pnpm dlx shadcn@latest add https://react.tile-ui.dev/r/use-copy-to-clipboard.json',
		usage: 'const { copy, copied } = useCopyToClipboard()',
	},
];

export const vueComposables: UtilityDoc[] = [
	{
		slug: 'use-local-storage',
		title: 'useLocalStorage',
		description: 'Persist refs into local or session storage for simple settings and drafts.',
		install: 'pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/use-local-storage.json',
		usage: "const value = useLocalStorage('theme', 'light')",
	},
	{
		slug: 'use-media-query',
		title: 'useMediaQuery',
		description: 'Read responsive state and viewport changes without rewriting browser event plumbing.',
		install: 'pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/use-media-query.json',
		usage: "const isMobile = useMediaQuery('(max-width: 768px)')",
	},
	{
		slug: 'use-copy-to-clipboard',
		title: 'useCopyToClipboard',
		description: 'Handle copy interactions, copied state, and timeout reset in a single composable.',
		install: 'pnpm dlx shadcn@latest add https://vue.tile-ui.dev/r/use-copy-to-clipboard.json',
		usage: 'const { copy, copied } = useCopyToClipboard()',
	},
];

export const examples: DocsLinkItem[] = [
	{
		title: 'Contact Form',
		href: 'contact-form',
		description: 'A compact support form using card, label, input, textarea, and button primitives.',
	},
	{
		title: 'Newsletter Card',
		href: 'newsletter-card',
		description: 'A simple marketing capture surface that shows how to stack fields and actions.',
	},
	{
		title: 'Profile Settings',
		href: 'profile-settings',
		description: 'An account settings panel using the same composition rules as product forms.',
	},
];
