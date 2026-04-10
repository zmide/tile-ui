import type { Metadata } from 'next';
import Link from 'next/link';
import '@tile-ui/styles/scss/globals.scss';
import '../../common/styles/docs.scss';
import '../../common/styles/demo-showcase.scss';
import '../../common/styles/docs-layout.scss';

function GitHubIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path
				fill="currentColor"
				d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.344-3.369-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .269.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
			/>
		</svg>
	);
}

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
							<div className="docs-app-header__actions">
								<nav className="docs-app-nav">
									<Link href="/docs">Docs</Link>
									<Link href="/docs/components">Components</Link>
									<Link href="/docs/registry">Registry</Link>
									<Link href="/docs/examples">Examples</Link>
								</nav>
								<div className="docs-app-header__divider" aria-hidden="true" />
								<a
									href="https://github.com/ice909/tile-ui"
									target="_blank"
									rel="noreferrer"
									className="docs-app-github"
									aria-label="Tile UI GitHub repository"
								>
									<GitHubIcon />
									<span>Source code</span>
								</a>
							</div>
						</div>
					</header>
					{children}
				</div>
			</body>
		</html>
	);
}
