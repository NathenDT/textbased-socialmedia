import { z } from 'zod'

import { procedure, router } from '../trpc'
import { prisma } from '../prisma'

const user = router({
  getByAuth0Id: procedure
    .input(z.object({ auth0Id: z.string() }))
    .query(async ({ input: { auth0Id } }) => {
      const user = await prisma.user.findUnique({
        where: { auth0Id },
        select: { username: true },
      })

      return { user }
    }),
  getByUsername: procedure
    .input(z.object({ username: z.string(), auth0Id: z.string().optional() }))
    .query(async ({ input: { username, auth0Id } }) => {
      const data = await prisma.user.findUnique({
        where: { username },
        select: {
          auth0Id: true,
          username: true,
          _count: {
            select: { followers: true, following: true, posts: true },
          },
          followers: auth0Id == null ? undefined : { where: { auth0Id } },
        },
      })

      if (data == null) throw new Error('User not found')

      const user: UserInfoType = {
        auth0Id: data.auth0Id,
        username: data.username,
        postCount: data._count.posts,
        followerCount: data._count.followers,
        followingCount: data._count.following,
        isFollowing: data.followers.length > 0,
      }

      return { ...user }
    }),
  new: procedure
    .input(
      z.object({
        auth0Id: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input: { auth0Id, username } }) => {
      const user = await prisma.user.create({
        data: { auth0Id, username },
      })

      return { user }
    }),
  toggleFollow: procedure
    .input(z.object({ auth0Id: z.string(), username: z.string() }))
    .mutation(async ({ input: { auth0Id, username }, ctx }) => {
      const existingFollow = await prisma.user.findFirst({
        where: { username, followers: { some: { auth0Id } } },
      })

      if (!user) {
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
    }),
})

export default user
