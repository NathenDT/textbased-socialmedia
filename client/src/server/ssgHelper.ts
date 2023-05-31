import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from './routers'
import superjson from 'superjson'
import { createInnerTRPCContext } from './trpc'

export function ssgHelper() {
  return createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ revalidateSSG: null }),
    transformer: superjson,
  })
}
