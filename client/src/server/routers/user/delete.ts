import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const _delete = procedure
  .input(z.object({ auth0Id: z.string() }))
  .mutation(async ({ input: { auth0Id } }) => {
    const data = await prisma.user.delete({
      where: { auth0Id },
      select: { username: true },
    })

    return { data }
  })

export default _delete
