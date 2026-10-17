import { computed, defineComponent, h, inject, onBeforeUnmount, onMounted, onUpdated, provide, ref, useId, type ComputedRef, type InjectionKey, type PropType } from 'vue';
import { getTabsListVariantKey, getTabsState, observeTabsIndicator, tabsStyleKeys } from '@tile-ui/core';
import type { TabsListVariant, TabsOrientation } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/tabs.module.scss';

interface TabsContextValue {
	value: string;
	orientation: TabsOrientation;
	baseId: string;
	select: (value: string) => void;
}

type TabsContext = ComputedRef<TabsContextValue>;

const TabsContextKey: InjectionKey<TabsContext> = Symbol('tile-tabs');

export const Tabs = defineComponent({
	name: 'Tabs',
	props: {
		modelValue: { type: String, default: undefined },
		defaultValue: { type: String, default: '' },
		orientation: {
			type: String as PropType<TabsOrientation>,
			default: 'horizontal',
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { emit, slots }) {
		const internalValue = ref(props.defaultValue);
		const currentValue = computed(() => (props.modelValue !== undefined ? props.modelValue : internalValue.value));
		const baseId = useId();

		const context = computed<TabsContextValue>(() => ({
			value: currentValue.value,
			orientation: props.orientation,
			baseId,
			select: (next: string) => {
				if (props.modelValue === undefined) {
					internalValue.value = next;
				}
				emit('update:modelValue', next);
				emit('change', next);
			},
		}));

		provide(TabsContextKey, context);

		return () => h('div', { class: styles[tabsStyleKeys.root], 'data-orientation': props.orientation }, slots.default?.());
	},
});

export const TabsList = defineComponent({
	name: 'TabsList',
	props: {
		variant: {
			type: String as PropType<TabsListVariant>,
			default: 'default',
		},
	},
	setup(props, { slots }) {
		const context = inject(TabsContextKey);
		if (!context) {
			throw new Error('TabsList must be used within <Tabs>.');
		}

		const variantKey = computed(() => getTabsListVariantKey(props.variant));
		const isVertical = computed(() => context!.value.orientation === 'vertical');
		const listRef = ref<HTMLDivElement>();
		const indicatorRef = ref<HTMLSpanElement>();
		let measurement: ReturnType<typeof observeTabsIndicator> | undefined;
		onMounted(() => {
			if (listRef.value && indicatorRef.value) measurement = observeTabsIndicator(listRef.value, indicatorRef.value);
		});
		onUpdated(() => measurement?.update());
		onBeforeUnmount(() => measurement?.disconnect());

		function handleKeydown(event: KeyboardEvent) {
			const nextKey = isVertical.value ? 'ArrowDown' : 'ArrowRight';
			const prevKey = isVertical.value ? 'ArrowUp' : 'ArrowLeft';
			const isNext = event.key === nextKey;
			const isPrev = event.key === prevKey;
			const isHome = event.key === 'Home';
			const isEnd = event.key === 'End';

			if (!isNext && !isPrev && !isHome && !isEnd) {
				return;
			}

			const triggers = Array.from((event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('button[role="tab"]')).filter((trigger) => !trigger.disabled);

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

			const nextValue = nextTrigger?.getAttribute('data-value');
			if (nextValue !== null && nextValue !== undefined) {
				context!.value.select(nextValue);
			}

			event.preventDefault();
		}

		return () =>
			h(
				'div',
				{
					ref: listRef,
					class: [styles[tabsStyleKeys.list], styles[variantKey.value]],
					role: 'tablist',
					'data-orientation': context.value.orientation,
					'data-variant': props.variant,
					onKeydown: handleKeydown,
				},
				[slots.default?.(), h('span', { ref: indicatorRef, 'aria-hidden': 'true', 'data-slot': 'tabs-indicator', 'data-state': 'hidden', class: styles.indicator })],
			);
	},
});

export const TabsTrigger = defineComponent({
	name: 'TabsTrigger',
	props: {
		value: { type: String, required: true },
		disabled: { type: Boolean, default: false },
	},
	setup(props, { slots }) {
		const context = inject(TabsContextKey);
		if (!context) {
			throw new Error('TabsTrigger must be used within <Tabs>.');
		}

		const active = computed(() => context.value.value === props.value);
		const state = computed(() => getTabsState(active.value));
		const triggerId = computed(() => `${context.value.baseId}-trigger-${props.value}`);
		const contentId = computed(() => `${context.value.baseId}-content-${props.value}`);

		return () =>
			h(
				'button',
				{
					type: 'button',
					id: triggerId.value,
					role: 'tab',
					'aria-selected': active.value,
					'aria-controls': contentId.value,
					'data-value': props.value,
					tabindex: active.value ? 0 : -1,
					disabled: props.disabled,
					'data-state': state.value,
					'data-orientation': context.value.orientation,
					class: styles[tabsStyleKeys.trigger],
					onClick: () => context.value.select(props.value),
				},
				slots.default?.(),
			);
	},
});

export const TabsContent = defineComponent({
	name: 'TabsContent',
	props: {
		value: { type: String, required: true },
	},
	setup(props, { slots }) {
		const context = inject(TabsContextKey);
		if (!context) {
			throw new Error('TabsContent must be used within <Tabs>.');
		}

		const active = computed(() => context.value.value === props.value);
		const state = computed(() => getTabsState(active.value));
		const contentId = computed(() => `${context.value.baseId}-content-${props.value}`);
		const triggerId = computed(() => `${context.value.baseId}-trigger-${props.value}`);

		return () =>
			h(
				'div',
				{
					id: contentId.value,
					role: 'tabpanel',
					'aria-labelledby': triggerId.value,
					'data-state': state.value,
					'data-orientation': context.value.orientation,
					hidden: !active.value,
					class: styles[tabsStyleKeys.content],
				},
				slots.default?.(),
			);
	},
});

export default Tabs;
