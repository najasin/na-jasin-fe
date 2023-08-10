'user client'

import { HydrateProps, Hydrate as RQHydrate } from '@tanstack/react-query'

/**
 *
 * @description 클라이언트의 api 요청을 prefetching
 * @example
 * ```tsx
 * // page.tsx
 *
 * import QueryHydrate from "@/api/tanstack/queryHydrate.context";
 * import { getQueryClient } from "@/api/tanstack/tanstack.helpers";
 * import { dehydrate } from "@tanstack/react-query";
 *
 * export default async function Page({ children }: IPageProps){
 *   const queryClient = getQueryClient();
 *   await queryClient.prefetchQuery(["queryKey"], () => QueryFn(...));
 *   const dehydratedState = dehydrate(queryClient);
 *
 *   return (
 *     <QueryHydrate state={dehydratedState}>{children}</QueryHydrate>
 *   );
 * }
 * ```
 */
export default function QueryHydrate(props: HydrateProps) {
  return <RQHydrate {...props} />
}
