import type { ComponentPropsWithoutRef } from 'react';
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
	a: (props: ComponentPropsWithoutRef<'a'>) => <MdxLink {...props} />,
	p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mdx-p" {...props} />,
	strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong className="mdx-strong" {...props} />,
	ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="mdx-ul" {...props} />,
	ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="mdx-ol" {...props} />,
	li: (props: ComponentPropsWithoutRef<'li'>) => <li className="mdx-li" {...props} />,
	blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => <blockquote className="mdx-blockquote" {...props} />,
	hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr className="mdx-hr" {...props} />,
	img: (props: ComponentPropsWithoutRef<'img'>) => <MdxImage {...props} />,
	Image: (props: ComponentPropsWithoutRef<'img'>) => <MdxImage {...props} />,
	table: (props: ComponentPropsWithoutRef<'table'>) => <table {...props} />,
	tr: (props: ComponentPropsWithoutRef<'tr'>) => <tr className="mdx-tr" {...props} />,
	th: (props: ComponentPropsWithoutRef<'th'>) => <th className="mdx-th" {...props} />,
	td: (props: ComponentPropsWithoutRef<'td'>) => <td className="mdx-td" {...props} />,
	pre: (props: ComponentPropsWithoutRef<'pre'>) => <pre className="mdx-pre" {...props} />,
	code: (props: ComponentPropsWithoutRef<'code'>) => {
		if (typeof props.children === 'string') {
			return <code className="mdx-inline-code" {...props} />;
		}
		return <code {...props} />;
	},
	figure: (props: ComponentPropsWithoutRef<'figure'>) => <figure className="mdx-figure" {...props} />,
	figcaption: (props: ComponentPropsWithoutRef<'figcaption'>) => <figcaption className="mdx-figcaption" {...props} />,
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
