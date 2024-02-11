import Avatar from './Avatar'

import classNames from '../utils/classNames'
import formateDate from '../utils/formatDate'

type CommentProps = React.HTMLProps<HTMLDivElement> & {
  info: CommentInfoType | null
  loading?: boolean
  className?: string
}

export default function CommentItem({
  info,
  loading = false,
  className,
  ...rest
}: CommentProps) {
  if (loading || !info) return <Loading />

  return (
    <div className={classNames('flex border rounded-md', className)} {...rest}>
      <Avatar username={info.username} className="m-2" />

      <div className="grow m-2">
        <p className="text-sm">
          <span className="font-bold text-base">{info.username}</span>{' '}
          {formateDate(info.createdAt)}
        </p>

        <p className="mt-0 grow">{info.content}</p>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="flex border rounded-md">
      <Avatar loading className="m-2" />

      <div className="grow m-2">
        <div className="animate-pulse h-5 w-24 m-2 bg-slate-500 rounded"></div>

        <div className="animate-pulse h-10 grow mx-2 bg-slate-500 rounded"></div>
      </div>
    </div>
  )
}
