import { useUser } from '@auth0/nextjs-auth0/client'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import Avatar from './Avatar'
import IconButton from './IconButton'

import classNames from '../utils/classNames'
import formatAuth0Sub from '../utils/formatAuth0Sub'
import formateDate from '../utils/formatDate'
import { trpc } from '../utils/trpc'
import { NotLoggedInModalOpenContext } from '../utils/context'

type Props = {
  info?: PostInfoType
  loading?: boolean
}

export default function PostItem({ info, loading = false }: Props) {
  const router = useRouter()

  const handleClick = () => {
    if (loading || !info) return

    router.push(`/post/${info.id}`)
  }

  return (
    <div
      className="flex m-2 border rounded-md cursor-pointer"
      onClick={handleClick}
    >
      {loading || !info ? (
        <Avatar loading className="m-2" />
      ) : (
        <Avatar username={info.username} className="m-2" />
      )}

      <div className="flex flex-col grow">
        {loading || !info ? (
          <div className="animate-pulse h-5 w-24 m-2 bg-slate-500 rounded"></div>
        ) : (
          <p className="m-2 mb-0 text-sm">
            <span className="font-semibold text-base">{info.username}</span>{' '}
            {formateDate(info.createdAt)}
          </p>
        )}

        {loading || !info ? (
          <div className="animate-pulse h-10 grow mx-2 bg-slate-500 rounded"></div>
        ) : (
          <p className="mx-2 grow">{info.content}</p>
        )}

        <div className="flex grow justify-end m-2">
          <IconButton icon={FaRegComment} loading={loading}>
            {info?.commentCount}
          </IconButton>

          <LikeButton
            postId={info?.id}
            likeCount={info?.likeCount}
            username={info?.username}
            liked={info?.likedByMe}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

type LikeButtonProps = {
  postId?: string
  likeCount?: number
  username?: string
  liked?: boolean
  loading?: boolean
}

function LikeButton({
  postId,
  likeCount,
  username,
  liked,
  loading = false,
}: LikeButtonProps) {
  const { setNotLoggedInModalOpen } = useContext(NotLoggedInModalOpenContext)

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
          pages: oldData.pages.map((page) => ({
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
          })),
        }
      }

      trpcUtils.post.getForYou.setInfiniteData(
        { auth0Id: formatAuth0Sub(user)[1] },
        updateData
      )

      trpcUtils.post.getProfile.setInfiniteData(
        { username: username!, auth0Id: formatAuth0Sub(user)[1] },
        updateData
      )

      trpcUtils.post.getPost.setData(
        { postId: postId!, auth0Id: formatAuth0Sub(user)[1] },
        (oldData) => {
          if (oldData == null) return

          const countModifier = addedLike ? 1 : -1

          return {
            ...oldData,
            post: {
              ...oldData.post,
              likeCount: oldData.post.likeCount + countModifier,
              likedByMe: addedLike,
            },
          }
        }
      )
    },
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    if (!user?.sub) {
      setNotLoggedInModalOpen(true)
      return
    }

    mutate({ postId: postId!, auth0Id: formatAuth0Sub(user)[1] })
  }

  return (
    <IconButton
      icon={FaRegHeart}
      className={classNames(
        'flex mx-2 border rounded-md p-2',
        liked ? 'border-red-500 text-red-500' : ''
      )}
      loading={loading || isLoading}
      onClick={handleClick}
    >
      {likeCount}
    </IconButton>
  )
}
