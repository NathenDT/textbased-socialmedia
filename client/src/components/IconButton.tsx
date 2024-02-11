import { IconType } from 'react-icons'

import classNames from '../utils/classNames'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  icon: IconType
  loading?: boolean
  className?: string
}

export default function IconButton({
  children,
  icon: Icon,
  loading = false,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={classNames(
        'flex border rounded-md p-2 items-center',
        className
      )}
      {...rest}
    >
      <Icon className="h-5 w-5" />

      {loading ? (
        <div className="animate-pulse bg-slate-500 h-3 w-4 rounded ml-2" />
      ) : (
        <p className="inline-block ml-2">{children}</p>
      )}
    </button>
  )
}
