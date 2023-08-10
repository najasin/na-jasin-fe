import { cache } from 'react'

import { QueryClient } from '@tanstack/react-query'

// tanstack query options
const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}
// caching query client
const getQueryClient = cache(() => new QueryClient(queryClientOptions))

export { queryClientOptions, getQueryClient }
