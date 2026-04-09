declare module 'markdown-it' {
	export interface MarkdownItOptions {
		html?: boolean;
		linkify?: boolean;
		typographer?: boolean;
	}

	export default class MarkdownIt {
		constructor(options?: MarkdownItOptions);
		use(plugin: (...args: any[]) => any, ...params: any[]): this;
		render(markdown: string): string;
	}
}

declare module '@tile-ui/styles/scss/components/button.module.scss' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module '@tile-ui/styles/scss/components/input.module.scss' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module '@tile-ui/styles/scss/components/textarea.module.scss' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module '@tile-ui/styles/scss/components/label.module.scss' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module '@tile-ui/styles/scss/components/card.module.scss' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare const NuxtLink: any;
declare const NuxtPage: any;
declare function defineNuxtConfig(config: Record<string, unknown>): Record<string, unknown>;
declare function useRoute(): {
	params: Record<string, string | string[] | undefined>;
	fullPath: string;
};
declare function useAsyncData<T>(
	key: string,
	handler: () => Promise<T> | T,
	options?: { watch?: Array<() => unknown> },
): Promise<{ data: { value: T | null }; error: { value: unknown } }>;
declare function $fetch<T>(input: string): Promise<T>;
declare function createError(input: { statusCode: number; statusMessage: string }): Error;
declare function defineEventHandler<T>(handler: (event: unknown) => T): (event: unknown) => T;
declare function getRouterParam(event: unknown, name: string): string | undefined;
