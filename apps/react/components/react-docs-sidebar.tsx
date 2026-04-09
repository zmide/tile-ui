'use client';

import type { ComponentProps } from 'react';
import { usePathname } from 'next/navigation';

import { DocsSidebar } from './docs-sidebar';

type DocsSidebarTree = ComponentProps<typeof DocsSidebar>['tree'];

export function ReactDocsSidebar({ tree }: { tree: DocsSidebarTree }) {
	const pathname = usePathname();

	return <DocsSidebar tree={tree} pathname={pathname} />;
}
