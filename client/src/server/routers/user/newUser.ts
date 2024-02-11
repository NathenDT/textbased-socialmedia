import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'
import { TRPCError } from '@trpc/server'

const newUser = procedure
  .input(
    z.object({
      auth0Id: z.string(),
      username: z.string(),
    })
  )
  .mutation(async ({ input: { auth0Id, username } }) => {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Username taken',
      })
    }

    const user = await prisma.user.create({
      data: { auth0Id, username },
    })

    return { user }
  })

export default newUser
