import { useUser } from '@auth0/nextjs-auth0/client'
import ErrorPage from 'next/error'
import Head from 'next/head'
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { useContext } from 'react'

import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import PostList from '../../components/PostList'

import { trpc } from '../../utils/trpc'
import { ssgHelper } from '../../server/ssgHelper'
import { NotLoggedInModalOpenContext } from '../../utils/context'

const UserPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  username,
}) => {
  const { setNotLoggedInModalOpen } = useContext(NotLoggedInModalOpenContext)

  const { user: auth0User, isLoading } = useUser()

  const user = trpc.user.getByUsername.useQuery({
    username,
    auth0Id: auth0User?.sub?.split('|')[1],
  })
  const trpcUtils = trpc.useContext()
  const toggleFollow = trpc.user.toggleFollow.useMutation({
    onSuccess: ({ addedFollow }) => {
      trpcUtils.user.getByUsername.setData(
        { username, auth0Id: auth0User?.sub?.split('|')[1] },
        (oldData) => {
          if (oldData == null) return

          const countModifier = addedFollow ? 1 : -1

          return {
            ...oldData,
            followerCount: oldData.followerCount + countModifier,
            isFollowing: addedFollow,
          }
        }
      )
    },
  })

  if (isLoading || !user.data) return <p>Loading...</p>

  if (!user?.data) return <ErrorPage statusCode={404} />

  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>

      <div className="flex flex-col w-full">
        <div className="flex m-2 border rounded-md">
          <Avatar username={user.data.username} size={4} className="m-2" />

          <div className="flex flex-col grow">
            <p className="text-3xl font-semibold m-2">{user.data.username}</p>

            <div className="flex">
              <p className="m-2">{user.data.followerCount} Follower</p>

              <p className="m-2">{user.data.followingCount} Following</p>

              <p className="m-2">{user.data.postCount} Posts</p>
            </div>
          </div>

          <div className="m-2">
            {auth0User?.sub?.split('|')[1] === user.data.auth0Id ? (
              <p className="m-2 p-2 border rounded-md">That's You</p>
            ) : (
              <FollowButton
                isLoading={toggleFollow.isLoading}
                isFollowing={user.data.isFollowing || false}
                onClick={() => {
                  if (!auth0User) {
                    setNotLoggedInModalOpen(true)
                    return
                  }

                  toggleFollow.mutate({
                    auth0Id: auth0User!.sub!.split('|')[1],
                    username,
                  })
                }}
              />
            )}
          </div>
        </div>

        <p className="m-2 text-2xl">Posts</p>

        <Posts
          username={user.data.username}
          auth0Id={auth0User?.sub?.split('|')[1]}
        />
      </div>
    </>
  )
}

type FollowButtonProps = {
  isLoading: boolean
  isFollowing: boolean
  onClick: () => void
}

function FollowButton({ isLoading, isFollowing, onClick }: FollowButtonProps) {
  return (
    <>
      {isFollowing ? (
        <Button disabled={isLoading} onClick={onClick}>
          Unfollow
        </Button>
      ) : (
        <Button disabled={isLoading} onClick={onClick}>
          Follow
        </Button>
      )}
    </>
  )
}

type PostsProps = {
  username: string
  auth0Id?: string
}

function Posts({ username, auth0Id }: PostsProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    trpc.post.getProfile.useInfiniteQuery(
      { username, auth0Id },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )

  return (
    <PostList
      posts={data?.pages.flatMap((page) => page.posts)}
      isLoading={isLoading}
      fetchNewPosts={fetchNextPage}
      hasMore={hasNextPage || false}
    />
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ username: string }>
) {
  const username = context.params?.username

  if (username == null) {
    return {
      redirect: {
        destination: '/',
      },
    }
  }

  const ssg = ssgHelper()
  await ssg.user.getByUsername.prefetch({ username })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  }
}

export default UserPage
