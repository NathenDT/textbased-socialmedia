import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const getPost = procedure
  .input(z.object({ postId: z.string(), auth0Id: z.string().optional() }))
  .query(async ({ input: { postId, auth0Id } }) => {
    const data = await prisma.post.findUnique({
      where: { id: postId },
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

    if (data == null) throw new Error('Post not found')

    const post: PostInfoType = {
      id: data.id,
      username: data.user.username,
      content: data.content,
      createdAt: data.createdAt.toISOString(),
      commentCount: data._count.comments,
      likeCount: data._count.likes,
      likedByMe: auth0Id ? data.likes.length > 0 : undefined,
    }

    return { post }
  })

export default getPost
