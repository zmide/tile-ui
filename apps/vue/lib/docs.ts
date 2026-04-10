export type DocsTreeNode = {
	type: string;
	name: string;
	url?: string;
	children?: DocsTreeNode[];
};

export type DocTocItem = {
	title: string;
	url: string;
	depth: number;
};

export type DocsPageSummary = {
	url: string;
	title: string;
};

export type DocPayload = {
	doc: {
		url: string;
		title: string;
		description: string;
		html: string;
		toc: DocTocItem[];
	};
	neighbours: {
		previous: DocsPageSummary | null;
		next: DocsPageSummary | null;
	};
	tree: DocsTreeNode;
};
