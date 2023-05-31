import InfiniteScroll from 'react-infinite-scroll-component'

import PostItem from './PostItem'

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
  if (isLoading) return <p>Loading...</p>

  if (!posts || posts.length === 0) return <p>No Posts</p>

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNewPosts}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
    >
      {posts.map((post) => (
        <PostItem key={post.id} postInfo={post} />
      ))}
    </InfiniteScroll>
  )
}
