// @vitest-environment node

import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Tabs, TabsList, TabsTrigger } from '../src/components/tabs/tabs';

vi.mock('@tile-ui/core', () => import('../../core/src/components/tabs'));

describe('React tabs indicator SSR', () => {
	it('renders an inert aria-hidden indicator without browser globals', () => {
		const html = renderToString(
			<Tabs defaultValue="a">
				<TabsList>
					<TabsTrigger value="a">A</TabsTrigger>
				</TabsList>
			</Tabs>,
		);
		expect(html).toContain('data-slot="tabs-indicator"');
		expect(html).toContain('aria-hidden="true"');
		expect(html).not.toContain('--tile-tabs-indicator-left');
	});
});
