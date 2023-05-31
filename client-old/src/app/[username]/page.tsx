'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import PostItem from '@/components/PostItem'

type Props = {
  params: { username: string }
}

export default function UserPage({ params: { username } }: Props) {
  const [isUsername, setIsUsername] = useState(true)
  const [user, setUser] = useState<UserInfoType | null>(null)
  const [posts, setPosts] = useState<PostInfoType[] | null>(null)

  useEffect(() => {
    if (!username.startsWith('%40')) setIsUsername(false)

    setUser({
      id: '1234',
      username: 'Nathen20',
      postIds: [],
      followersIds: [],
      followingIds: [],
    })

    setPosts([
      {
        id: '1234',
        username: 'Nathen20',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        createdAt: '2023-05-24T23:54:06.857Z',
        commentIds: [],
        likeIds: [],
      },
    ])
  }, [])

  if (!isUsername) return notFound()

  if (!user) return <p>Loading...</p>

  return (
    <div className="flex flex-col w-full">
      <div className="flex m-2 border rounded-md">
        <Avatar username={user.username} size={4} className="m-2" />

        <div className="flex flex-col grow">
          <p className="text-3xl font-semibold m-2">{user.username}</p>

          <div className="flex">
            <p className="m-2">{user.followersIds?.length} Follower</p>

            <p className="m-2">{user.followingIds?.length} Following</p>
          </div>
        </div>

        <div className="m-2">
          <Button>Follow</Button>
        </div>
      </div>

      <p className="m-2 text-2xl">Posts</p>

      {posts?.map((post) => (
        <PostItem key={post.id} postInfo={post} />
      ))}
    </div>
  )
}