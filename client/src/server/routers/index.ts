import { router } from '../trpc'

import comment from './comment'
import user from './user'
import post from './post'

export const appRouter = router({
  user,
  post,
  comment,
})

// export type definition of API
export type AppRouter = typeof appRouter
