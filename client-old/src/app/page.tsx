'use client'

import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import PostForm from '@/components/PostForm'
import PostItem from '@/components/PostItem'

export default function Home() {
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState<PostInfoType[]>([])

  useEffect(() => {
    setPosts([
      {
        id: '1234',
        username: 'Nathen20',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        createdAt: '2023-05-25T00:04:30.448Z',
        commentIds: [],
        likeIds: [],
      },
      {
        id: '1234',
        username: 'Nathen20',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        createdAt: '2023-05-25T00:04:30.448Z',
        commentIds: [],
        likeIds: [],
      },
      {
        id: '1234',
        username: 'Nathen20',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        createdAt: '2023-05-25T00:04:30.448Z',
        commentIds: [],
        likeIds: [],
      },
      {
        id: '1234',
        username: 'Nathen20',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        createdAt: '2023-05-25T00:04:30.448Z',
        commentIds: [],
        likeIds: [],
      },
      {
        id: '1234',
        username: 'Nathen20',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        createdAt: '2023-05-25T00:04:30.448Z',
        commentIds: [],
        likeIds: [],
      },
      {
        id: '1234',
        username: 'Nathen20',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        createdAt: '2023-05-25T00:04:30.448Z',
        commentIds: [],
        likeIds: [],
      },
    ])
  }, [])

  return (
    <div className="flex flex-col">
      <PostForm
        postText={postText}
        setPostText={setPostText}
        handlePost={() => console.log('post')}
      />

      <div className="flex grow justify-center m-2">
        <Button className="rounded-r-none border">Following</Button>
        <Button active={true} className="rounded-l-none border">
          For You
        </Button>
      </div>

      {posts.map((post) => (
        <PostItem key={post.id} postInfo={post} />
      ))}
    </div>
  )
}
