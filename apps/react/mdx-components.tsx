import type { ComponentProps } from 'react';
import type { MDXComponents } from 'mdx/types';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Callout,
	Kbd,
	MdxImage,
	MdxLink,
	Step,
	Steps,
	Tab,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/mdx-blocks';
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
	a: (props: ComponentProps<'a'>) => <MdxLink {...props} />,
	p: (props: ComponentProps<'p'>) => <p className="mdx-p" {...props} />,
	strong: (props: ComponentProps<'strong'>) => <strong className="mdx-strong" {...props} />,
	ul: (props: ComponentProps<'ul'>) => <ul className="mdx-ul" {...props} />,
	ol: (props: ComponentProps<'ol'>) => <ol className="mdx-ol" {...props} />,
	li: (props: ComponentProps<'li'>) => <li className="mdx-li" {...props} />,
	blockquote: (props: ComponentProps<'blockquote'>) => <blockquote className="mdx-blockquote" {...props} />,
	hr: (props: ComponentProps<'hr'>) => <hr className="mdx-hr" {...props} />,
	img: (props: ComponentProps<'img'>) => <MdxImage {...props} />,
	Image: (props: ComponentProps<'img'>) => <MdxImage {...props} />,
	table: (props: ComponentProps<'table'>) => <table {...props} />,
	tr: (props: ComponentProps<'tr'>) => <tr className="mdx-tr" {...props} />,
	th: (props: ComponentProps<'th'>) => <th className="mdx-th" {...props} />,
	td: (props: ComponentProps<'td'>) => <td className="mdx-td" {...props} />,
	pre: (props: ComponentProps<'pre'>) => <pre className="mdx-pre" {...props} />,
	code: (props: ComponentProps<'code'>) => {
		if (typeof props.children === 'string') {
			return <code className="mdx-inline-code" {...props} />;
		}
		return <code {...props} />;
	},
	figure: (props: ComponentProps<'figure'>) => <figure className="mdx-figure" {...props} />,
	figcaption: (props: ComponentProps<'figcaption'>) => <figcaption className="mdx-figcaption" {...props} />,
	Button,
	Callout,
	Step,
	Steps,
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	Tab,
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	Kbd,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...mdxComponents,
		...components,
	};
}
