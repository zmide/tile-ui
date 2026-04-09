import type { ComponentType, ReactNode } from "react"

import { DocsBreadcrumb } from "../../common/components/docs-breadcrumb"

type TocItem = {
  title?: string
  url: string
  depth: number
}

type Neighbour = {
  name: string
  url: string
} | null

export function DocsPageShell({
  title,
  description,
  children,
  toc,
  previous,
  next,
  Toc,
  breadcrumbs,
  sectionLabel,
}: {
  title: string
  description?: string
  children: ReactNode
  toc: TocItem[]
  previous: Neighbour
  next: Neighbour
  Toc: ComponentType<{ toc: TocItem[] }>
  breadcrumbs: Array<{ label: string; href?: string }>
  sectionLabel?: string
}) {
  return (
    <div className="docs-page">
      <div className="docs-page__content">
        <div className="docs-page__header">
          <DocsBreadcrumb items={breadcrumbs} />
          {sectionLabel ? <p className="docs-page__section-label">{sectionLabel}</p> : null}
          <h1>{title}</h1>
          {description ? <p className="docs-page__description">{description}</p> : null}
        </div>
        <div className="docs-page__body prose-page">{children}</div>
        <div className="docs-page__footer">
          {previous ? (
            <a href={previous.url} className="card-link">
              <span className="eyebrow">Previous</span>
              <strong>{previous.name}</strong>
            </a>
          ) : <div />}
          {next ? (
            <a href={next.url} className="card-link">
              <span className="eyebrow">Next</span>
              <strong>{next.name}</strong>
            </a>
          ) : <div />}
        </div>
      </div>
      <aside className="docs-page__toc">{toc.length ? <Toc toc={toc} /> : null}</aside>
    </div>
  )
}
