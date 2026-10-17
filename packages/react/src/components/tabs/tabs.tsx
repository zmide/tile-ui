import React, { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { getTabsListVariantKey, getTabsState, observeTabsIndicator, tabsStyleKeys } from '@tile-ui/core';
import type { TabsBaseProps, TabsListBaseProps, TabsTriggerBaseProps, TabsContentBaseProps } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/tabs.module.scss';

interface TabsContextValue {
	value: string;
	orientation: 'horizontal' | 'vertical';
	baseId: string;
	select: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function useTabsContext(): TabsContextValue {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('Tabs sub-components must be used within <Tabs>.');
	}
	return context;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue'>, TabsBaseProps {}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ className = '', value, defaultValue = '', orientation = 'horizontal', onValueChange, children, ...props }, ref) => {
	const [internalValue, setInternalValue] = useState(defaultValue);
	const currentValue = value !== undefined ? value : internalValue;
	const baseId = useId();

	function select(next: string) {
		if (value === undefined) {
			setInternalValue(next);
		}
		onValueChange?.(next);
	}

	return (
		<TabsContext.Provider value={{ value: currentValue, orientation, baseId, select }}>
			<div ref={ref} data-orientation={orientation} className={`${styles[tabsStyleKeys.root]} ${className}`} {...props}>
				{children}
			</div>
		</TabsContext.Provider>
	);
});
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement>, TabsListBaseProps {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className = '', variant = 'default', children, onKeyDown, ...props }, ref) => {
	const context = useTabsContext();
	const variantKey = getTabsListVariantKey(variant);
	const isVertical = context.orientation === 'vertical';
	const listRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLSpanElement>(null);
	const measurement = useRef<ReturnType<typeof observeTabsIndicator> | null>(null);

	useBrowserLayoutEffect(() => {
		if (!listRef.current || !indicatorRef.current) return;
		const observer = observeTabsIndicator(listRef.current, indicatorRef.current);
		measurement.current = observer;
		return () => {
			observer.disconnect();
			measurement.current = null;
		};
	}, []);
	useBrowserLayoutEffect(() => measurement.current?.update());

	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
		onKeyDown?.(event);

		const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
		const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
		const isNext = event.key === nextKey;
		const isPrev = event.key === prevKey;
		const isHome = event.key === 'Home';
		const isEnd = event.key === 'End';

		if (!isNext && !isPrev && !isHome && !isEnd) {
			return;
		}

		const triggers = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button[role="tab"]')).filter((trigger) => !trigger.disabled);

		if (triggers.length === 0) {
			return;
		}

		const currentIndex = triggers.indexOf(document.activeElement as HTMLButtonElement);
		let nextIndex: number;
		if (isHome) {
			nextIndex = 0;
		} else if (isEnd) {
			nextIndex = triggers.length - 1;
		} else {
			const direction = isNext ? 1 : -1;
			nextIndex = (currentIndex + direction + triggers.length) % triggers.length;
		}

		const nextTrigger = triggers[nextIndex];
		nextTrigger?.focus();

		// 自动激活：方向键移动焦点时同步选中对应标签页。
		const nextValue = nextTrigger?.getAttribute('data-value');
		if (nextValue !== null && nextValue !== undefined) {
			context.select(nextValue);
		}

		event.preventDefault();
	}

	return (
		<div
			ref={(element) => {
				listRef.current = element;
				if (typeof ref === 'function') return ref(element);
				if (ref) ref.current = element;
			}}
			role="tablist"
			data-orientation={context.orientation}
			data-variant={variant}
			onKeyDown={handleKeyDown}
			className={`${styles[tabsStyleKeys.list]} ${styles[variantKey]} ${className}`}
			{...props}>
			{children}
			<span ref={indicatorRef} aria-hidden="true" data-slot="tabs-indicator" data-state="hidden" className={styles.indicator} />
		</div>
	);
});
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'>, TabsTriggerBaseProps {
	value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(({ className = '', value, disabled = false, children, onClick, ...props }, ref) => {
	const context = useTabsContext();
	const active = context.value === value;
	const state = getTabsState(active);
	const triggerId = `${context.baseId}-trigger-${value}`;
	const contentId = `${context.baseId}-content-${value}`;

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		context.select(value);
		onClick?.(event);
	}

	return (
		<button
			ref={ref}
			type="button"
			id={triggerId}
			role="tab"
			aria-selected={active}
			aria-controls={contentId}
			data-value={value}
			tabIndex={active ? 0 : -1}
			disabled={disabled}
			data-state={state}
			data-orientation={context.orientation}
			className={`${styles[tabsStyleKeys.trigger]} ${className}`}
			onClick={handleClick}
			{...props}>
			{children}
		</button>
	);
});
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement>, TabsContentBaseProps {
	value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className = '', value, children, ...props }, ref) => {
	const context = useTabsContext();
	const active = context.value === value;
	const state = getTabsState(active);
	const triggerId = `${context.baseId}-trigger-${value}`;
	const contentId = `${context.baseId}-content-${value}`;

	return (
		<div
			{...props}
			ref={ref}
			id={contentId}
			role="tabpanel"
			aria-labelledby={triggerId}
			data-state={state}
			data-orientation={context.orientation}
			hidden={!active}
			className={`${styles[tabsStyleKeys.content]} ${className}`}>
			{children}
		</div>
	);
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;
