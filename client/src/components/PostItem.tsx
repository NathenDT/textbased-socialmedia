import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Avatar from './Avatar'

type Props = {
  post: PostType
}

export default function PostItem({ post }: Props) {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    setUser({
      id: '1234',
      username: 'Nathen20',
    })
  }, [])

  if (!user) return <p>Loading...</p>

  const handleClick = () => router.push(`/@${user.username}/post/${post.id}`)

  return (
    <div
      className="flex flex-col m-2 border rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex">
        <Avatar username={user.username} className="m-2" />
        <div className="grow">
          <p className="m-2 font-bold">{user.username}</p>

          <p className="m-2 mt-0 grow">{post.text}</p>
        </div>
      </div>

      <div className="flex grow justify-end m-2">
        <button className="flex m-2 border rounded-md p-2">
          <FaRegComment className="h-5 w-5" />

          <p className="inline-block ml-2">{post.commentIds.length}</p>
        </button>

        <button className="flex m-2 border rounded-md p-2">
          <FaRegHeart className="h-5 w-5" />

          <p className="inline-block ml-2">{post.likeIds.length}</p>
        </button>
      </div>
    </div>
  )
}
