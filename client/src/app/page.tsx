'use client'

import { useState } from 'react'

import Button from '@/components/Button'
import PostForm from '@/components/PostForm'
import PostItem from '@/components/PostItem'

export default function Home() {
  const [postText, setPostText] = useState('')

  return (
    <div className="flex flex-col">
      <PostForm
        postText={postText}
        setPostText={setPostText}
        handlePost={() => console.log('post')}
      />

      <div className="flex grow justify-center">
        <Button className="m-2">Following</Button>
        <Button className="m-2">For You</Button>
      </div>

      <PostItem
        post={{
          id: '1234',
          userId: '1234',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          createdAt: 'today',
          commentIds: [],
          likeIds: [],
        }}
      />
    </div>
  )
}
