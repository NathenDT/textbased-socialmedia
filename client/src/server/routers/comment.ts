import { z } from 'zod'

import { procedure, router } from '../trpc'
import { prisma } from '../prisma'

const comment = router({
  new: procedure
    .input(
      z.object({
        auth0Id: z.string(),
        postId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input: { auth0Id, postId, content } }) => {
      const user = await prisma.user.findUnique({
        where: { auth0Id },
      })

      if (!user) throw new Error('User not found')

      const data = await prisma.comment.create({
        data: {
          content,
          user: {
            connect: { id: user?.id },
          },
          post: {
            connect: { id: postId },
          },
        },
      })

      const comment: CommentInfoType = {
        id: data.id,
        postId: data.postId,
        username: user.username,
        content: data.content,
        createdAt: data.createdAt.toISOString(),
        likeCount: 0,
      }

      return { comment }
    }),
  getByPostId: procedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input: { postId } }) => {
      const data = await prisma.comment.findMany({
        where: { postId },
        include: { user: true },
      })

      const comments: CommentInfoType[] = data.map((comment) => ({
        id: comment.id,
        postId: comment.postId,
        username: comment.user.username,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        likeCount: 0,
      }))

      return { comments }
    }),
})

export default comment
