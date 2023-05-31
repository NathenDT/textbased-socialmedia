import { useEffect, useState } from 'react'
import { FaRegHeart, FaReply } from 'react-icons/fa'

import Avatar from './Avatar'
import Button from './Button'
import CommentForm from './CommentForm'

import formateDate from '@/utils/formatDate'

type Props = React.HTMLProps<HTMLDivElement> & {
  commentInfo: CommentInfoType
  className?: string
}

export default function CommentItem({
  commentInfo,
  className,
  ...rest
}: Props) {
  const [showReplies, setShowReplies] = useState(false)
  const [replys, setReplys] = useState<CommentInfoType[]>([])

  useEffect(() => {
    setReplys([
      {
        id: '1234',
        username: 'Nathen20',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        createdAt: '2023-05-24T23:54:06.857Z',
        postId: '1234',
        likeIds: [],
      },
    ])
  }, [])

  return (
    <div className="flex flex-col m-2 border rounded-md">
      <Comment
        commentInfo={commentInfo}
        parent
        showReplies={showReplies}
        handleRepliesClick={() => setShowReplies(!showReplies)}
      />

      <div className={`flex flex-col pl-4 ${showReplies ? 'block' : 'hidden'}`}>
        {replys.map((reply) => (
          <Comment key={reply.id} commentInfo={reply} />
        ))}
      </div>
    </div>
  )
}

type CommentProps = React.HTMLProps<HTMLDivElement> & {
  commentInfo: CommentInfoType
  parent?: boolean
  showReplies?: boolean
  handleRepliesClick?: () => void
  className?: string
}

function Comment({
  commentInfo,
  parent,
  showReplies,
  handleRepliesClick,
  className,
  ...rest
}: CommentProps) {
  const [showReply, setShowReply] = useState(false)
  const [reply, setReply] = useState('')

  return (
    <div className="flex flex-col">
      <div className={'flex ' + className} {...rest}>
        <Avatar username={commentInfo.username} className="m-2" />

        <div className="grow m-2">
          <p className="text-sm">
            <span className="font-bold text-base">{commentInfo.username}</span>{' '}
            {formateDate(commentInfo.createdAt)}
          </p>

          <p className="mt-0 grow">{commentInfo.text}</p>
        </div>
      </div>

      <div className="flex grow">
        {parent && (commentInfo.replyIds?.length || 0) > 0 && (
          <Button
            active={showReplies}
            onClick={handleRepliesClick}
            className="m-2"
          >
            {commentInfo.replyIds?.length} Replys
          </Button>
        )}

        <div className="grow"></div>

        <button
          onClick={() => setShowReply(!showReply)}
          className="flex m-2 p-2 border rounded-md"
        >
          <FaReply className="h-5 w-5" />

          <p className="ml-2">Reply</p>
        </button>

        <button className="flex m-2 p-2 border rounded-md">
          <FaRegHeart className="h-5 w-5" />

          <p className="ml-2">{commentInfo.likeIds.length}</p>
        </button>
      </div>

      <CommentForm
        reply
        value={reply}
        setValue={setReply}
        className={`mx-2 ${showReply ? 'block' : 'hidden'}`}
      />
    </div>
  )
}
