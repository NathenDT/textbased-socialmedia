import { useUser } from '@auth0/nextjs-auth0/client'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc'

import Avatar from './Avatar'

import formateDate from '../utils/formatDate'

type Props = {
  postInfo: PostInfoType
}

export default function PostItem({ postInfo }: Props) {
  const router = useRouter()

  const handleClick = () => router.push(`/post/${postInfo.id}`)

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

        <p className="mx-2 grow">{postInfo.content}</p>

        <div className="flex grow justify-end m-2">
          <div className="flex mx-2 p-2">
            <FaRegComment className="h-5 w-5" />

            <p className="inline-block ml-2">{postInfo.commentCount}</p>
          </div>

          <LikeButton
            postId={postInfo.id}
            likeCount={postInfo.likeCount}
            username={postInfo.username}
            liked={postInfo.likedByMe}
          />
        </div>
      </div>
    </div>
  )
}

type LikeButtonProps = {
  postId: string
  likeCount: number
  username: string
  liked?: boolean
}

function LikeButton({ postId, likeCount, username, liked }: LikeButtonProps) {
  const { user, isLoading } = useUser()
  const trpcUtils = trpc.useContext()
  const { mutate } = trpc.post.toggleLike.useMutation({
    onSuccess: ({ addedLike }) => {
      const updateData: Parameters<
        typeof trpcUtils.post.getForYou.setInfiniteData
      >[1] = (oldData) => {
        if (oldData == null) return

        const countModifier = addedLike ? 1 : -1

        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              posts: page.posts.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    likeCount: post.likeCount + countModifier,
                    likedByMe: addedLike,
                  }
                }

                return post
              }),
            }
          }),
        }
      }

      trpcUtils.post.getForYou.setInfiniteData(
        { auth0Id: user!.sub!.split('|')[1] },
        updateData
      )

      trpcUtils.post.getProfile.setInfiniteData(
        { username, auth0Id: user!.sub!.split('|')[1] },
        updateData
      )
    },
  })

  if (isLoading) return <p>Loading...</p>

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    mutate({ postId, auth0Id: user!.sub!.split('|')[1] })
  }

  const _className = `flex mx-2 border rounded-md p-2 ${
    liked ? 'border-red-500 text-red-500' : ''
  }`

  return (
    <button onClick={handleClick} className={_className}>
      <FaRegHeart className="h-5 w-5" />

      <p className="inline-block ml-2">{likeCount}</p>
    </button>
  )
}
