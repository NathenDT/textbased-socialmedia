import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'

import Button from './Button'
import TextArea from './TextArea'

import classNames from '../utils/classNames'
import formatAuth0Sub from '../utils/formatAuth0Sub'
import { trpc } from '../utils/trpc'

type Props = React.HTMLProps<HTMLDivElement> & {
  postId: string
  className?: string
}

export default function CommentForm({ postId, className, ...rest }: Props) {
  const { user, isLoading } = useUser()

  const trpcUtils = trpc.useContext()
  const { mutate } = trpc.comment.new.useMutation({
    onSuccess: (newComment) => {
      setContent('')

      trpcUtils.comment.getByPostId.setInfiniteData({ postId }, (oldData) => {
        if (oldData == null || oldData.pages[0] == null) return

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              comments: [newComment.comment, ...oldData.pages[0].comments],
            },
            ...oldData.pages.slice(1),
          ],
        }
      })
    },
  })

  const [content, setContent] = useState('')

  if (isLoading || !user) return null

  const handleComment = () => {
    if (!user?.sub || isLoading) return

    mutate({ postId, content, auth0Id: formatAuth0Sub(user)[1] })
  }

  return (
    <div className={classNames('flex flex-col', className)} {...rest}>
      <TextArea
        placeholder={'Write a comment...'}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="grow m-2"
      />

      <div className="flex grow justify-end">
        <Button
          disabled={!content}
          onClick={handleComment}
          className="m-2 mt-0"
        >
          Comment
        </Button>
      </div>
    </div>
  )
}
