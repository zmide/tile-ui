import Link from 'next/link';

type PageTreeNode = {
	type?: string;
	name?: unknown;
	url?: string;
	children?: PageTreeNode[];
};

function getNodeName(name: unknown) {
	return typeof name === 'string' ? name : '';
}

function buildGroups(nodes: PageTreeNode[]) {
	return nodes
		.filter((node) => node.url !== '/docs')
		.map((node) => {
			const pages = (node.children ?? [])
				.filter((child) => child.url)
				.map((child) => ({
					name: getNodeName(child.name),
					url: child.url as string,
				}));

			if (node.url) {
				pages.unshift({ name: getNodeName(node.name), url: node.url });
			}

			return {
				name: getNodeName(node.name),
				pages,
			};
		})
		.filter((group) => group.pages.length > 0);
}

export function DocsSidebar({ tree, pathname }: { tree: PageTreeNode; pathname: string }) {
	const groups = buildGroups(tree.children ?? []);

	return (
		<aside className="docs-sidebar">
			<div className="docs-sidebar__inner">
				<div className="docs-sidebar__group docs-sidebar__group--intro">
					<p className="docs-sidebar__label" style={{ marginTop: 0 }}>
						Sections
					</p>
					<nav className="docs-sidebar__nav">
						<Link href="/docs" className="docs-sidebar__link" data-active={pathname === '/docs'}>
							Overview
						</Link>
					</nav>
				</div>
				{groups.map((group) => (
					<div key={group.name} className="docs-sidebar__group">
						<p className="docs-sidebar__label">{group.name}</p>
						<nav className="docs-sidebar__nav">
							{group.pages.map((page) => (
								<Link key={page.url} href={page.url} className="docs-sidebar__link" data-active={pathname === page.url}>
									{page.name}
								</Link>
							))}
						</nav>
					</div>
				))}
			</div>
		</aside>
	);
}
