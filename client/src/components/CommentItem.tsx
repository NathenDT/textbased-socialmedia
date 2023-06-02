import Avatar from './Avatar'

import formateDate from '../utils/formatDate'

type CommentProps = React.HTMLProps<HTMLDivElement> & {
  info: CommentInfoType
  className?: string
}

export default function CommentItem({
  info,
  className,
  ...rest
}: CommentProps) {
  return (
    <div className={'flex border rounded-md ' + className} {...rest}>
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
