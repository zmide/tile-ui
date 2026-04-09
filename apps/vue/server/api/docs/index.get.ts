import { getAllDocs, getDocBySlug, getDocNeighbours } from '../../utils/docs';

type DocsTreeNode = {
	type: string;
	name: string;
	url?: string;
	children: DocsTreeNode[];
};

function toTree() {
	const root: DocsTreeNode = {
		type: 'folder',
		name: 'docs',
		children: [],
	};

	for (const doc of getAllDocs()) {
		let cursor = root;

		if (!doc.slug.length) {
			cursor.children.push({ type: 'page', name: doc.title, url: doc.url, children: [] });
			continue;
		}

		for (let index = 0; index < doc.slug.length; index += 1) {
			const segment = doc.slug[index];
			const isLast = index === doc.slug.length - 1;
			const isSectionIndex = isLast && doc.slug.length === 1;

			if (isSectionIndex) {
				let folder = cursor.children.find((child) => child.type === 'folder' && child.name === segment);
				if (!folder) {
					folder = { type: 'folder', name: segment, url: doc.url, children: [] };
					cursor.children.push(folder);
				} else {
					folder.url = doc.url;
				}
				continue;
			}

			if (isLast) {
				cursor.children.push({ type: 'page', name: doc.title, url: doc.url, children: [] });
				continue;
			}

			let folder = cursor.children.find((child) => child.type === 'folder' && child.name === segment);
			if (!folder) {
				folder = { type: 'folder', name: segment, children: [] };
				cursor.children.push(folder);
			}

			cursor = folder;
		}
	}

	return root;
}

export default defineEventHandler(() => {
	const slug: string[] = [];
	const doc = getDocBySlug(slug);

	if (!doc) {
		throw createError({ statusCode: 404, statusMessage: 'Doc not found' });
	}

	return {
		doc,
		neighbours: getDocNeighbours(slug),
		tree: toTree(),
	};
});
