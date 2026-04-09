'use client';

import { useState } from 'react';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Textarea } from '@tile-ui/react';
import { ComponentPreview } from '@/components/component-preview';

export function ButtonPreview() {
	return (
		<ComponentPreview title="Button variants" description="The primary button styles cover high-emphasis actions, secondary actions, and quiet inline controls.">
			<div className="component-preview__stack">
				<div className="button-group">
					<Button>Default</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="destructive">Destructive</Button>
					<Button loading>Loading</Button>
				</div>
			</div>
		</ComponentPreview>
	);
}

export function InputPreview() {
	const [value, setValue] = useState('');

	return (
		<ComponentPreview title="Input states" description="Inputs keep label, helper text, and validation messaging aligned without extra form wrappers.">
			<div className="component-preview__stack">
				<Input
					label="Project name"
					helperText="Used in your dashboard and generated URLs."
					value={value}
					onChange={(event) => setValue(event.target.value)}
					placeholder="Tile UI Docs"
				/>
				<Input label="Read-only example" helperText="Use this for immutable values or generated fields." defaultValue="tile-ui" readOnly />
				<Input label="Validation example" error="A project name is required before publishing." defaultValue="" />
			</div>
		</ComponentPreview>
	);
}

export function TextareaPreview() {
	const [value, setValue] = useState('');

	return (
		<ComponentPreview title="Textarea states" description="Textarea follows the same field structure as Input so forms stay visually and behaviorally consistent.">
			<div className="component-preview__stack">
				<Textarea
					label="Summary"
					helperText="Keep it short and specific for reviewers."
					value={value}
					onChange={(event) => setValue(event.target.value)}
					placeholder="Describe the release in one paragraph"
				/>
				<Textarea label="Validation example" error="Please provide at least 20 characters before submitting." defaultValue="Too short" />
			</div>
		</ComponentPreview>
	);
}

export function LabelPreview() {
	return (
		<ComponentPreview
			title="Label usage"
			description="Label works as a standalone form primitive and pairs with custom field structures when you do not need the higher-level field components.">
			<div className="component-preview__stack">
				<div className="form-group">
					<Label required htmlFor="preview-feedback">
						Feedback
					</Label>
					<textarea id="preview-feedback" className="component-preview__native-field" placeholder="Type your feedback here" />
				</div>
				<div className="form-group">
					<Label htmlFor="preview-slug">Project slug</Label>
					<input id="preview-slug" className="component-preview__native-field" defaultValue="tile-ui" readOnly />
				</div>
			</div>
		</ComponentPreview>
	);
}

export function CardPreview() {
	return (
		<ComponentPreview title="Card composition" description="Card primitives give you a stable surface for headers, content blocks, supporting copy, and action rows.">
			<Card>
				<CardHeader>
					<CardTitle>Starter workspace</CardTitle>
					<CardDescription>Ship a consistent docs and component experience across React and Vue.</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="component-preview__text">Use cards for summaries, settings surfaces, marketing CTAs, and denser information blocks that need a clear frame.</p>
				</CardContent>
				<CardFooter>
					<Button variant="outline">Preview</Button>
					<Button>Install</Button>
				</CardFooter>
			</Card>
		</ComponentPreview>
	);
}

export function CopyToClipboardPreview() {
	const [copied, setCopied] = useState(false);

	return (
		<ComponentPreview title="Clipboard interaction" description="This mirrors the common UI pattern where the copy action updates local feedback state for a short period.">
			<div className="component-preview__stack">
				<div className="card-link">
					<p className="component-preview__text">Registry URL: https://react.tile-ui.dev/r/button.json</p>
					<div className="button-group">
						<Button
							onClick={async () => {
								await navigator.clipboard.writeText('https://react.tile-ui.dev/r/button.json');
								setCopied(true);
								window.setTimeout(() => setCopied(false), 1200);
							}}>
							{copied ? 'Copied' : 'Copy URL'}
						</Button>
					</div>
				</div>
			</div>
		</ComponentPreview>
	);
}

export function MediaQueryPreview() {
	const [isCompact, setIsCompact] = useState(false);

	return (
		<ComponentPreview title="Responsive branching" description="A media-query helper typically drives whether you render a compact mobile variant or a denser desktop layout.">
			<div className="component-preview__stack">
				<div className="button-group">
					<Button variant={isCompact ? 'default' : 'outline'} onClick={() => setIsCompact((value) => !value)}>
						Toggle compact mode
					</Button>
				</div>
				<div className="card-link">
					<p className="component-preview__text">
						{isCompact
							? 'Compact mode simulates a mobile layout with tighter spacing and fewer secondary controls.'
							: 'Expanded mode simulates a desktop layout with more room for metadata and supporting actions.'}
					</p>
				</div>
			</div>
		</ComponentPreview>
	);
}

export function LocalStoragePreview() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	return (
		<ComponentPreview title="Persisted preference example" description="A local-storage helper often powers simple user preferences like theme, density, or navigation state.">
			<div className="component-preview__stack">
				<div className="button-group">
					<Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>
						Light
					</Button>
					<Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>
						Dark
					</Button>
				</div>
				<p className="component-preview__text">
					Current theme preference: <strong>{theme}</strong>
				</p>
			</div>
		</ComponentPreview>
	);
}

export function ContactFormPreview() {
	return (
		<ComponentPreview title="Contact form composition" description="This example combines the registry primitives into a compact, realistic support form surface.">
			<Card>
				<CardHeader>
					<CardTitle>Contact support</CardTitle>
					<CardDescription>Send a structured request without building the form anatomy from scratch.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="component-preview__stack">
						<Input label="Email" placeholder="name@company.com" helperText="We reply to the address used here." />
						<Textarea label="Question" placeholder="Tell us what you need help with" helperText="Include relevant context and links." />
					</div>
				</CardContent>
				<CardFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Submit</Button>
				</CardFooter>
			</Card>
		</ComponentPreview>
	);
}

export function NewsletterCardPreview() {
	return (
		<ComponentPreview
			title="Newsletter signup"
			description="A lightweight marketing capture flow built from the same field and action primitives used elsewhere in the system.">
			<Card>
				<CardHeader>
					<CardTitle>Stay in the loop</CardTitle>
					<CardDescription>Product updates, release notes, and design system changes once a month.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="component-preview__stack">
						<Input label="Email" placeholder="you@company.com" helperText="We only send relevant updates." />
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full">Subscribe</Button>
				</CardFooter>
			</Card>
		</ComponentPreview>
	);
}

export function ProfileSettingsPreview() {
	return (
		<ComponentPreview title="Profile settings" description="A denser account-management surface that still uses the same field, label, and action primitives.">
			<Card>
				<CardHeader>
					<CardTitle>Profile settings</CardTitle>
					<CardDescription>Update the details your teammates and collaborators see first.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="component-preview__stack">
						<Input label="Display name" defaultValue="Tile UI Team" />
						<Input label="Email" defaultValue="team@tile-ui.dev" />
						<div className="form-group">
							<Label htmlFor="profile-role">Role</Label>
							<input id="profile-role" className="component-preview__native-field" defaultValue="Design Systems Engineer" />
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Save changes</Button>
				</CardFooter>
			</Card>
		</ComponentPreview>
	);
}
