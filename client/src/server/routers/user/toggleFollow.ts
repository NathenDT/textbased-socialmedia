import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const toggleFollow = procedure
  .input(z.object({ auth0Id: z.string(), username: z.string() }))
  .mutation(async ({ input: { auth0Id, username }, ctx }) => {
    const existingFollow = await prisma.user.findFirst({
      where: { username, followers: { some: { auth0Id } } },
    })

    if (!existingFollow) {
      throw new Error('User not found')
    }

    let addedFollow
    if (existingFollow == null) {
      await prisma.user.update({
        where: { username },
        data: { followers: { connect: { auth0Id } } },
      })
      addedFollow = true
    } else {
      await prisma.user.update({
        where: { username },
        data: { followers: { disconnect: { auth0Id } } },
      })
      addedFollow = false
    }

    return { addedFollow }
  })

export default toggleFollow
