type Crumb = {
	label: string;
	href?: string;
};

export function DocsBreadcrumb({ items }: { items: Crumb[] }) {
	if (!items.length) {
		return null;
	}

	return (
		<nav className="docs-breadcrumb" aria-label="Breadcrumb">
			{items.map((item, index) => (
				<span key={`${item.label}-${index}`} className="docs-breadcrumb__item">
					{item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
					{index < items.length - 1 ? <span className="docs-breadcrumb__separator">/</span> : null}
				</span>
			))}
		</nav>
	);
}
