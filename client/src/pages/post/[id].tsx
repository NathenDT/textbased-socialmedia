import { useUser } from '@auth0/nextjs-auth0/client'
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Head from 'next/head'

import PostItem from '../../components/PostItem'

import { trpc } from '../../utils/trpc'
import { ssgHelper } from '../../server/ssgHelper'

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { user, isLoading: auth0IsLoading } = useUser()

  if (auth0IsLoading) return <p>Loading...</p>

  return (
    <>
      <Head>
        <title>Text Based - </title>
      </Head>

      <div className="flex flex-col">
        <Post postId={id} auth0Id={user?.sub?.split('|')[1]} />

        <p className="m-2 text-2xl">Comments</p>

        <p className="mx-2">Coming Soon</p>
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
