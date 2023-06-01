import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import Head from 'next/head'
import { useContext, useState } from 'react'

import Button from '../components/Button'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

import { trpc } from '../utils/trpc'
import { NotLoggedInModalOpenContext } from '../utils/context'

export default function Index() {
  const { setNotLoggedInModalOpen } = useContext(NotLoggedInModalOpenContext)

  const { user, isLoading: auth0IsLoading } = useUser()

  const [tab, setTab] = useState<'following' | 'for-you'>('for-you')

  const handleToggleFollowing = () => {
    if (auth0IsLoading) return

    if (!user) {
      setNotLoggedInModalOpen(true)
      return
    }

    setTab('following')
  }

  return (
    <>
      <Head>
        <title>Text Based - Home</title>
      </Head>

      <div className="flex flex-col">
        <PostForm />

        <div className="flex grow justify-center m-2">
          <Button
            active={tab === 'following'}
            onClick={handleToggleFollowing}
            className="rounded-r-none border"
          >
            Following
          </Button>

          <Button
            active={tab === 'for-you'}
            onClick={() => setTab('for-you')}
            className="rounded-l-none border"
          >
            For You
          </Button>
        </div>

        {tab === 'for-you' ? <ForYou user={user} /> : <Following user={user} />}
      </div>
    </>
  )
}

type ForYouProps = {
  user: UserProfile | undefined
}

function ForYou({ user }: ForYouProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    trpc.post.getForYou.useInfiniteQuery(
      { auth0Id: user?.sub?.split('|')[1] },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )

  return (
    <PostList
      posts={data?.pages.flatMap((page) => page.posts)}
      isLoading={isLoading}
      fetchNewPosts={fetchNextPage}
      hasMore={hasNextPage ?? true}
    />
  )
}

type FollowingProps = {
  user: UserProfile | undefined
}

function Following({ user }: FollowingProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    trpc.post.getFollowing.useInfiniteQuery(
      { auth0Id: user!.sub!.split('|')[1] },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )

  return (
    <PostList
      posts={data?.pages.flatMap((page) => page.posts)}
      isLoading={isLoading}
      fetchNewPosts={fetchNextPage}
      hasMore={hasNextPage ?? true}
    />
  )
}
