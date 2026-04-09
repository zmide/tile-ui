'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Children, createContext, isValidElement, useContext, useMemo, useState } from 'react';

import { Button } from '@tile-ui/react';

function cn(...values: Array<string | false | null | undefined>) {
	return values.filter(Boolean).join(' ');
}

type TabsContextValue = {
	value: string;
	setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('Tabs components must be used within <Tabs>.');
	}
	return context;
}

type AccordionContextValue = {
	openItems: string[];
	toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<string | null>(null);

function useAccordionContext() {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error('Accordion components must be used within <Accordion>.');
	}
	return context;
}

function useAccordionItemValue() {
	const value = useContext(AccordionItemContext);
	if (!value) {
		throw new Error('AccordionTrigger and AccordionContent must be used within <AccordionItem>.');
	}
	return value;
}

export function MdxLink({ href = '', className, ...props }: ComponentProps<'a'>) {
	const classes = cn('mdx-link', className);

	if (href.startsWith('/')) {
		return <Link href={href} className={classes} {...props} />;
	}

	return <a href={href} className={classes} {...props} />;
}

export function MdxImage({ className, src, width, height, alt, ...props }: ComponentProps<'img'>) {
	if (!src) {
		return null;
	}

	return <Image className={cn('mdx-image', className)} src={String(src)} width={Number(width) || 1200} height={Number(height) || 630} alt={alt || ''} unoptimized {...props} />;
}

export function Callout({
	title,
	children,
	className,
	variant = 'default',
	...props
}: HTMLAttributes<HTMLDivElement> & {
	title?: ReactNode;
	variant?: 'default' | 'info' | 'warning';
}) {
	return (
		<div className={cn('mdx-callout', className)} data-variant={variant} {...props}>
			{title ? <div className="mdx-callout__title">{title}</div> : null}
			<div className="mdx-callout__body">{children}</div>
		</div>
	);
}

export function Steps({ className, ...props }: ComponentProps<'div'>) {
	return <div className={cn('mdx-steps', className)} {...props} />;
}

export function Step({ className, ...props }: ComponentProps<'h3'>) {
	return <h3 className={cn('mdx-step', className)} {...props} />;
}

type TabsTriggerElement = ReactElement<{ value?: string }>;

export function Tabs({
	className,
	defaultValue,
	value,
	onValueChange,
	children,
	...props
}: ComponentProps<'div'> & {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
}) {
	const triggerValues = useMemo(() => {
		const values: string[] = [];
		Children.forEach(children, (child) => {
			if (!isValidElement<{ children?: ReactNode }>(child)) return;
			Children.forEach(child.props.children, (nestedChild) => {
				if (isValidElement<{ value?: string }>(nestedChild) && typeof (nestedChild as TabsTriggerElement).props.value === 'string') {
					values.push((nestedChild as TabsTriggerElement).props.value as string);
				}
			});
		});
		return values;
	}, [children]);

	const [internalValue, setInternalValue] = useState(defaultValue ?? triggerValues[0] ?? '');
	const activeValue = value ?? internalValue;

	return (
		<TabsContext.Provider
			value={{
				value: activeValue,
				setValue: (nextValue) => {
					setInternalValue(nextValue);
					onValueChange?.(nextValue);
				},
			}}>
			<div className={cn('mdx-tabs', className)} {...props}>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

export function TabsList({ className, ...props }: ComponentProps<'div'>) {
	return <div className={cn('mdx-tabs__list', className)} role="tablist" {...props} />;
}

export function TabsTrigger({ className, value, children, ...props }: ComponentProps<'button'> & { value: string }) {
	const { value: activeValue, setValue } = useTabsContext();
	const active = activeValue === value;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={active}
			data-state={active ? 'active' : 'inactive'}
			className={cn('mdx-tabs__trigger', className)}
			onClick={() => setValue(value)}
			{...props}>
			{children}
		</button>
	);
}

export function TabsContent({ className, value, children, ...props }: ComponentProps<'div'> & { value: string }) {
	const { value: activeValue } = useTabsContext();
	if (activeValue !== value) return null;

	return (
		<div className={cn('mdx-tabs__content', className)} role="tabpanel" data-state="active" {...props}>
			{children}
		</div>
	);
}

export function Tab({ className, ...props }: ComponentProps<'div'>) {
	return <div className={className} {...props} />;
}

export function Accordion({ className, children, ...props }: ComponentProps<'div'>) {
	const [openItems, setOpenItems] = useState<string[]>([]);

	return (
		<AccordionContext.Provider
			value={{
				openItems,
				toggleItem: (value) => {
					setOpenItems((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
				},
			}}>
			<div className={cn('mdx-accordion', className)} {...props}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
}

export function AccordionItem({ className, value, children, ...props }: ComponentProps<'div'> & { value: string }) {
	return (
		<AccordionItemContext.Provider value={value}>
			<div className={cn('mdx-accordion__item', className)} {...props}>
				{children}
			</div>
		</AccordionItemContext.Provider>
	);
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<'button'>) {
	const itemValue = useAccordionItemValue();
	const { openItems, toggleItem } = useAccordionContext();
	const open = openItems.includes(itemValue);

	return (
		<button
			type="button"
			className={cn('mdx-accordion__trigger', className)}
			data-state={open ? 'open' : 'closed'}
			aria-expanded={open}
			onClick={() => toggleItem(itemValue)}
			{...props}>
			<span>{children}</span>
			<span aria-hidden="true">{open ? '-' : '+'}</span>
		</button>
	);
}

export function AccordionContent({ className, children, ...props }: ComponentProps<'div'>) {
	const itemValue = useAccordionItemValue();
	const { openItems } = useAccordionContext();
	if (!openItems.includes(itemValue)) return null;

	return (
		<div className={cn('mdx-accordion__content', className)} data-state="open" {...props}>
			{children}
		</div>
	);
}

export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
	return <kbd className={cn('mdx-kbd', className)} {...props} />;
}

export { Button };
