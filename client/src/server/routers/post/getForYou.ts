import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

import getForYouURL from '../../../utils/getForYouURL'

const getForYou = procedure
  .input(
    z.object({
      limit: z.number().optional(),
      cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      auth0Id: z.string().optional(),
    })
  )
  .query(async ({ input: { limit = 10, cursor, auth0Id } }) => {
    const data = await prisma.post.findMany({
      take: limit + 1,
      orderBy: { createdAt: 'desc' },
      cursor: cursor ? { createdAt_id: cursor } : undefined,
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

    const _data = await prisma.user.findUnique({
      where: { auth0Id },
      select: { id: true },
    })

    // const __data = await fetch(getForYouURL(_data?.id, 0, limit))

    // const response = await __data.json()

    // console.log(response, 'response')

    return { posts, nextCursor }
  })

export default getForYou
