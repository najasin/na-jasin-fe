'use client'

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

const GhostCursor = dynamic(
  () => import('@/components/ghostCursor/ghostCursor'),
  {
    ssr: false,
  },
)

export default function GhostCursorController() {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)

    setTimeout(() => {
      setIsClicked(false)
    }, 1000)
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return () => {
      window.addEventListener('click', handleClick)
    }
  }, [isClicked])

  return <>{!isClicked && <GhostCursor />}</>
}
