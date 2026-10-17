import React from 'react';
import { createRoot } from 'react-dom/client';
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
} from '@tile-ui/react';
import { sizes, variants, chartConfig, chartData, chartSeries, liveOptions, exposeFixture } from './data';

function Panel() {
	React.useEffect(() => exposeFixture('react', toast), []);
	return (
		<article className="fixture-panel" data-fixture="panel">
			<section className="fixture-section">
				<h2>Button sizes</h2>
				<div className="fixture-row">
					{sizes.map((size) => (
						<span key={size} data-fixture={`button-${size}`}>
							<Button size={size} aria-label={`Button ${size}`}>
								{size.startsWith('icon') ? '+' : 'Button'}
							</Button>
						</span>
					))}
				</div>
			</section>
			<section className="fixture-section">
				<h2>Button variants</h2>
				<div className="fixture-row">
					{variants.map((variant) => (
						<span key={variant} data-fixture={`variant-${variant}`}>
							<Button variant={variant}>Button</Button>
						</span>
					))}
					<span data-fixture="disabled">
						<Button disabled>Disabled</Button>
					</span>
				</div>
			</section>
			<section className="fixture-section">
				<h2>Form controls</h2>
				<div className="fixture-row">
					<div className="fixture-field" data-fixture="input">
						<Input label="Project name" defaultValue="Stable selection" />
					</div>
					<span data-fixture="checkbox">
						<Checkbox aria-label="Enable notifications" />
					</span>
					<span data-fixture="switch">
						<Switch aria-label="Automatic updates" />
					</span>
				</div>
			</section>
			<section className="fixture-section" data-fixture="tabs">
				<h2>Tabs</h2>
				<Tabs defaultValue="overview">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
					</TabsList>
					<TabsContent value="overview">Overview content</TabsContent>
					<TabsContent value="analytics">Analytics content</TabsContent>
				</Tabs>
			</section>
			<section className="fixture-section">
				<h2>Floating surfaces</h2>
				<div className="fixture-row">
					<Dialog>
						<DialogTrigger data-fixture="dialog-trigger">Open dialog</DialogTrigger>
						<DialogContent data-fixture="dialog-content">
							<DialogTitle>Project settings</DialogTitle>
							<DialogDescription>Portal inherits the document theme.</DialogDescription>
							<div data-fixture="dialog-input">
								<Input label="Dialog project" defaultValue="Portal selection" />
							</div>
						</DialogContent>
					</Dialog>
					<div data-fixture="select">
						<Select defaultValue="alpha">
							<SelectTrigger aria-label="Project">
								<SelectValue placeholder="Choose project" />
							</SelectTrigger>
							<SelectContent data-fixture="select-content">
								<SelectItem value="alpha">Alpha</SelectItem>
								<SelectItem value="beta">Beta</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Tooltip>
						<TooltipTrigger data-fixture="tooltip-trigger">Theme information</TooltipTrigger>
						<TooltipContent data-fixture="tooltip-content" side="bottom">
							Theme follows the root
						</TooltipContent>
					</Tooltip>
					<Button data-fixture="toast-trigger" onClick={() => window.__themeFixture.showToast()}>
						Show toast
					</Button>
				</div>
			</section>
			<section className="fixture-plots">
				<div className="fixture-plot" data-fixture="chart">
					<ChartContainer config={chartConfig} data={chartData} series={chartSeries} initialDimension={{ width: 528, height: 220 }} title="Weekly requests" />
				</div>
				<div className="fixture-plot" data-fixture="liveline">
					<Liveline {...liveOptions} style={{ width: '100%', height: 240 }} aria-label="Live requests" />
				</div>
			</section>
			<Toaster />
		</article>
	);
}

createRoot(document.getElementById('fixture-root')!).render(<Panel />);
