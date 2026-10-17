import { createApp, defineComponent, h, onMounted } from 'vue';
import {
	Button,
	Input,
	Checkbox,
	Switch,
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	Toaster,
	toast,
	ChartContainer,
	Liveline,
} from '@tile-ui/vue';
import { sizes, variants, chartConfig, chartData, chartSeries, liveOptions, exposeFixture } from './data';

// Keep the panel in h(); Vite separately compiles JSX in the Vue Liveline sources.
const component = (type, props = {}, children = []) => h(type, props, { default: () => (typeof children === 'string' ? children : children) });
const element = (tag, props, children) => h(tag, props, children);
const section = (title, children, id?) => element('section', { class: 'fixture-section', 'data-fixture': id }, [element('h2', {}, title), ...children]);
const row = (children) => element('div', { class: 'fixture-row' }, children);
const field = (id, props) => element('div', { class: 'fixture-field', 'data-fixture': id }, [component(Input, props)]);

const Panel = defineComponent({
	setup() {
		onMounted(() => exposeFixture('vue', toast));
		return () =>
			element('article', { class: 'fixture-panel', 'data-fixture': 'panel' }, [
				section('Button sizes', [
					row(
						sizes.map((size) =>
							element('span', { 'data-fixture': `button-${size}` }, [
								component(Button, { size, 'aria-label': `Button ${size}` }, size.startsWith('icon') ? '+' : 'Button'),
							]),
						),
					),
				]),
				section('Button variants', [
					row([
						...variants.map((variant) => element('span', { 'data-fixture': `variant-${variant}` }, [component(Button, { variant }, 'Button')])),
						element('span', { 'data-fixture': 'disabled' }, [component(Button, { disabled: true }, 'Disabled')]),
					]),
				]),
				section('Form controls', [
					row([
						field('input', { label: 'Project name', defaultValue: 'Stable selection' }),
						element('span', { 'data-fixture': 'checkbox' }, [component(Checkbox, { 'aria-label': 'Enable notifications' })]),
						element('span', { 'data-fixture': 'switch' }, [component(Switch, { 'aria-label': 'Automatic updates' })]),
					]),
				]),
				section(
					'Tabs',
					[
						component(Tabs, { defaultValue: 'overview' }, [
							component(TabsList, {}, [component(TabsTrigger, { value: 'overview' }, 'Overview'), component(TabsTrigger, { value: 'analytics' }, 'Analytics')]),
							component(TabsContent, { value: 'overview' }, 'Overview content'),
							component(TabsContent, { value: 'analytics' }, 'Analytics content'),
						]),
					],
					'tabs',
				),
				section('Floating surfaces', [
					row([
						component(Dialog, {}, [
							component(DialogTrigger, { 'data-fixture': 'dialog-trigger' }, 'Open dialog'),
							component(DialogContent, { 'data-fixture': 'dialog-content' }, [
								component(DialogTitle, {}, 'Project settings'),
								component(DialogDescription, {}, 'Portal inherits the document theme.'),
								field('dialog-input', { label: 'Dialog project', defaultValue: 'Portal selection' }),
							]),
						]),
						element('div', { 'data-fixture': 'select' }, [
							component(Select, { defaultValue: 'alpha' }, [
								component(SelectTrigger, { 'aria-label': 'Project' }, [component(SelectValue, { placeholder: 'Choose project' })]),
								component(SelectContent, { 'data-fixture': 'select-content' }, [
									component(SelectItem, { value: 'alpha' }, 'Alpha'),
									component(SelectItem, { value: 'beta' }, 'Beta'),
								]),
							]),
						]),
						component(Tooltip, {}, [
							component(TooltipTrigger, { 'data-fixture': 'tooltip-trigger' }, 'Theme information'),
							component(TooltipContent, { 'data-fixture': 'tooltip-content', side: 'bottom' }, 'Theme follows the root'),
						]),
						component(Button, { 'data-fixture': 'toast-trigger', onClick: () => window.__themeFixture.showToast() }, 'Show toast'),
					]),
				]),
				element('section', { class: 'fixture-plots' }, [
					element('div', { class: 'fixture-plot', 'data-fixture': 'chart' }, [
						component(ChartContainer, {
							config: chartConfig,
							data: chartData,
							series: chartSeries,
							initialDimension: { width: 528, height: 220 },
							title: 'Weekly requests',
						}),
					]),
					element('div', { class: 'fixture-plot', 'data-fixture': 'liveline' }, [
						component(Liveline, { ...liveOptions, style: { width: '100%', height: '240px' }, 'aria-label': 'Live requests' }),
					]),
				]),
				component(Toaster),
			]);
	},
});

createApp(Panel).mount('#fixture-root');
