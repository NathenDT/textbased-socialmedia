import { useRouter } from 'next/navigation'

type Props = React.HTMLProps<HTMLDivElement> & {
  username: string
  size?: number
  className?: string
}

export default function Avatar({
  username,
  size = 2.5,
  className,
  ...rest
}: Props) {
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    router.push('/@' + username)
  }

  return (
    <div
      className={
        'inline-flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold select-none aspect-square cursor-pointer hover:bg-blue-600 ' +
        className
      }
      style={{
        width: size + 'em',
        height: size + 'em',
      }}
      onClick={handleClick}
      {...rest}
    >
      <span style={{ fontSize: size / 2 + 'em' }}>
        {username[0].toUpperCase()}
      </span>
    </div>
  )
}
