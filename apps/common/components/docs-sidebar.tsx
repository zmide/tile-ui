type PageTreeNode = {
  type: string
  name: string
  url?: string
  children?: PageTreeNode[]
}

function buildGroups(nodes: PageTreeNode[]) {
  return nodes
    .map((node) => {
      const pages = (node.children ?? [])
        .filter((child) => child.url)
        .map((child) => ({
          name: child.name,
          url: child.url as string,
        }))

      if (node.url) {
        pages.unshift({ name: node.name, url: node.url })
      }

      return {
        name: node.name,
        pages,
      }
    })
    .filter((group) => group.pages.length > 0)
}

export function DocsSidebar({ tree, pathname }: { tree: PageTreeNode; pathname: string }) {
  const groups = buildGroups(tree.children ?? [])

  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar__inner">
        <div className="docs-sidebar__group docs-sidebar__group--intro">
          <p className="docs-sidebar__label">Overview</p>
          <nav className="docs-sidebar__nav">
            <a href="/docs" className="docs-sidebar__link" data-active={pathname === '/docs'}>
              Introduction
            </a>
          </nav>
        </div>
        {groups.map((group) => (
          <div key={group.name} className="docs-sidebar__group">
            <p className="docs-sidebar__label">{group.name}</p>
            <nav className="docs-sidebar__nav">
              {group.pages.map((page) => (
                <a
                  key={page.url}
                  href={page.url}
                  className="docs-sidebar__link"
                  data-active={pathname === page.url}
                >
                  {page.name}
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  )
}
