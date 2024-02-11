import Link from 'next/link'

import classNames from '../utils/classNames'

type Props = React.HTMLProps<HTMLDivElement> & {
  username?: string
  loading?: boolean
  notLink?: boolean
  size?: number
  className?: string
}

export default function Avatar({
  username,
  loading = false,
  notLink = false,
  size = 2.5,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={classNames(
        'inline-flex items-center justify-center rounded-full text-white text-lg font-semibold select-none aspect-square cursor-pointer',
        loading
          ? 'animate-pulse bg-slate-500 '
          : 'bg-blue-500 hover:bg-blue-600 ',
        className
      )}
      style={{
        width: size + 'em',
        height: size + 'em',
      }}
      onClick={(e) => e.stopPropagation()}
      {...rest}
    >
      {!loading && username && (
        <span style={{ fontSize: size / 2 + 'em' }}>
          {notLink ? (
            username[0].toUpperCase()
          ) : (
            <Link href={'/user/' + username}>{username[0].toUpperCase()}</Link>
          )}
        </span>
      )}
    </div>
  )
}
