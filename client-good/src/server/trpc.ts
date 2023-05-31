import { initTRPC } from '@trpc/server'
import { prisma } from './prisma'

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create()

// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure

type CreateContextOptions = {
  revalidateSSG:
    | ((
        urlPath: string,
        opts?:
          | {
              unstable_onlyGenerated: boolean | undefined
            }
          | undefined
      ) => Promise<void>)
    | null
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    revalidateSSG: opts.revalidateSSG,
    prisma,
  }
}
