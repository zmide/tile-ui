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

export default defineEventHandler((event) => {
  const slugParam = getRouterParam(event, 'slug');
  const slug = slugParam ? slugParam.split('/').filter(Boolean) : [];
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
