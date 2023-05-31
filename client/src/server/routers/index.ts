import { z } from 'zod'

import { procedure, router } from '../trpc'
import { prisma } from '../prisma'

import user from './user'
import post from './post'

export const appRouter = router({
  user,
  post,
})

// export type definition of API
export type AppRouter = typeof appRouter
