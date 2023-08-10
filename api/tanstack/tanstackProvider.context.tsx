'use client'

import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { queryClientOptions } from '@/api/tanstack/tanstack.helpers'

import { ITanstackProvidersProps } from './tanstack.types'

export default function TanstackProviders({
  children,
}: ITanstackProvidersProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
