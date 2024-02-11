import InfiniteScroll from 'react-infinite-scroll-component'

import PostItem from './PostItem'
import LoadingCircle from './LoadingCircle'

type Props = {
  posts: PostInfoType[] | undefined
  isLoading: boolean
  hasMore: boolean
  fetchNewPosts: () => void
}

export default function PostList({
  posts,
  isLoading,
  hasMore,
  fetchNewPosts,
}: Props) {
  if (isLoading)
    return (
      <>
        {Array.from({ length: 10 }).map((_, i) => (
          <PostItem key={i} loading />
        ))}
      </>
    )

  if (!posts || posts.length === 0)
    return <p className="mx-2 text-2xl">No Posts</p>

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNewPosts}
      hasMore={hasMore}
      loader={
        <div className="w-full justify-center">
          <LoadingCircle />
        </div>
      }
    >
      {posts.map((post) => (
        <PostItem key={post.id} info={post} />
      ))}
    </InfiniteScroll>
  )
}
