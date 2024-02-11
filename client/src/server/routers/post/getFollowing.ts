import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const getFollowing = procedure
  .input(
    z.object({
      auth0Id: z.string(),
      limit: z.number().optional(),
      cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
    })
  )
  .query(async ({ input: { auth0Id, limit = 10, cursor } }) => {
    const data = await prisma.post.findMany({
      take: limit + 1,
      orderBy: { createdAt: 'desc' },
      cursor: cursor ? { createdAt_id: cursor } : undefined,
      where: { user: { followers: { some: { auth0Id } } } },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: { username: true },
        },
        _count: { select: { likes: true, comments: true } },
        likes: auth0Id == null ? false : { where: { user: { auth0Id } } },
      },
    })

    let nextCursor: typeof cursor | undefined
    if (data.length > limit) {
      const nextItem = data.pop()
      if (nextItem != null) {
        nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt }
      }
    }

    const posts: PostInfoType[] = data.map((post) => {
      return {
        id: post.id,
        username: post.user.username,
        content: post.content,
        createdAt: post.createdAt.toISOString(),
        commentCount: post._count.comments,
        likeCount: post._count.likes,
        likedByMe: auth0Id ? post.likes.length > 0 : false,
      }
    })

    return { posts, nextCursor }
  })

export default getFollowing
