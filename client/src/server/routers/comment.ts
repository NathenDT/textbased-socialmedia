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
    .input(
      z.object({
        postId: z.string(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
        auth0Id: z.string().optional(),
      })
    )
    .query(async ({ input: { postId, limit = 10, cursor, auth0Id } }) => {
      const data = await prisma.comment.findMany({
        take: limit + 1,
        orderBy: { createdAt: 'desc' },
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        where: { postId },
        select: {
          id: true,
          postId: true,
          content: true,
          createdAt: true,
          user: {
            select: { username: true },
          },
        },
      })

      let nextCursor: typeof cursor | undefined
      if (data.length > limit) {
        const nextItem = data.pop()
        if (nextItem != null) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt }
        }
      }

      const comments: CommentInfoType[] = data.map((comment) => ({
        id: comment.id,
        postId: comment.postId,
        username: comment.user.username,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        likeCount: 0,
      }))

      return { comments, nextCursor }
    }),
})

export default comment
