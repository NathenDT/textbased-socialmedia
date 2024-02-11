import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const newPost = procedure
  .input(
    z.object({
      auth0Id: z.string(),
      content: z.string(),
    })
  )
  .mutation(async ({ input: { auth0Id, content } }) => {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
    })

    if (!user) throw new Error('User not found')

    const data = await prisma.post.create({
      data: {
        content,
        user: {
          connect: { id: user?.id },
        },
      },
    })

    const post: PostInfoType = {
      id: data.id,
      username: user.username,
      content: data.content,
      createdAt: data.createdAt.toISOString(),
      commentCount: 0,
      likeCount: 0,
    }

    return { post }
  })

export default newPost
