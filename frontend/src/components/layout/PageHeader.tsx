import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h1 className="mb-[2px]">{title}</h1>
        {subtitle && <p className="text-subtle m-0">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
