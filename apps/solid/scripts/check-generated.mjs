import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { getDemoSource, getPreviewSlugs } from '../../../scripts/demo-files.mjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(dirname, '..');
const workspaceRoot = path.resolve(appRoot, '../..');
const require = createRequire(path.join(appRoot, 'package.json'));
const ts = require('typescript');
const generatedPaths = [
	'content/docs/components',
	'src/generated/docs.ts',
	'src/generated/preview-code.ts',
	'src/generated/primitive-preview-code.ts',
	'src/generated/home-showcase-code.ts',
	'public/r',
	'public/robots.txt',
	'public/sitemap.xml',
	'public/favicon.svg',
	'public/og.png',
];

function snapshot(target) {
	const stat = fs.statSync(target);
	if (stat.isFile()) return new Map([[path.relative(appRoot, target), fs.readFileSync(target)]]);
	const entries = new Map();
	for (const item of fs.readdirSync(target, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
		const file = path.join(target, item.name);
		if (item.isDirectory()) {
			for (const [name, content] of snapshot(file)) entries.set(name, content);
		} else entries.set(path.relative(appRoot, file), fs.readFileSync(file));
	}
	return entries;
}

function allSnapshots() {
	const result = new Map();
	for (const relative of generatedPaths) {
		const target = path.join(appRoot, relative);
		assert.ok(fs.existsSync(target), `Missing checked-in generated artifact: ${relative}`);
		for (const [name, content] of snapshot(target)) result.set(name, content);
	}
	return result;
}

const before = allSnapshots();
execFileSync('corepack', ['pnpm', 'registry:build'], { cwd: appRoot, stdio: 'inherit' });
execFileSync('corepack', ['pnpm', 'generate'], { cwd: appRoot, stdio: 'inherit' });
const after = allSnapshots();
assert.deepEqual([...after.keys()], [...before.keys()], 'Generated file set changed.');
for (const [name, content] of before) assert.deepEqual(after.get(name), content, `Generated artifact is stale: ${name}`);

const declarations = fs.readFileSync(path.join(workspaceRoot, 'packages/solid/dist/index.d.ts'), 'utf8');
const publicIndex = fs.readFileSync(path.join(workspaceRoot, 'packages/solid/src/index.ts'), 'utf8');
assert.doesNotMatch(declarations, /interface (Button|Badge)Props[\s\S]*?asChild\??:/);
for (const component of ['Button', 'Badge']) {
	const doc = fs.readFileSync(path.join(appRoot, 'content/docs/components', `${component.toLowerCase()}.mdx`), 'utf8');
	assert.doesNotMatch(doc, /asChild/);
}
for (const prop of ['defaultValue', 'onChangeValue', 'pressed', 'defaultPressed', 'onPressedChange', 'open', 'defaultOpen', 'onOpenChange']) {
	assert.match(declarations, new RegExp(`\\b${prop}\\??:`));
}
const batch2Slugs = [
	'button-group',
	'checkbox',
	'field',
	'form',
	'input-group',
	'input-otp',
	'native-select',
	'progress',
	'radio-group',
	'slider',
	'switch',
	'textarea',
	'toggle-group',
];
const batch3Slugs = ['accordion', 'calendar', 'collapsible', 'direction', 'message', 'message-scroller', 'pagination', 'scroll-area', 'tabs'];
const batch4Slugs = [
	'alert-dialog',
	'combobox',
	'command',
	'context-menu',
	'drawer',
	'dropdown-menu',
	'hover-card',
	'menubar',
	'navigation-menu',
	'popover',
	'select',
	'sheet',
	'tooltip',
];
const batch5Slugs = ['carousel', 'chart', 'resizable', 'sidebar', 'sonner'];
for (const slug of [
	'alert',
	'aspect-ratio',
	'attachment',
	'avatar',
	'breadcrumb',
	'bubble',
	'empty',
	'item',
	'kbd',
	'label',
	'marker',
	'skeleton',
	'spinner',
	'table',
	...batch2Slugs,
	...batch3Slugs,
	...batch4Slugs,
	...batch5Slugs,
]) {
	assert.ok(fs.existsSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`)), `Missing Solid component doc: ${slug}`);
}
const registry = JSON.parse(fs.readFileSync(path.join(appRoot, 'public/r/registry.json'), 'utf8'));
assert.equal(registry.items.filter((item) => item.type === 'registry:ui').length, 62);
assert.equal(registry.items.length, 71);
const hookNames = registry.items
	.filter((item) => item.type === 'registry:hook')
	.map((item) => item.name)
	.sort();
assert.deepEqual(hookNames, ['create-copy-to-clipboard', 'create-local-storage', 'create-media-query']);
const sharedNames = registry.items
	.filter((item) => item.type !== 'registry:ui' && item.type !== 'registry:hook')
	.map((item) => item.name)
	.sort();
assert.deepEqual(sharedNames, ['core', 'liveline-core', 'styles', 'theme-default', 'theme-kumo', 'utils']);
const registryFiles = fs
	.readdirSync(path.join(appRoot, 'public/r'))
	.filter((file) => file.endsWith('.json'))
	.sort();
assert.deepEqual(registryFiles, ['registry.json', ...registry.items.map((item) => `${item.name}.json`)].sort(), 'Solid registry public files must exactly match the manifest.');
const uiNames = registry.items
	.filter((item) => item.type === 'registry:ui')
	.map((item) => item.name)
	.sort();
const componentIndex = fs.readFileSync(path.join(appRoot, 'content/docs/components/index.mdx'), 'utf8');
for (const name of uiNames) assert.match(componentIndex, new RegExp(`\\]\\(/docs/components/${name}\\)`), `Component index missing ${name}`);
const docSlugs = fs
	.readdirSync(path.join(appRoot, 'content/docs/components'))
	.filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')
	.map((file) => file.replace(/\.mdx$/, ''))
	.sort();
const demoSlugs = fs
	.readdirSync(path.join(appRoot, 'components/demos'))
	.filter((file) => file.endsWith('.tsx'))
	.map((file) => file.replace(/\.tsx$/, ''))
	.sort();
assert.deepEqual(docSlugs, uiNames, 'Solid component docs must exactly match registry UI items.');
assert.deepEqual(demoSlugs, uiNames, 'Solid demos must exactly match registry UI items.');
const previewCode = fs.readFileSync(path.join(appRoot, 'src/generated/preview-code.ts'), 'utf8');
const previewSlugs = [...previewCode.matchAll(/^\s*(?:'([^']+)'|"([^"]+)"|([a-z][\w-]*)): \{$/gm)].map((match) => match[1] ?? match[2] ?? match[3]).sort();
assert.deepEqual(previewSlugs, getPreviewSlugs('solid'), 'Solid previews must match demos and their variants.');
const previewModule = await import(`${pathToFileURL(path.join(appRoot, 'src/generated/preview-code.ts')).href}?check=${Date.now()}`);
for (const name of getPreviewSlugs('solid')) {
	assert.equal(previewModule.previewCodeMap[name]?.raw, getDemoSource('solid', name), `Preview source identity missing for ${name}`);
}
const primitiveDoc = fs.readFileSync(path.join(appRoot, 'content/docs/primitives.mdx'), 'utf8');
const primitiveDemo = fs.readFileSync(path.join(appRoot, 'components/primitive-demos/primitives.tsx'), 'utf8');
const primitivePreviewModule = await import(`${pathToFileURL(path.join(appRoot, 'src/generated/primitive-preview-code.ts')).href}?check=${Date.now()}`);
assert.deepEqual(Object.keys(primitivePreviewModule.primitivePreviewCodeMap), ['primitives']);
assert.equal(primitivePreviewModule.primitivePreviewCodeMap.primitives?.raw, primitiveDemo, 'Primitive preview raw source must exactly match its demo.');
assert.match(primitiveDemo, /from '@tile-ui\/solid\/primitives';/, 'Primitive demo must use the canonical package subpath.');
const primitiveApis = [
	'createClickOutside',
	'createCopyToClipboard',
	'createIsMobile',
	'createKeyPress',
	'createLocalStorage',
	'createMediaQuery',
	'createMousePosition',
	'createOnlineStatus',
	'createScrollPosition',
	'createSessionStorage',
	'createWindowSize',
];
for (const api of primitiveApis) {
	assert.match(primitiveDoc, new RegExp(`\\b${api}\\b`), `Primitive docs missing package API ${api}`);
	assert.match(primitiveDemo, new RegExp(`\\b${api}\\b`), `Primitive demo missing package API ${api}`);
}
for (const section of [
	'Introduction',
	'Package install',
	'Package usage',
	'SSR contract',
	'Cleanup contract',
	'Primitive groups',
	'Registry install',
	'API reference',
	'Related docs',
])
	assert.match(primitiveDoc, new RegExp(`## ${section}`), `Primitive docs missing ${section}`);
for (const [name, target, exports] of [
	['create-local-storage', 'primitives/create-local-storage.ts', ['StorageDefaultValue', 'StorageSignal', 'createLocalStorage', 'createSessionStorage']],
	[
		'create-media-query',
		'primitives/create-media-query.ts',
		['WindowSize', 'Point', 'ReactiveValue', 'createWindowSize', 'createMediaQuery', 'createIsMobile', 'createOnlineStatus', 'createScrollPosition'],
	],
	['create-copy-to-clipboard', 'primitives/create-copy-to-clipboard.ts', ['CopyToClipboardOptions', 'CopyToClipboardResult', 'createCopyToClipboard']],
]) {
	const item = JSON.parse(fs.readFileSync(path.join(appRoot, 'public/r', `${name}.json`), 'utf8'));
	assert.equal(item.type, 'registry:hook');
	assert.deepEqual(item.dependencies, ['solid-js']);
	assert.equal(item.registryDependencies, undefined);
	assert.equal(item.files.length, 1);
	assert.equal(item.files[0].target, target);
	assert.doesNotMatch(item.files[0].content, /@tile-ui\//);
	for (const exported of exports) assert.match(item.files[0].content, new RegExp(`\\b${exported}\\b`), `${name} payload missing ${exported}`);
}
for (const [slug, dependency] of [
	['form', 'label'],
	['input-group', 'button'],
	['dialog', 'button'],
	['attachment', 'button'],
]) {
	const doc = fs.readFileSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`), 'utf8');
	assert.match(doc, new RegExp('\\| `' + dependency + '`\\s+\\| Registry component dependency'), `${slug} docs missing ${dependency} dependency`);
}
const sliderDemo = fs.readFileSync(path.join(appRoot, 'components/demos/slider.tsx'), 'utf8');
assert.doesNotMatch(sliderDemo, /<Slider\b[^>]*aria-label=/);
assert.match(sliderDemo, /<SliderThumb aria-label=/);
const sliderDoc = fs.readFileSync(path.join(appRoot, 'content/docs/components/slider.mdx'), 'utf8');
assert.match(sliderDoc, /<SliderThumb aria-label="Volume" \/>/);
const tabsDemo = fs.readFileSync(path.join(appRoot, 'components/demos/tabs.tsx'), 'utf8');
for (const marker of ['data-demo-nested-tabs', 'outerValue', 'innerValue', '<Tabs value={innerValue()}', 'value="package"', 'value="registry"', 'data-tabs-state']) {
	assert.ok(tabsDemo.includes(marker), `Tabs demo missing nested-state marker ${marker}`);
}
const calendarDemo = fs.readFileSync(path.join(appRoot, 'components/demos/calendar.tsx'), 'utf8');
for (const marker of ['data-demo-range-calendar', 'mode="range"', 'defaultMonth={defaultMonth}', 'today={today}', 'data-range-state', 'range().from', 'range().to']) {
	assert.ok(calendarDemo.includes(marker), `Calendar demo missing range marker ${marker}`);
}
const formDemo = fs.readFileSync(path.join(appRoot, 'components/demos/form.tsx'), 'utf8');
for (const source of [
	'id="solid-form-email"',
	'descriptionId="solid-form-email-help"',
	'messageId="solid-form-email-error"',
	'id="solid-form-email-help"',
	'id="solid-form-email-error"',
	'data-id="solid-form-email-control"',
	'novalidate',
]) {
	assert.ok(formDemo.includes(source), `Form demo missing ${source}`);
}
const formDoc = fs.readFileSync(path.join(appRoot, 'content/docs/components/form.mdx'), 'utf8');
for (const source of ['descriptionId="email-help"', 'messageId="email-error"', 'id="email-help"', 'id="email-error"']) {
	assert.ok(formDoc.includes(source), `Form package usage missing ${source}`);
}
for (const relative of ['content/docs', 'src/routes']) {
	for (const [name, content] of snapshot(path.join(appRoot, relative))) {
		assert.doesNotMatch(
			content.toString(),
			/Stage\s*\d+|(?:first|current|only)\s+\d+[- ](?:component|item)|\b(?:7|21|34|38)\s+(?:components?|UI items?)\b/i,
			`Stale stage/count copy in ${name}`,
		);
	}
}
for (const [component, props] of Object.entries({
	input: ['defaultValue', 'onChangeValue'],
	toggle: ['pressed', 'defaultPressed', 'onPressedChange'],
	dialog: ['open', 'defaultOpen', 'onOpenChange'],
})) {
	const doc = fs.readFileSync(path.join(appRoot, 'content/docs/components', `${component}.mdx`), 'utf8');
	for (const prop of props) assert.match(doc, new RegExp('\\| `' + prop + '`\\s+\\|'));
}
const dialogDoc = fs.readFileSync(path.join(appRoot, 'content/docs/components/dialog.mdx'), 'utf8');
for (const heading of ['DialogContent', 'DialogFooter']) assert.match(dialogDoc, new RegExp(`### ${heading}`));
for (const prop of ['id', 'showCloseButton', 'container', 'overlayClass']) assert.match(dialogDoc, new RegExp('\\| `' + prop + '`\\s+\\|'));
const attachmentDoc = fs.readFileSync(path.join(appRoot, 'content/docs/components/attachment.mdx'), 'utf8');
const attachmentRoot = attachmentDoc.slice(attachmentDoc.indexOf('### Attachment\n'), attachmentDoc.indexOf('### AttachmentCard'));
const attachmentCard = attachmentDoc.slice(attachmentDoc.indexOf('### AttachmentCard'), attachmentDoc.indexOf('### AttachmentGroup'));
assert.doesNotMatch(attachmentRoot, /\| `file`\s+\|/);
assert.match(attachmentCard, /\| `file`\s+\|/);
assert.match(fs.readFileSync(path.join(appRoot, 'content/docs/components/empty.mdx'), 'utf8'), /<EmptyMedia variant="icon">/);
const publicFamilies = {
	Accordion: ['AccordionProps', 'AccordionItemProps', 'AccordionTriggerProps', 'AccordionContentProps', 'AccordionValue', 'AccordionRef'],
	ButtonGroup: ['ButtonGroupProps', 'ButtonGroupSeparatorProps', 'ButtonGroupTextProps'],
	Checkbox: ['CheckboxProps'],
	Field: ['FieldProps', 'FieldContextValue', 'useFieldContext'],
	Form: ['FormProps', 'FormResult', 'FormFieldResult', 'FormControlRenderProps', 'useForm', 'useFormField'],
	InputGroup: ['InputGroupProps', 'InputGroupButtonProps', 'InputGroupTextareaProps'],
	InputOTP: ['InputOTPProps', 'InputOTPSlotProps'],
	NativeSelect: ['NativeSelectProps', 'NativeSelectOptionProps', 'NativeSelectOptGroupProps'],
	Progress: ['ProgressProps'],
	RadioGroup: ['RadioGroupProps', 'RadioGroupItemProps'],
	Slider: ['SliderProps', 'SliderTrackProps', 'SliderRangeProps', 'SliderThumbProps'],
	Switch: ['SwitchProps'],
	Textarea: ['TextareaProps'],
	ToggleGroup: ['ToggleGroupProps', 'ToggleGroupItemProps', 'ToggleGroupValue'],
	Calendar: ['CalendarProps', 'CalendarDayButton', 'CalendarDayButtonProps'],
	Collapsible: ['CollapsibleProps', 'CollapsibleTriggerProps', 'CollapsibleContentProps', 'CollapsibleRef'],
	DirectionProvider: ['DirectionProviderProps', 'useDirection'],
	Message: ['MessageProps', 'MessageGroup', 'MessageAvatar', 'MessageContent', 'MessageHeader', 'MessageFooter'],
	MessageScroller: [
		'MessageScrollerProps',
		'MessageScrollerProvider',
		'MessageScrollerViewport',
		'MessageScrollerContent',
		'MessageScrollerItem',
		'MessageScrollerButton',
		'MessageScrollerContextValue',
		'useMessageScroller',
		'useMessageScrollerScrollable',
		'useMessageScrollerVisibility',
	],
	Pagination: ['PaginationProps', 'PaginationContent', 'PaginationItem', 'PaginationLink', 'PaginationPrevious', 'PaginationNext', 'PaginationEllipsis'],
	ScrollArea: ['ScrollAreaProps', 'ScrollBar', 'ScrollBarProps'],
	Tabs: ['TabsProps', 'TabsList', 'TabsTrigger', 'TabsContent', 'TabsListProps', 'TabsTriggerProps', 'TabsContentProps'],
	AlertDialog: ['AlertDialogProps', 'AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogAction', 'AlertDialogCancel'],
	Combobox: ['ComboboxProps'],
	Command: ['CommandProps', 'CommandInput', 'CommandList', 'CommandGroup', 'CommandItem', 'CommandDialog'],
	ContextMenu: ['ContextMenuProps', 'ContextMenuTrigger', 'ContextMenuContent', 'ContextMenuCheckboxItem', 'ContextMenuRadioItem', 'ContextMenuSub'],
	Drawer: ['DrawerProps', 'DrawerTrigger', 'DrawerContent', 'DrawerClose'],
	DropdownMenu: ['DropdownMenuProps', 'DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuCheckboxItem', 'DropdownMenuRadioItem', 'DropdownMenuSub'],
	HoverCard: ['HoverCardProps', 'HoverCardTrigger', 'HoverCardContent'],
	Menubar: ['MenubarProps', 'MenubarMenu', 'MenubarTrigger', 'MenubarContent', 'MenubarCheckboxItem', 'MenubarRadioItem', 'MenubarSub'],
	NavigationMenu: [
		'NavigationMenuProps',
		'NavigationMenuList',
		'NavigationMenuItem',
		'NavigationMenuTrigger',
		'NavigationMenuContent',
		'NavigationMenuViewport',
		'NavigationMenuLink',
	],
	Popover: ['PopoverProps', 'PopoverTrigger', 'PopoverContent'],
	Select: ['SelectProps', 'SelectTrigger', 'SelectValue', 'SelectContent', 'SelectGroup', 'SelectItem'],
	Sheet: ['SheetProps', 'SheetTrigger', 'SheetContent', 'SheetClose'],
	Tooltip: ['TooltipProps', 'TooltipProvider', 'TooltipTrigger', 'TooltipContent'],
	Carousel: ['CarouselProps', 'CarouselContent', 'CarouselItem', 'CarouselPrevious', 'CarouselNext', 'CarouselRef'],
	ChartContainer: [
		'ChartContainerProps',
		'ChartTooltip',
		'ChartTooltipContent',
		'ChartLegend',
		'ChartLegendContent',
		'ChartStyle',
		'ChartContextValue',
		'ChartLegendItem',
		'ChartTooltipEntry',
	],
	ResizablePanelGroup: ['ResizablePanelGroupProps', 'ResizablePanel', 'ResizableHandle', 'ResizablePanelProps', 'ResizableHandleProps'],
	Sidebar: ['SidebarProps', 'SidebarProvider', 'SidebarTrigger', 'SidebarContent', 'SidebarMenu', 'SidebarMenuButton', 'SidebarContextValue', 'useSidebar'],
	Toaster: ['ToasterProps', 'UseToastReturn', 'useToast', 'toast', 'SonnerToastApi', 'SonnerToast', 'SonnerStore'],
};
for (const [family, names] of Object.entries(publicFamilies)) {
	const familySlug = family.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
	for (const name of [family, ...names]) {
		assert.match(publicIndex, new RegExp(`\\b${name}\\b|export \\* from './components/${familySlug}'`), `Root source export missing ${name}`);
		assert.match(declarations, new RegExp(`\\b${name}\\b`), `Public declaration missing ${name}`);
	}
}
for (const slug of batch2Slugs) assert.doesNotMatch(fs.readFileSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`), 'utf8'), /asChild/);
for (const slug of batch3Slugs) assert.doesNotMatch(fs.readFileSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`), 'utf8'), /asChild/);
for (const slug of batch4Slugs) {
	const doc = fs.readFileSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`), 'utf8');
	assert.doesNotMatch(doc, /\| `asChild`\s+\|/);
	for (const marker of ['## Foundation behavior', 'Portal content is omitted from the server response', 'Keyboard behavior follows the shared Foundation'])
		assert.match(doc, new RegExp(marker));
}
for (const slug of batch5Slugs) assert.doesNotMatch(fs.readFileSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`), 'utf8'), /\| `asChild`\s+\|/);
for (const [slug, tokens] of Object.entries({
	form: ['FormControl', 'FormField', 'FormMessage'],
	field: ['FieldDescription', 'FieldMessage'],
	'input-otp': ['InputOTPGroup', 'InputOTPSlot'],
	slider: ['SliderTrack', 'SliderRange', 'SliderThumb'],
	'toggle-group': ['ToggleGroupItem'],
	accordion: ['AccordionItem', 'AccordionTrigger', 'AccordionContent'],
	calendar: ['CalendarDayButton'],
	collapsible: ['CollapsibleTrigger', 'CollapsibleContent'],
	direction: ['useDirection'],
	message: ['MessageGroup', 'MessageContent', 'MessageFooter'],
	'message-scroller': ['MessageScrollerProvider', 'MessageScrollerViewport', 'MessageScrollerButton', 'useMessageScrollerVisibility'],
	pagination: ['PaginationContent', 'PaginationLink', 'PaginationPrevious', 'PaginationNext'],
	'scroll-area': ['ScrollBar'],
	tabs: ['TabsList', 'TabsTrigger', 'TabsContent'],
})) {
	const doc = fs.readFileSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`), 'utf8');
	for (const token of tokens) assert.match(doc, new RegExp(`### ${token}|<${token}`));
}
const calendarDoc = fs.readFileSync(path.join(appRoot, 'content/docs/components/calendar.mdx'), 'utf8');
for (const token of ['today', 'defaultMonth', 'deterministic SSR']) assert.match(calendarDoc, new RegExp(token));
const messageScrollerDoc = fs.readFileSync(path.join(appRoot, 'content/docs/components/message-scroller.mdx'), 'utf8');
assert.match(messageScrollerDoc, /<MessageScrollerProvider>/);
for (const slug of batch3Slugs) {
	const expectsUtils = ['accordion', 'calendar', 'collapsible', 'message-scroller', 'scroll-area', 'tabs'].includes(slug);
	const item = registry.items.find((candidate) => candidate.name === slug);
	assert.ok(item, `Missing registry item ${slug}`);
	assert.equal(item.registryDependencies.includes('@tile-ui/utils'), expectsUtils, `${slug} utils dependency does not match source imports`);
	const doc = fs.readFileSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`), 'utf8');
	if (expectsUtils) assert.match(doc, /\| `utils`\s+\| Shared utility helpers/);
	else assert.doesNotMatch(doc, /\| `utils`\s+\|/);
}
for (const slug of uiNames) {
	const doc = fs.readFileSync(path.join(appRoot, 'content/docs/components', `${slug}.mdx`), 'utf8');
	const usage = doc.match(/## Package usage\s+```tsx\s+([\s\S]*?)```/)?.[1];
	assert.ok(usage, `Package usage missing for ${slug}`);
	const importEnd = [...usage.matchAll(/^import[\s\S]*?;\s*$/gm)].at(-1)?.index;
	const importStatement = importEnd === undefined ? '' : usage.slice(0, usage.indexOf(';', importEnd) + 1);
	const exampleBody = usage.slice(importStatement.length).trim();
	const validationSource = `${importStatement}\nconst UsageExample = () => (<>${exampleBody}</>);\n`;
	const result = ts.transpileModule(validationSource, {
		fileName: `${slug}.tsx`,
		reportDiagnostics: true,
		compilerOptions: { jsx: ts.JsxEmit.Preserve, target: ts.ScriptTarget.ES2017 },
	});
	assert.deepEqual(
		(result.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error),
		[],
		`Invalid usage snippet for ${slug}`,
	);
}
for (const relative of ['src/generated/docs.ts', 'src/generated/preview-code.ts', 'src/generated/primitive-preview-code.ts', 'public/sitemap.xml', 'public/robots.txt']) {
	const content = fs.readFileSync(path.join(appRoot, relative), 'utf8');
	assert.doesNotMatch(content, /react\.tileui|Tile UI React|\/_next\//, `React/Next identity leaked into ${relative}`);
}
console.log('Solid generated artifacts and public API docs are current.');
