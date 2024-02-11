import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const toggleLike = procedure
  .input(z.object({ auth0Id: z.string(), postId: z.string() }))
  .mutation(async ({ input: { auth0Id, postId } }) => {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
    })

    const data = { userId: user!.id, postId }

    const like = await prisma.like.findUnique({
      where: { userId_postId: data },
    })

    if (like == null) {
      await prisma.like.create({ data })
      return { addedLike: true }
    } else {
      await prisma.like.delete({ where: { userId_postId: data } })
      return { addedLike: false }
    }
  })

export default toggleLike
