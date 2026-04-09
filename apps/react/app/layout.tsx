import type { Metadata } from 'next';
import Link from 'next/link';
import '@tile-ui/styles/scss/globals.scss';
import '../../common/styles/docs.scss';
import '../../common/styles/demo-showcase.scss';
import '../../common/styles/docs-layout.scss';

export const metadata: Metadata = {
	title: 'Tile UI React',
	description: 'React documentation, examples, and registry for Tile UI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div className="docs-app-shell">
					<header className="docs-app-header">
						<div className="docs-app-header__inner">
							<Link href="/" className="docs-app-brand">
								Tile UI React
							</Link>
							<nav className="docs-app-nav">
								<Link href="/docs">Docs</Link>
								<Link href="/docs/components">Components</Link>
								<Link href="/docs/registry">Registry</Link>
								<Link href="/docs/examples">Examples</Link>
							</nav>
						</div>
					</header>
					{children}
				</div>
			</body>
		</html>
	);
}
