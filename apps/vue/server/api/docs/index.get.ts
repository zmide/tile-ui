import { getAllDocs, getDocBySlug, getDocNeighbours } from '../../utils/docs';

function toTree() {
  return {
    type: 'folder',
    name: 'docs',
    children: getAllDocs().map((doc) => ({
      type: 'page',
      name: doc.title,
      url: doc.url,
    })),
  };
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
