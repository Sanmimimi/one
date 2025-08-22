import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useFloating, autoUpdate, offset, flip, shift, arrow } from '@floating-ui/react'
import styles from './styles.module.css'

interface Props {
  anchorEl?: HTMLElement | string
  id: string
  text: string
  delay?: number
  children: React.ReactElement
}

export default function Tooltip({ children, id, anchorEl, text, delay }: Props): JSX.Element {
  const [open, setOpen] = useState(false)
  const [container, setContainer] = useState<Element | null>(null)
  const arrowRef = useRef<HTMLElement | null>(null)
  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  })

  const timeout = useRef<number | null>(null)
  const tooltipId = `${id}_tooltip`

  useEffect(() => {
    if (anchorEl) {
      if (typeof anchorEl === 'string') {
        setContainer(document.querySelector(anchorEl))
      }
      else {
        setContainer(anchorEl)
      }
    }
    else {
      setContainer(document.body)
    }
  }, [anchorEl])

  useEffect(() => {
    const showEvents = ['mouseenter', 'focus']
    const hideEvents = ['mouseleave', 'blur']

    const handleOpen = () => {
      // There is no point in displaying an empty tooltip.
      if (text === '') {
        return
      }

      // Remove the title ahead of time to avoid displaying
      // two tooltips at the same time (native + this one).
      refs.reference.current?.removeAttribute('title')

      timeout.current = window.setTimeout(() => {
        setOpen(true)
      }, delay || 300)
    }

    const handleClose = () => {
      clearInterval(timeout.current!)
      setOpen(false)
    }

    if (refs.reference.current) {
      showEvents.forEach((event) => {
        refs.reference.current?.addEventListener(event, handleOpen)
      })

      hideEvents.forEach((event) => {
        refs.reference.current?.addEventListener(event, handleClose)
      })
    }

    return () => {
      if (refs.reference.current) {
        showEvents.forEach((event) => {
          refs.reference.current?.removeEventListener(event, handleOpen)
        })

        hideEvents.forEach((event) => {
          refs.reference.current?.removeEventListener(event, handleClose)
        })
      }
    }
  }, [refs.reference, text, delay])

  return (
    <>
      {React.cloneElement(children, {
        'ref': refs.setReference,
        'aria-describedby': open ? tooltipId : undefined,
      })}
      {container
        ? ReactDOM.createPortal(
            open && (
              <div
                id={tooltipId}
                role="tooltip"
                ref={refs.setFloating}
                className={styles.tooltip}
                style={floatingStyles}
              >
                {text}
                <span ref={arrowRef} className={styles.tooltipArrow} />
              </div>
            ),
            container,
          )
        : container}
    </>
  )
}
