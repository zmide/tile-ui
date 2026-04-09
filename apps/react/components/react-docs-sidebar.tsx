"use client"

import { usePathname } from "next/navigation"

import { DocsSidebar } from "../../common/components/docs-sidebar"

type PageTreeNode = {
  type: string
  name: string
  url?: string
  children?: PageTreeNode[]
}

export function ReactDocsSidebar({ tree }: { tree: PageTreeNode }) {
  const pathname = usePathname()

  return <DocsSidebar tree={tree} pathname={pathname} />
}
