import Link from '@docusaurus/Link'
import { cn } from '@site/src/lib/utils'
import type { Props } from '@theme/Tag'
import React from 'react'

import styles from './styles.module.css'

export default function Tag({ permalink, label, count, className, onClick }: Props & { className?: string; onClick?: (e: React.MouseEvent) => void }): JSX.Element {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      e.stopPropagation()
      onClick(e)
    }
  }

  return (
    <Link href={permalink} className={cn(styles.tag, count ? styles.tagWithCount : styles.tagRegular, className)} onClick={handleClick}>
      {label}
      {count && <span>{count}</span>}
    </Link>
  )
}
