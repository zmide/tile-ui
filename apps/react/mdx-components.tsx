import type { ComponentProps } from 'react';
import type { MDXComponents } from 'mdx/types';

import {
	ButtonPreview,
	CardPreview,
	ContactFormPreview,
	CopyToClipboardPreview,
	InputPreview,
	LabelPreview,
	LocalStoragePreview,
	MediaQueryPreview,
	NewsletterCardPreview,
	ProfileSettingsPreview,
	TextareaPreview,
} from '@/components/mdx-previews';

export const mdxComponents: MDXComponents = {
	ButtonPreview,
	CardPreview,
	ContactFormPreview,
	CopyToClipboardPreview,
	InputPreview,
	LabelPreview,
	LocalStoragePreview,
	MediaQueryPreview,
	NewsletterCardPreview,
	ProfileSettingsPreview,
	TextareaPreview,
	a: (props: ComponentProps<'a'>) => <a {...props} />,
	table: (props: ComponentProps<'table'>) => (
		<div className="component-docs-table-wrap">
			<table {...props} />
		</div>
	),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...mdxComponents,
		...components,
	};
}
