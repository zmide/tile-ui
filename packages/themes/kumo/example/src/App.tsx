import { defineComponent, ref, type VNodeChild } from 'vue';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	Alert,
	AlertTitle,
	AlertDescription,
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
	Avatar,
	AvatarFallback,
	Badge,
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
	Button,
	ButtonGroup,
	Calendar,
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	ChartContainer,
	Checkbox,
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
	Combobox,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	Kbd,
	Label,
	NativeSelect,
	NativeSelectOption,
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Progress,
	RadioGroup,
	RadioGroupItem,
	ScrollArea,
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Separator,
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	Skeleton,
	Slider,
	SliderTrack,
	SliderRange,
	SliderThumb,
	Spinner,
	Switch,
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	Textarea,
	Toaster,
	toast,
	Toggle,
	ToggleGroup,
	ToggleGroupItem,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@tile-ui/vue';

const sections = [
	['basics', 'Basics & actions'],
	['forms', 'Forms & selection'],
	['data', 'Data & display'],
	['overlays', 'Overlays & feedback'],
	['setup', 'Get started'],
] as const;

function Panel(props: { title: string; description?: string }, { slots }: { slots: { default?: () => VNodeChild } }) {
	return (
		<Card class="demo-card">
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
				{props.description && <CardDescription>{props.description}</CardDescription>}
			</CardHeader>
			<CardContent class="demo-content stack">{slots.default?.()}</CardContent>
		</Card>
	);
}

