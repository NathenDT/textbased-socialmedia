import { z } from 'zod'

import { procedure } from '../../trpc'
import { prisma } from '../../prisma'

const getByUsername = procedure
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
  })

export default getByUsername
