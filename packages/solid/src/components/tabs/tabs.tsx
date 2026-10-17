import {
	children,
	createContext,
	createEffect,
	createSignal,
	createUniqueId,
	onCleanup,
	onMount,
	splitProps,
	useContext,
	type Accessor,
	type JSX,
	type ParentProps,
} from 'solid-js';
import { isServer } from 'solid-js/web';
import { getTabsListVariantKey, getTabsState, observeTabsIndicator, tabsStyleKeys } from '@tile-ui/core';
import type { TabsBaseProps, TabsContentBaseProps, TabsListBaseProps, TabsOrientation, TabsTriggerBaseProps } from '@tile-ui/core';
import { createControllableSignal, invokeEventHandler, moveRovingFocus } from '../../utils';
import styles from '@tile-ui/styles/scss/components/tabs.module.scss';

interface TabsEntry {
	element?: HTMLButtonElement;
	value: Accessor<string>;
	id: Accessor<string>;
	disabled: Accessor<boolean>;
}

interface TabsContentEntry {
	value: Accessor<string>;
	id: Accessor<string>;
}

interface TabsContextValue {
	value: Accessor<string>;
	orientation: Accessor<TabsOrientation>;
	ownerId: string;
	defaultTriggerId: (value: string) => string;
	defaultContentId: (value: string) => string;
	triggerId: (value: string) => string;
	contentId: (value: string) => string;
	select: (value: string) => void;
	registerTrigger: (value: Accessor<string>, id: Accessor<string>, disabled: Accessor<boolean>) => TabsEntry;
	registerContent: (value: Accessor<string>, id: Accessor<string>) => TabsContentEntry;
	bind: (entry: TabsEntry, element: HTMLButtonElement) => void;
	unregisterTrigger: (entry: TabsEntry) => void;
	unregisterContent: (entry: TabsContentEntry) => void;
	isTabStop: (entry: TabsEntry) => boolean;
	moveFocus: (element: HTMLButtonElement, event: KeyboardEvent) => void;
}

const TabsContext = createContext<TabsContextValue>();

function useTabs() {
	const context = useContext(TabsContext);
	if (!context) throw new Error('Tabs sub-components must be used within <Tabs>.');
	return context;
}

type CallbackRef<T> = (element: T) => void;

function assignRef<T>(ref: CallbackRef<T> | undefined, element: T) {
	ref?.(element);
}

