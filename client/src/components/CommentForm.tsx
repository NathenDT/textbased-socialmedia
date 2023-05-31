import Button from './Button'
import TextArea from './TextArea'

type Props = React.HTMLProps<HTMLDivElement> & {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  className?: string
  reply?: boolean
}

export default function CommentForm({
  value,
  setValue,
  className,
  reply,
  ...rest
}: Props) {
  return (
    <div className={'flex flex-col ' + className} {...rest}>
      <TextArea
        placeholder={`Write a ${reply ? 'reply' : 'comment'}...`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="grow m-2"
      />

      <div className="flex grow justify-end">
        <Button disabled={!value} className="m-2 mt-0">
          {reply ? 'Reply' : 'Comment'}
        </Button>
      </div>
    </div>
  )
}
