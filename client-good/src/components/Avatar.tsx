import Link from 'next/link'

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
      onClick={(e) => e.stopPropagation()}
      {...rest}
    >
      <span style={{ fontSize: size / 2 + 'em' }}>
        <Link href={'/user/' + username}>{username[0].toUpperCase()}</Link>
      </span>
    </div>
  )
}
