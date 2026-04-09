import type { ReactNode } from 'react'

export function ComponentPreview({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="component-preview">
      <div className="component-preview__meta">
        <p className="component-preview__eyebrow">Preview</p>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="component-preview__surface">{children}</div>
    </div>
  )
}
