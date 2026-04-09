"use client"

import { useEffect, useMemo, useState } from "react"

type TocItem = {
  title?: string
  url: string
  depth: number
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    for (const id of itemIds) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [itemIds])

  return activeId
}

export function DocsTableOfContents({ toc }: { toc: TocItem[] }) {
  const itemIds = useMemo(() => toc.map((item) => item.url.replace("#", "")), [toc])
  const activeHeading = useActiveItem(itemIds)

  if (!toc.length) {
    return null
  }

  return (
    <div className="docs-toc">
      <p className="docs-toc__title">On This Page</p>
      {toc.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className="docs-toc__link"
          data-active={item.url === `#${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
    </div>
  )
}
