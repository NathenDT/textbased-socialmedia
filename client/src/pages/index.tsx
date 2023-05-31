import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'

import Button from '../components/Button'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

import { trpc } from '../utils/trpc'

export default function Index() {
  const { user, isLoading: auth0IsLoading } = useUser()

  const [tab, setTab] = useState<'following' | 'for-you'>('for-you')

  if (auth0IsLoading) return <p>Loading...</p>

  return (
    <div className="flex flex-col">
      <PostForm />

      <div className="flex grow justify-center m-2">
        <Button
          active={tab === 'following'}
          onClick={() => setTab('following')}
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
