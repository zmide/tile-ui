import docsData from '../.generated/docs.json';

import type { DocPayload } from './docs';

type DocsData = {
	routes: string[];
	payloads: Record<string, DocPayload>;
};

const staticDocs = docsData as DocsData;

export function getAllDocRoutes() {
	return staticDocs.routes;
}

export function getDocPayload(slug: string[]) {
	return staticDocs.payloads[slug.join('/')] ?? null;
}
