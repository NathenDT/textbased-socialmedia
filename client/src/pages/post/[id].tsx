import { useUser } from '@auth0/nextjs-auth0/client'
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroll-component'

import CommentForm from '../../components/CommentForm'
import CommentItem from '../../components/CommentItem'
import LoadingCircle from '../../components/LoadingCircle'
import PostItem from '../../components/PostItem'

import formatAuth0Sub from '../../utils/formatAuth0Sub'
import { ssgHelper } from '../../server/ssgHelper'
import { trpc } from '../../utils/trpc'

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { user, isLoading: auth0IsLoading } = useUser()

  if (auth0IsLoading)
    return (
      <div className="w-full m-2 flex justify-center">
        <LoadingCircle />
      </div>
    )

  return (
    <>
      <Head>
        <title>Text Based - </title>
      </Head>

      <div className="flex flex-col">
        <Post postId={id} auth0Id={formatAuth0Sub(user)[1]} />

        <p className="mx-2 text-2xl">Comments</p>

        {!auth0IsLoading && user && <CommentForm postId={id} />}

        <CommentList postId={id} />
      </div>
    </>
  )
}

type PostProps = {
  postId: string
  auth0Id?: string
}

function Post({ postId, auth0Id }: PostProps) {
  const { data, isLoading } = trpc.post.getPost.useQuery({
    postId,
    auth0Id,
  })

  if (!data) return <p>Post not found</p>

  return <PostItem info={data.post} loading={isLoading} />
}

type CommentListProps = {
  postId: string
}

function CommentList({ postId }: CommentListProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    trpc.comment.getByPostId.useInfiniteQuery(
      {
        postId,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )

  if (isLoading)
    return (
      <div className="w-full flex justify-center m-2">
        <LoadingCircle />
      </div>
    )

  if (!data || data.pages.flatMap((page) => page.comments).length === 0)
    return <p className="m-2 text-2xl">No Comments</p>

  return (
    <InfiniteScroll
      dataLength={data.pages.length}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={
        <div className="w-full flex justify-center m-2">
          <LoadingCircle />
        </div>
      }
    >
      {data.pages
        .flatMap((page) => page.comments)
        .map((comment) => (
          <CommentItem key={comment.id} info={comment} className="m-2" />
        ))}
    </InfiniteScroll>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context.params?.id

  if (id == null) {
    return {
      redirect: {
        destination: '/',
      },
    }
  }

  const ssg = ssgHelper()
  await ssg.post.getPost.prefetch({ postId: id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  }
}

export default PostPage