function getAttribute(tag: string, name: string): string | undefined {
	return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

function setAttribute(tag: string, name: string, value: string): string {
	const pattern = new RegExp(`\\s${name}="[^"]*"`);
	return pattern.test(tag) ? tag.replace(pattern, ` ${name}="${value}"`) : tag.replace(/>$/, ` ${name}="${value}">`);
}

function normalizeServerTabStops(content: JSX.Element, ownerId: string): null {
	if (!isServer) return null;
	const nodes: Array<{ t: string }> = [];
	const visit = (node: unknown): void => {
		if (typeof node === 'function') visit((node as () => unknown)());
		else if (Array.isArray(node)) node.forEach(visit);
		else if (typeof node === 'object' && node !== null && 't' in node && typeof (node as { t?: unknown }).t === 'string') nodes.push(node as { t: string });
	};
	visit(content);
	const triggerPattern = /<button\b[^>]*data-slot="tabs-trigger"[^>]*>/g;
	const panelPattern = /<div\b[^>]*data-slot="tabs-content"[^>]*>/g;
	const triggers = nodes
		.flatMap((node) => Array.from(node.t.matchAll(triggerPattern), (match) => ({ node, tag: match[0] })))
		.filter(({ tag }) => getAttribute(tag, 'data-tabs-owner') === ownerId);
	const panels = nodes
		.flatMap((node) => Array.from(node.t.matchAll(panelPattern), (match) => ({ node, tag: match[0] })))
		.filter(({ tag }) => getAttribute(tag, 'data-tabs-owner') === ownerId);
	const enabled = triggers.filter(({ tag }) => !/\sdisabled(?:=""|(?=[\s>]))/.test(tag));
	const target = enabled.find(({ tag }) => /\saria-selected="true"/.test(tag)) ?? enabled[0];
	for (const node of nodes) {
		const nodeTriggers = triggers.filter((trigger) => trigger.node === node);
		const nodePanels = panels.filter((panel) => panel.node === node);
		let index = 0;
		node.t = node.t.replace(triggerPattern, (tag) => {
			if (getAttribute(tag, 'data-tabs-owner') !== ownerId) return tag;
			const trigger = nodeTriggers[index++];
			const value = getAttribute(tag, 'data-value');
			const panel = panels.find((candidate) => getAttribute(candidate.tag, 'data-value') === value);
			const normalized = panel ? setAttribute(tag, 'aria-controls', getAttribute(panel.tag, 'id') ?? '') : tag;
			return normalized.replace(/\stabIndex="[^"]*"/, ` tabIndex="${trigger === target ? 0 : -1}"`);
		});
		index = 0;
		node.t = node.t.replace(panelPattern, (tag) => {
			if (getAttribute(tag, 'data-tabs-owner') !== ownerId) return tag;
			const panel = nodePanels[index++];
			const value = getAttribute(tag, 'data-value');
			const trigger = triggers.find((candidate) => getAttribute(candidate.tag, 'data-value') === value);
			return trigger ? setAttribute(panel.tag, 'aria-labelledby', getAttribute(trigger.tag, 'id') ?? '') : tag;
		});
	}
	return null;
}

function TabsChildren(props: { children: JSX.Element; ownerId: string }) {
	const content = children(() => props.children);
	normalizeServerTabStops(content(), props.ownerId);
	return content();
}

export interface TabsProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'ref' | 'value'>, TabsBaseProps {
	ref?: CallbackRef<HTMLDivElement>;
}

/** SolidJS Tabs：支持受控/非受控选择、稳定 ARIA 关联与自动激活的 roving focus。 */
export function Tabs(props: ParentProps<TabsProps>) {
	const [local, rest] = splitProps(props, ['value', 'defaultValue', 'onValueChange', 'orientation', 'class', 'children', 'ref']);
	const [value, setValue] = createControllableSignal({
		value: () => local.value,
		defaultValue: () => local.defaultValue ?? '',
		onChange: (next) => local.onValueChange?.(next),
	});
	const baseId = `tile-solid-tabs-${createUniqueId()}`;
	const entries: TabsEntry[] = [];
	const contentEntries: TabsContentEntry[] = [];
	const [entriesVersion, setEntriesVersion] = createSignal(0);
	const orientation = () => local.orientation ?? 'horizontal';
	const idPart = (itemValue: string) => encodeURIComponent(itemValue);
	const defaultTriggerId = (itemValue: string) => `${baseId}-trigger-${idPart(itemValue)}`;
	const defaultContentId = (itemValue: string) => `${baseId}-content-${idPart(itemValue)}`;
	const context: TabsContextValue = {
		value,
		orientation,
		ownerId: baseId,
		defaultTriggerId,
		defaultContentId,
		triggerId: (itemValue) => {
			entriesVersion();
			return entries.find((entry) => entry.value() === itemValue)?.id() ?? defaultTriggerId(itemValue);
		},
		contentId: (itemValue) => {
			entriesVersion();
			return contentEntries.find((entry) => entry.value() === itemValue)?.id() ?? defaultContentId(itemValue);
		},
		select: (itemValue) => setValue(itemValue),
		registerTrigger: (itemValue, id, disabled) => {
			const entry = { value: itemValue, id, disabled };
			entries.push(entry);
			setEntriesVersion((version) => version + 1);
			return entry;
		},
		registerContent: (itemValue, id) => {
			const entry = { value: itemValue, id };
			contentEntries.push(entry);
			setEntriesVersion((version) => version + 1);
			return entry;
		},
		bind: (entry, element) => {
			entry.element = element;
		},
		unregisterTrigger: (entry) => {
			const index = entries.indexOf(entry);
			if (index !== -1) {
				entries.splice(index, 1);
				setEntriesVersion((version) => version + 1);
			}
		},
		unregisterContent: (entry) => {
			const index = contentEntries.indexOf(entry);
			if (index !== -1) {
				contentEntries.splice(index, 1);
				setEntriesVersion((version) => version + 1);
			}
		},
		isTabStop: (entry) => {
			entriesVersion();
			const enabled = entries.filter((candidate) => !candidate.disabled());
			for (const candidate of entries) candidate.disabled();
			return entry === (enabled.find((candidate) => candidate.value() === value()) ?? enabled[0]);
		},
		moveFocus: (element, event) => {
			let intent: 'first' | 'last' | 'next' | 'previous' | undefined;
			if (event.key === 'Home') intent = 'first';
			else if (event.key === 'End') intent = 'last';
			else if ((orientation() === 'horizontal' && event.key === 'ArrowRight') || (orientation() === 'vertical' && event.key === 'ArrowDown')) intent = 'next';
			else if ((orientation() === 'horizontal' && event.key === 'ArrowLeft') || (orientation() === 'vertical' && event.key === 'ArrowUp')) intent = 'previous';
			if (!intent) return;
			event.preventDefault();
			const target = moveRovingFocus(
				entries.flatMap((entry) => (!entry.disabled() && entry.element ? [entry.element] : [])),
				element,
				intent,
			) as HTMLButtonElement | undefined;
			const targetEntry = entries.find((entry) => entry.element === target);
			if (targetEntry) setValue(targetEntry.value());
		},
	};

	return (
		<TabsContext.Provider value={context}>
			<div
				{...rest}
				ref={(element) => assignRef(local.ref, element)}
				data-slot="tabs"
				data-tabs-owner={baseId}
				data-orientation={orientation()}
				class={`${styles[tabsStyleKeys.root]} ${local.class ?? ''}`}>
				<TabsChildren ownerId={baseId}>{local.children}</TabsChildren>
			</div>
		</TabsContext.Provider>
	);
}

export interface TabsListProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'ref'>, TabsListBaseProps {
	ref?: CallbackRef<HTMLDivElement>;
}

export function TabsList(props: ParentProps<TabsListProps>) {
	const context = useTabs();
	const [local, rest] = splitProps(props, ['variant', 'class', 'children', 'onKeyDown', 'ref']);
	const variant = () => local.variant ?? 'default';
	let list: HTMLDivElement | undefined;
	let indicator: HTMLSpanElement | undefined;
	let measurement: ReturnType<typeof observeTabsIndicator> | undefined;
	onMount(() => {
		if (list && indicator) measurement = observeTabsIndicator(list, indicator);
	});
	createEffect(() => {
		context.value();
		context.orientation();
		variant();
		measurement?.update();
	});
	onCleanup(() => measurement?.disconnect());

	return (
		<div
			{...rest}
			ref={(element) => {
				list = element;
				assignRef(local.ref, element);
			}}
			role="tablist"
			aria-orientation={context.orientation()}
			data-slot="tabs-list"
			data-tabs-owner={context.ownerId}
			data-orientation={context.orientation()}
			data-variant={variant()}
			class={`${styles[tabsStyleKeys.list]} ${styles[getTabsListVariantKey(variant())]} ${local.class ?? ''}`}
			onKeyDown={(event) => {
				invokeEventHandler(local.onKeyDown, event);
				if (
					!event.defaultPrevented &&
					event.target instanceof HTMLButtonElement &&
					event.target.getAttribute('role') === 'tab' &&
					event.target.dataset.tabsOwner === context.ownerId
				)
					context.moveFocus(event.target, event);
			}}>
			{local.children}
			<span
				ref={(element) => {
					indicator = element;
				}}
				aria-hidden="true"
				data-slot="tabs-indicator"
				data-state="hidden"
				class={styles.indicator}
			/>
		</div>
	);
}

export interface TabsTriggerProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'ref' | 'value'>, TabsTriggerBaseProps {
	value: string;
	ref?: CallbackRef<HTMLButtonElement>;
}

export function TabsTrigger(props: ParentProps<TabsTriggerProps>) {
	const context = useTabs();
	const [local, rest] = splitProps(props, ['value', 'disabled', 'class', 'children', 'id', 'onClick', 'ref', 'type']);
	const active = () => context.value() === local.value;
	const disabled = () => local.disabled ?? false;
	const triggerId = () => local.id ?? context.defaultTriggerId(local.value);
	const entry = context.registerTrigger(() => local.value, triggerId, disabled);

	onCleanup(() => context.unregisterTrigger(entry));

	return (
		<button
			{...rest}
			ref={(element) => {
				context.bind(entry, element);
				assignRef(local.ref, element);
			}}
			id={triggerId()}
			type={local.type ?? 'button'}
			role="tab"
			aria-selected={active()}
			aria-controls={context.contentId(local.value)}
			data-slot="tabs-trigger"
			data-tabs-owner={context.ownerId}
			data-state={getTabsState(active())}
			data-orientation={context.orientation()}
			data-value={local.value}
			disabled={disabled()}
			tabIndex={context.isTabStop(entry) ? 0 : -1}
			class={`${styles[tabsStyleKeys.trigger]} ${local.class ?? ''}`}
			onClick={(event) => {
				invokeEventHandler(local.onClick, event);
				if (!event.defaultPrevented && !disabled()) context.select(local.value);
			}}>
			{local.children}
		</button>
	);
}

export interface TabsContentProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'ref'>, TabsContentBaseProps {
	value: string;
	ref?: CallbackRef<HTMLDivElement>;
}

export function TabsContent(props: ParentProps<TabsContentProps>) {
	const context = useTabs();
	const [local, rest] = splitProps(props, ['value', 'class', 'children', 'id', 'ref']);
	const active = () => context.value() === local.value;
	const contentId = () => local.id ?? context.defaultContentId(local.value);
	const entry = context.registerContent(() => local.value, contentId);

	onCleanup(() => context.unregisterContent(entry));

	return (
		<div
			{...rest}
			ref={(element) => assignRef(local.ref, element)}
			id={contentId()}
			role="tabpanel"
			aria-labelledby={context.triggerId(local.value)}
			data-slot="tabs-content"
			data-tabs-owner={context.ownerId}
			data-value={local.value}
			data-state={getTabsState(active())}
			data-orientation={context.orientation()}
			hidden={!active()}
			class={`${styles[tabsStyleKeys.content]} ${local.class ?? ''}`}>
			{local.children}
		</div>
	);
}

export default Tabs;
