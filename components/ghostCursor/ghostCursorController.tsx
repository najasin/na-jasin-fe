'use client'

import { useEffect, useState } from 'react'

import GhostCursor from './ghostCursor'
import { IMouse, IPosition } from './ghostCursor.types'

export default function GhostCursorController() {
  const [mouse, setMouse] = useState<IMouse>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    dir: '',
  })
  const [position, setPosition] = useState<IPosition>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  })

  const [isClicked, setIsClicked] = useState<boolean>(false)

  const handleClick = () => {
    setIsClicked(true)

    setTimeout(() => {
      setIsClicked(false)
    }, 2000)
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return () => {
      window.addEventListener('click', handleClick)
    }
  }, [isClicked])

  return (
    <>
      {!isClicked && (
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
