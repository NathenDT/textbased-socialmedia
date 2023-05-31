import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import CommentForm from '../../components/CommentForm'
import CommentItem from '../../components/CommentItem'
import PostItem from '../../components/PostItem'

import { trpc } from '../../utils/trpc'

export default function PostPage() {
  const router = useRouter()

  const { id } = router.query as { id: string }

  const { user, isLoading: auth0IsLoading } = useUser()

  const [comment, setComment] = useState('')

  if (auth0IsLoading) return <p>Loading...</p>

  return (
    <div className="flex flex-col">
      <Post postId={id} auth0Id={user?.sub?.split('|')[1] ?? ''} />

      <p className="m-2 text-2xl">Comments</p>

      <CommentForm
        value={comment}
        setValue={setComment}
        className="border rounded-md m-2"
      />

      <CommentItem
        commentInfo={{
          id: '1234',
          username: 'Nathen20',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          createdAt: '2023-05-24T23:54:06.857Z',
          postId: '1234',
          likeIds: [],
          replyIds: ['1234'],
        }}
      />
    </div>
  )
}

type PostProps = {
  postId: string
  auth0Id: string
}

function Post({ postId, auth0Id }: PostProps) {
  const { data, isLoading } = trpc.post.getPost.useQuery({
    postId,
    auth0Id,
  })

  if (isLoading) return <p>Loading...</p>

  if (!data) return <p>Post not found</p>

  return <PostItem postInfo={data.post} />
}