export default defineComponent({
	name: 'KumoPlayground',
	setup() {
		const dark = ref(document.documentElement.dataset.theme === 'dark');
		const project = ref('kumo-studio');
		const previews = ref(true);
		const budget = ref(64);
		const page = ref(1);
		const projects = [
			{ name: 'Marketing website', domain: 'studio.example.com', state: 'Ready', traffic: '24,806' },
			{ name: 'Dashboard', domain: 'app.example.com', state: 'Building', traffic: '18,420' },
			{ name: 'Documentation', domain: 'docs.example.com', state: 'Ready', traffic: '12,093' },
			{ name: 'API gateway', domain: 'api.example.com', state: 'Ready', traffic: '8,512' },
		];
		function setMode(value: boolean) {
			dark.value = value;
			document.documentElement.dataset.theme = value ? 'dark' : 'light';
			try {
				localStorage.setItem('kumo-example-mode', value ? 'dark' : 'light');
			} catch {
				/* Storage may be unavailable in private contexts. */
			}
		}
		return () => (
			<>
				<a class="skip-link" href="#main">
					Skip to components
				</a>
				<header class="site-header">
					<a class="brand" href="#">
						<span class="brand-mark" aria-hidden="true">
							k.
						</span>
						<span>
							Kumo<span class="brand-sub"> / Tile UI</span>
						</span>
					</a>
					<div class="row">
						<span class="mode-label">Dark mode</span>
						<Switch aria-label="Dark mode" modelValue={dark.value} onUpdate:modelValue={setMode} />
					</div>
				</header>
				<div class="page-layout">
					<aside class="sidebar">
						<p class="eyebrow">PLAYGROUND / 01</p>
						<nav aria-label="Component sections">
							{sections.map(([id, label], i) => (
								<a href={`#${id}`}>
									<span>0{i + 1}</span>
									{label}
								</a>
							))}
						</nav>
						<div class="sidebar-note">
							<Badge variant="secondary">Every detail, considered</Badge>
							<p>
								One theme.
								<br />
								Familiar components.
								<br />
								Light or dark.
							</p>
							<a href="https://vue.tileui.zmorg.cn/docs/themes/kumo">Read the theme guide ↗</a>
						</div>
					</aside>
					<main id="main">
						<section class="hero">
							<div class="row">
								<span class="status-dot" />
								<p class="eyebrow">THE EVERYDAY INTERFACE</p>
								<Badge variant="outline">Interactive demo</Badge>
							</div>
							<h1>
								A fresh look.
								<br />
								<span>The same building blocks.</span>
							</h1>
							<p class="hero-description">Explore Kumo through real Tile UI components. Try a form, open an overlay, and switch between light and dark.</p>
							<div class="row">
								<Button class="" {...{ onClick: () => document.getElementById('basics')?.scrollIntoView({ behavior: 'smooth' }) }}>
									Explore components ↓
								</Button>
								<a class="text-link" href="#setup">
									Just two style imports ↗
								</a>
							</div>
							<div class="hero-strip">
								<span>Refined everyday components</span>
								<Separator orientation="vertical" />
								<span>Light & dark, together</span>
								<Separator orientation="vertical" />
								<span>Make it your own</span>
							</div>
						</section>

						<section id="basics" class="section">
							<div class="section-heading">
								<span class="section-number">01</span>
								<div>
									<h2>Basics & actions</h2>
									<p>Explore everyday states and visual hierarchy, from actions to layout.</p>
								</div>
							</div>
							<div class="grid">
								<Panel title="Buttons & states" description="Click a button to see feedback.">
									<div class="wrap">
										{(['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const).map((variant) => (
											<Button variant={variant} class="" {...{ onClick: () => toast(`Clicked ${variant}`) }}>
												{variant}
											</Button>
										))}
									</div>
									<Separator />
									<div class="wrap">
										<Button size="sm">Small</Button>
										<Button>Default</Button>
										<Button size="lg">Large</Button>
										<Button disabled>Disabled</Button>
									</div>
									<ButtonGroup>
										<Button variant="outline" class="" {...{ onClick: () => toast('Draft saved') }}>
											Save draft
										</Button>
										<Button class="" {...{ onClick: () => toast.success('Published successfully') }}>
											Publish project
										</Button>
									</ButtonGroup>
								</Panel>
								<Panel title="Labels & identity" description="Status, user identity, and lightweight view controls.">
									<div class="wrap">
										{(['default', 'secondary', 'outline', 'destructive'] as const).map((variant) => (
											<Badge variant={variant}>{variant}</Badge>
										))}
									</div>
									<div class="row">
										<Avatar>
											<AvatarFallback>YM</AvatarFallback>
										</Avatar>
										<div>
											<strong>Yun Ming</strong>
											<p class="muted">Workspace owner</p>
										</div>
										<Kbd>⌘ K</Kbd>
									</div>
									<div class="wrap">
										<Toggle aria-label="Bold">B</Toggle>
										<ToggleGroup type="single" defaultValue="grid">
											<ToggleGroupItem value="grid">Grid</ToggleGroupItem>
											<ToggleGroupItem value="list">List</ToggleGroupItem>
										</ToggleGroup>
									</div>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#">Workspace</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage>Overview</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</Panel>
								<Card class="demo-card">
									<CardHeader>
										<CardTitle>A working project card</CardTitle>
										<CardDescription>Clear hierarchy, subtle surfaces, and actions that stand out.</CardDescription>
									</CardHeader>
									<CardContent class="demo-content stack">
										<div class="row spread">
											<strong>Preview deployments</strong>
											<Switch aria-label="Preview deployments" modelValue={previews.value} onUpdate:modelValue={(v: boolean) => (previews.value = v)} />
										</div>
										<p class="muted">{previews.value ? 'Build a preview for every commit.' : 'Preview deployments are paused.'}</p>
										<Progress value={budget.value} aria-label="Build progress" />
										<p class="muted">Build progress {budget.value}%</p>
									</CardContent>
									<CardFooter>
										<Button
											class=""
											{...{
												onClick: () => {
													budget.value = 100;
													toast.success('Deployment complete');
												},
											}}>
											Complete deployment
										</Button>
									</CardFooter>
								</Card>
								<Panel title="Tabs & disclosure">
									<Tabs defaultValue="overview">
										<TabsList>
											<TabsTrigger value="overview">Overview</TabsTrigger>
											<TabsTrigger value="activity">Activity</TabsTrigger>
											<TabsTrigger value="disabled" disabled>
												Archived
											</TabsTrigger>
										</TabsList>
										<TabsContent value="overview">
											<p class="muted">Your workspace is healthy. All projects are in sync.</p>
										</TabsContent>
										<TabsContent value="activity">
											<p class="muted">A new preview was published just now.</p>
										</TabsContent>
									</Tabs>
									<Accordion type="single" collapsible defaultValue="one">
										<AccordionItem value="one">
											<AccordionTrigger>Does the whole interface follow dark mode?</AccordionTrigger>
											<AccordionContent>Yes. Forms, charts, menus, and dialogs share one coordinated light and dark palette.</AccordionContent>
										</AccordionItem>
										<AccordionItem value="two">
											<AccordionTrigger>Can I customize the appearance?</AccordionTrigger>
											<AccordionContent>Yes. Adjust fonts, colors, and dimensions to bring your own identity to the interface.</AccordionContent>
										</AccordionItem>
									</Accordion>
									<Collapsible>
										<CollapsibleTrigger class="text-link">A consistent visual language +</CollapsibleTrigger>
										<CollapsibleContent>
											<p class="muted">From a compact input to a full-size dialog, typography, borders, and shadows work together.</p>
										</CollapsibleContent>
									</Collapsible>
								</Panel>
							</div>
						</section>

						<section id="forms" class="section">
							<div class="section-heading">
								<span class="section-number">02</span>
								<div>
									<h2>Forms & selection</h2>
									<p>Inputs, validation, disabled states, and working selection controls.</p>
								</div>
							</div>
							<div class="grid">
								<Panel title="Project settings" description="Change the name or submit this local form.">
									<form
										class="stack"
										onSubmit={(e) => {
											e.preventDefault();
											toast.success(`Saved ${project.value || 'Untitled project'}`);
										}}>
										<Input
											label="Project name"
											modelValue={project.value}
											onUpdate:modelValue={(v: string) => (project.value = v)}
											helperText={`preview.example.com/${project.value || 'project'}`}
											required
										/>
										<Input label="Contact email" type="email" defaultValue="not-an-email" error="Enter a valid email address (error-state example)." />
										<Input label="Organization ID" defaultValue="org_1042" disabled />
										<Textarea label="Description" placeholder="Tell us a little about this project..." />
										<Button type="submit">Save settings</Button>
									</form>
								</Panel>
								<Panel title="Selection controls">
									<div class="control-field">
										<Label>Deployment region</Label>
										<Select defaultValue="asia">
											<SelectTrigger aria-label="Deployment region">
												<SelectValue placeholder="Choose a region" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="asia">Asia Pacific</SelectItem>
												<SelectItem value="europe">Europe</SelectItem>
												<SelectItem value="us">North America</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div class="control-field">
										<Label>Environment</Label>
										<NativeSelect aria-label="Environment" defaultValue="production">
											<NativeSelectOption value="production">Production</NativeSelectOption>
											<NativeSelectOption value="preview">Preview</NativeSelectOption>
										</NativeSelect>
									</div>
									<Combobox
										items={[
											{ value: 'vue', label: 'Vue' },
											{ value: 'react', label: 'React' },
											{ value: 'solid', label: 'Solid' },
										]}
										placeholder="Search frameworks"
									/>
									<RadioGroup class="choice-row" defaultValue="auto" orientation="horizontal">
										<RadioGroupItem value="auto">Automatic</RadioGroupItem>
										<RadioGroupItem value="manual">Manual</RadioGroupItem>
									</RadioGroup>
									<div class="wrap choice-row">
										<Checkbox {...{ id: 'updates' }} defaultChecked />
										<Label htmlFor="updates">Receive project updates</Label>
										<Checkbox aria-label="Disabled checkbox" disabled />
									</div>
								</Panel>
								<Panel title="Input groups & verification">
									<InputGroup>
										<InputGroupAddon>https://</InputGroupAddon>
										<InputGroupInput aria-label="Custom domain" placeholder="your-domain.com" />
									</InputGroup>
									<Input label="Compact input" controlSize="sm" placeholder="Small, but still clear" />
									<div class="control-field">
										<Label>One-time code</Label>
										<InputOTP maxLength={6} aria-label="Six-digit verification code">
											<InputOTPGroup>
												{Array.from({ length: 6 }, (_, index) => (
													<InputOTPSlot index={index} />
												))}
											</InputOTPGroup>
										</InputOTP>
									</div>
									<div class="control-field">
										<Label>Build budget: {budget.value}%</Label>
										<Slider modelValue={budget.value} onUpdate:modelValue={(v: number) => (budget.value = v)} max={100} step={1}>
											<SliderTrack>
												<SliderRange />
											</SliderTrack>
											<SliderThumb aria-label="Build budget" />
										</Slider>
									</div>
								</Panel>
								<Panel title="Date picker" description="Pick a date to see feedback.">
									<div class="calendar-demo">
										<Calendar
											mode="single"
											onSelect={(value) => {
												if (value instanceof Date) toast.info(`Selected ${value.toLocaleDateString('en-US')}`);
											}}
										/>
									</div>
								</Panel>
							</div>
						</section>

						<section id="data" class="section">
							<div class="section-heading">
								<span class="section-number">03</span>
								<div>
									<h2>Data & display</h2>
									<p>Tables, charts, and the states before your content arrives.</p>
								</div>
							</div>
							<div class="grid">
								<Panel title="Traffic trends" description="Readable data, balanced colors, in either mode.">
									<ChartContainer
										title="Weekly traffic"
										aria-label="Weekly traffic line chart"
										config={{ visits: { label: 'Visits' }, builds: { label: 'Builds' } }}
										data={[
											{ day: 'Mon', visits: 140, builds: 35 },
											{ day: 'Tue', visits: 220, builds: 54 },
											{ day: 'Wed', visits: 180, builds: 42 },
											{ day: 'Thu', visits: 310, builds: 75 },
											{ day: 'Fri', visits: 280, builds: 68 },
											{ day: 'Sat', visits: 390, builds: 90 },
										]}
										xKey="day"
										type="line"
										showLegend
										tabIndex={0}
									/>
								</Panel>
								<Panel title="Projects" description={`Page ${page.value} / 2 projects per page`}>
									<div class="table-scroll">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Project</TableHead>
													<TableHead>Status</TableHead>
													<TableHead>Visits</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{projects.slice((page.value - 1) * 2, page.value * 2).map((item) => (
													<TableRow>
														<TableCell>
															<strong>{item.name}</strong>
															<p class="muted">{item.domain}</p>
														</TableCell>
														<TableCell>
															<Badge variant={item.state === 'Ready' ? 'secondary' : 'outline'}>{item.state}</Badge>
														</TableCell>
														<TableCell>{item.traffic}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
									<Pagination>
										<PaginationContent>
											{[1, 2].map((n) => (
												<PaginationItem>
													<PaginationLink
														href="#data"
														isActive={page.value === n}
														class=""
														{...{
															onClick: (e: MouseEvent) => {
																e.preventDefault();
																page.value = n;
															},
														}}>
														{n}
													</PaginationLink>
												</PaginationItem>
											))}
										</PaginationContent>
									</Pagination>
								</Panel>
								<Panel title="Loading & empty states">
									<div class="row">
										<Spinner aria-label="Syncing" />
										<span class="muted">Syncing resources...</span>
									</div>
									<div class="stack">
										<Skeleton style={{ height: '14px', width: '70%' }} />
										<Skeleton style={{ height: '14px', width: '90%' }} />
									</div>
									<Empty>
										<EmptyHeader>
											<EmptyTitle>No attachments yet</EmptyTitle>
											<EmptyDescription>A fresh project deserves a thoughtful empty state.</EmptyDescription>
										</EmptyHeader>
										<Button variant="outline" class="" {...{ onClick: () => toast.info('Local demo only. No files are uploaded.') }}>
											Add attachment
										</Button>
									</Empty>
								</Panel>
								<Panel title="Recent activity" description="Scroll through activity inside the card.">
									<ScrollArea style={{ height: '240px' }}>
										{Array.from({ length: 10 }, (_, index) => (
											<div class="activity">
												<span class="status-dot" />
												<div>
													<strong>Preview #{1042 - index}</strong>
													<p class="muted">Build complete / {index + 1} min ago</p>
												</div>
												<Badge variant="outline">Ready</Badge>
											</div>
										))}
									</ScrollArea>
								</Panel>
							</div>
						</section>

						<section id="overlays" class="section">
							<div class="section-heading">
								<span class="section-number">04</span>
								<div>
									<h2>Overlays & feedback</h2>
									<p>Try dialogs, menus, and notifications in both color modes.</p>
								</div>
							</div>
							<div class="grid">
								<Panel title="Dialogs & side panels">
									<div class="wrap">
										<Dialog>
											<DialogTrigger class="demo-trigger">Edit project</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Edit project</DialogTitle>
													<DialogDescription>A real dialog. Press Escape to close it.</DialogDescription>
												</DialogHeader>
												<Input label="Project name" modelValue={project.value} onUpdate:modelValue={(v: string) => (project.value = v)} />
												<DialogFooter>
													<DialogClose class="demo-trigger">Done</DialogClose>
												</DialogFooter>
											</DialogContent>
										</Dialog>
										<Sheet>
											<SheetTrigger class="demo-trigger">Open side panel</SheetTrigger>
											<SheetContent side="right">
												<SheetHeader>
													<SheetTitle>Deployment details</SheetTitle>
													<SheetDescription>A focused view of your project's latest deployment.</SheetDescription>
												</SheetHeader>
												<div class="stack panel-body">
													<Badge>Production</Badge>
													<p>Project: {project.value}</p>
													<Progress value={budget.value} aria-label="Deployment progress" />
												</div>
											</SheetContent>
										</Sheet>
										<AlertDialog>
											<AlertDialogTrigger class="demo-trigger">Delete preview</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogTitle>Delete this preview?</AlertDialogTitle>
												<AlertDialogDescription>This is a local demo. No real data will be deleted.</AlertDialogDescription>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction class="" {...{ onClick: () => toast.success('Demo preview deleted') }}>
														Confirm deletion
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
									<Separator />
									<Alert>
										<AlertTitle>All systems operational</AlertTitle>
										<AlertDescription>An inline notice that stays until the page changes.</AlertDescription>
									</Alert>
								</Panel>
								<Panel title="Popovers & notifications">
									<div class="wrap">
										<Tooltip>
											<TooltipTrigger class="demo-trigger">Hover for a hint</TooltipTrigger>
											<TooltipContent>You can also focus this trigger with the keyboard.</TooltipContent>
										</Tooltip>
										<Popover>
											<PopoverTrigger class="demo-trigger">Deployment info</PopoverTrigger>
											<PopoverContent>
												<div class="stack">
													<strong>Preview environment</strong>
													<p class="muted">An isolated preview that does not affect production traffic.</p>
													<Badge variant="secondary">Active</Badge>
												</div>
											</PopoverContent>
										</Popover>
										<DropdownMenu>
											<DropdownMenuTrigger class="demo-trigger">More actions ↓</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem {...{ onSelect: () => toast.info('Rebuild requested') }}>Rebuild</DropdownMenuItem>
												<DropdownMenuItem {...{ onSelect: () => toast('Settings selected') }}>Project settings</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem variant="destructive" {...{ onSelect: () => toast.error('Demo: deployment stopped') }}>
													Stop deployment
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
									<Separator />
									<div class="wrap">
										<Button variant="outline" class="" {...{ onClick: () => toast.success('Settings saved') }}>
											Success toast
										</Button>
										<Button variant="outline" class="" {...{ onClick: () => toast.error('Build failed. Please try again.') }}>
											Error toast
										</Button>
										<Button variant="outline" class="" {...{ onClick: () => toast.info('A new preview is available') }}>
											Info toast
										</Button>
									</div>
									<Alert variant="destructive">
										<AlertTitle>An error-state example</AlertTitle>
										<AlertDescription>Check your environment variables and try again.</AlertDescription>
									</Alert>
								</Panel>
							</div>
						</section>

						<section id="setup" class="section setup">
							<div>
								<p class="eyebrow">TAKE IT WITH YOU</p>
								<h2>Bring it to your project.</h2>
								<p class="muted">
									Give your existing components a coordinated new look.
									<br />
									Keep familiar interactions, with room to make the details your own.
								</p>
								<a class="text-link" href="https://vue.tileui.zmorg.cn/docs/themes/kumo">
									Full setup guide ↗
								</a>
							</div>
							<div class="code-example">
								<div class="code-label">Terminal</div>
								<pre aria-label="Install dependencies">
									<code>
										<span class="code-command">pnpm add</span>
										{' @tile-ui/vue @tile-ui/core \\\n  @tile-ui/styles @tile-ui/theme-kumo'}
									</code>
								</pre>
								<div class="code-label">src/main.tsx</div>
								<pre aria-label="Import components and theme">
									<code>
										<span class="code-keyword">import</span> <span class="code-string">{"'@tile-ui/theme-kumo/theme.css'"}</span>
										{';\n'}
										<span class="code-keyword">import</span> <span class="code-string">{"'@tile-ui/styles/reset.css'"}</span>
										{';\n'}
										<span class="code-keyword">import</span>
										{' { '}
										<span class="code-symbol">Button</span>
										{' } '}
										<span class="code-keyword">from</span> <span class="code-string">{"'@tile-ui/vue'"}</span>
										{';'}
									</code>
								</pre>
							</div>
						</section>
						<footer class="site-footer">
							<span>Kumo Playground / Tile UI</span>
							<span>Thoughtful details. One cohesive interface.</span>
							<a href="#">Back to top ↑</a>
						</footer>
					</main>
				</div>
				<Toaster position="bottom-right" />
			</>
		);
	},
});
