import { z } from 'zod'

import { procedure, router } from '../trpc'
import { prisma } from '../prisma'

const post = router({
  new: procedure
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
    }),
  getPost: procedure
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
          _count: { select: { likes: true } },
          likes: auth0Id == null ? false : { where: { user: { auth0Id } } },
        },
      })

      if (data == null) throw new Error('Post not found')

      const post: PostInfoType = {
        id: data.id,
        username: data.user.username,
        content: data.content,
        createdAt: data.createdAt.toISOString(),
        commentCount: 0,
        likeCount: data._count.likes,
        likedByMe: data.likes.length > 0,
      }

      return { post }
    }),
  getForYou: procedure
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
          _count: { select: { likes: true } },
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
          commentCount: 0,
          likeCount: post._count.likes,
          likedByMe: auth0Id ? post.likes.length > 0 : false,
        }
      })

      return { posts, nextCursor }
    }),
  getFollowing: procedure
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
          _count: { select: { likes: true } },
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
          commentCount: 0,
          likeCount: post._count.likes,
          likedByMe: auth0Id ? post.likes.length > 0 : false,
        }
      })

      return { posts, nextCursor }
    }),
  getProfile: procedure
    .input(
      z.object({
        username: z.string(),
        auth0Id: z.string().optional(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { username, auth0Id, limit = 10, cursor } }) => {
      const user = await prisma.user.findUnique({
        where: { username },
      })

      if (!user) throw new Error('User not found')

      const data = await prisma.post.findMany({
        take: limit + 1,
        orderBy: { createdAt: 'desc' },
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        where: { userId: user.id },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: { username: true },
          },
          _count: { select: { likes: true } },
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
          commentCount: 0,
          likeCount: post._count.likes,
          likedByMe: auth0Id ? post.likes.length > 0 : false,
        }
      })

      return { posts, nextCursor }
    }),
  toggleLike: procedure
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
    }),
})

export default post
