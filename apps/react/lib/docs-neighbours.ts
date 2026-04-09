type PageNode = {
  name: string
  url?: string
  children?: PageNode[]
}

function flatten(nodes: PageNode[], items: Array<{ name: string; url: string }> = []) {
  for (const node of nodes) {
    if (node.url) {
      items.push({ name: node.name, url: node.url })
    }
    if (node.children?.length) {
      flatten(node.children, items)
    }
  }
  return items
}

export function getNeighbours(tree: PageNode, currentUrl: string) {
  const pages = flatten(tree.children ?? []).filter((page) => page.url.startsWith("/docs"))
  const index = pages.findIndex((page) => page.url === currentUrl)

  return {
    previous: index > 0 ? pages[index - 1] : null,
    next: index >= 0 && index < pages.length - 1 ? pages[index + 1] : null,
  }
}
