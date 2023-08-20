'use client'

import { useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

interface ImageLoaderWrapperProps {
  children: React.ReactNode
  id: string
}

export default function ImageLoaderWrapper({
  children,
  id,
}: ImageLoaderWrapperProps) {
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setElement(document.getElementById(id))
  }, [id])

  if (!element) return
  if (typeof window !== 'object') return

  const el = document.getElementById(id) as HTMLElement
  return createPortal(children, el)
}
