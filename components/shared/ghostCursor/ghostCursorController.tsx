'use client'

import { useState } from 'react'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import GhostCursor from './ghostCursor'
import { IMouse, IPosition } from './ghostCursor.types'

export default function GhostCursorController() {
  const isTablet = useBreakpoint({ query: '(max-width: 1199px)' })
  const [mouse, setMouse] = useState<IMouse>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    dir: '',
  })
  const [position, setPosition] = useState<IPosition>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  })

  return (
    <>
      {!isTablet && (
        <GhostCursor
          mouse={mouse}
          setMouse={setMouse}
          position={position}
          setPosition={setPosition}
        />
      )}
    </>
  )
}
