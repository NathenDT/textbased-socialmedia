import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const getByAuth0Id = procedure
  .input(z.object({ auth0Id: z.string() }))
  .query(async ({ input: { auth0Id } }) => {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      select: { username: true },
    })

    return { user }
  })

export default getByAuth0Id
