import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

import Avatar from './Avatar'

import formateDate from '@/utils/formatDate'

type Props = {
  postInfo: PostInfoType
}

export default function PostItem({ postInfo }: Props) {
  const router = useRouter()

  const handleClick = () =>
    router.push(`/@${postInfo.username}/post/${postInfo.id}`)

  return (
    <div
      className="flex m-2 border rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <Avatar username={postInfo.username} className="m-2" />

      <div className="flex flex-col grow">
        <p className="m-2 mb-0 text-sm">
          <span className="font-semibold text-base">{postInfo.username}</span>{' '}
          {formateDate(postInfo.createdAt)}
        </p>

        <p className="mx-2 grow">{postInfo.text}</p>

        <div className="flex grow justify-end m-2">
          <div className="flex mx-2 p-2">
            <FaRegComment className="h-5 w-5" />

            <p className="inline-block ml-2">{postInfo.commentIds.length}</p>
          </div>

          <button className="flex mx-2 border rounded-md p-2">
            <FaRegHeart className="h-5 w-5" />

            <p className="inline-block ml-2">{postInfo.likeIds.length}</p>
          </button>
        </div>
      </div>
    </div>
  )
}
