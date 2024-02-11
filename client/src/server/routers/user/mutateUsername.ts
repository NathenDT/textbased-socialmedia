import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const mutateUsername = procedure
  .input(z.object({ username: z.string(), auth0Id: z.string() }))
  .mutation(async ({ input: { username, auth0Id } }) => {
    const data = await prisma.user.update({
      where: { auth0Id },
      data: { username },
      select: { username: true },
    })

    return { data }
  })

export default mutateUsername
