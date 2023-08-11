'use client'

import { useEffect, useState } from 'react'

import { useMediaQuery } from 'react-responsive'

interface HookProps {
  query: string
}

export default function useBreakpoint(settings: HookProps) {
  const [mounted, setMounted] = useState(false)
  const value = useMediaQuery(settings)
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? value : false
}
