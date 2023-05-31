'use client'

import { useEffect, useState } from 'react'

import CommentForm from '@/components/CommentForm'
import CommentItem from '@/components/CommentItem'
import PostItem from '@/components/PostItem'

type Props = {
  params: { id: string }
}

export default function PostPage({ params: { id } }: Props) {
  const [comment, setComment] = useState('')

  return (
    <div className="flex flex-col">
      <PostItem
        postInfo={{
          id: '1234',
          username: 'Nathen20',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          createdAt: '2023-05-24T23:54:06.857Z',
          commentIds: [],
          likeIds: [],
        }}
      />

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
