'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { reactHomeLinks } from '../../common/lib/docs';
import { Button, Input, Textarea, Label } from '@tile-ui/react';

export default function HomePage() {
	const [inputValue, setInputValue] = useState('');
	const [textareaValue, setTextareaValue] = useState('');

	return (
		<main className="docs-shell">
			<section className="hero">
				<p className="eyebrow">Tile UI React</p>
				<h1>React components, registry items, and examples.</h1>
				<p className="lede">
					A React-focused documentation surface for Tile UI. Install the package, browse registry items, and preview the component primitives that power the design
					system.
				</p>
			</section>

			<section className="card-grid">
				{reactHomeLinks.map((section) => (
					<Link key={section.href} href={section.href} className="card-link">
						<h2>{section.title}</h2>
						<p>{section.description}</p>
					</Link>
				))}
			</section>

			<section className="showcase-shell">
				<div className="showcase-header">
					<p className="eyebrow">Component Showcase</p>
					<h2>Preview the React building blocks.</h2>
					<p className="showcase-copy">The same primitives are available from the package and from the React registry hosted on this site.</p>
				</div>

				<div className="showcase-grid">
					<div className="card-link">
						<div className="showcase-section">
							<h3>Buttons</h3>
							<p className="showcase-copy">Variants, sizes, and loading state.</p>
						</div>
						<div className="showcase-section">
							<div className="button-group">
								<Button variant="default">Default</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="destructive">Destructive</Button>
								<Button loading>Loading</Button>
							</div>
						</div>
					</div>

					<div className="card-link">
						<div className="showcase-section">
							<h3>Inputs</h3>
							<p className="showcase-copy">Shared label, helper text, and error affordances.</p>
						</div>
						<div className="showcase-section">
							<div className="form-group">
								<Input label="Username" placeholder="Enter your username" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
								<Input label="Email" type="email" placeholder="you@example.com" helperText="We will never share it." />
								<Input label="Error state" error="Username already exists" defaultValue="tile" />
							</div>
						</div>
					</div>

					<div className="card-link">
						<div className="showcase-section">
							<h3>Textarea + Label</h3>
							<p className="showcase-copy">Composable form surfaces for multi-line input.</p>
						</div>
						<div className="showcase-section">
							<div className="form-group">
								<div className="form-group">
									<Label required>Feedback</Label>
									<Textarea placeholder="Share what you are building..." value={textareaValue} onChange={(event) => setTextareaValue(event.target.value)} />
								</div>
								<Textarea label="Validation" error="Please enter at least 10 characters." defaultValue="Too short" />
							</div>
						</div>
						<div className="button-group">
							<Button variant="outline">Cancel</Button>
							<Button>Save</Button>
						</div>
					</div>
				</div>

				<div className="showcase-footer">Tile UI React combines a shared SCSS design system with framework-specific ergonomics and registry-driven distribution.</div>
			</section>
		</main>
	);
}
