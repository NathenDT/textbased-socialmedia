import Link from 'next/link'

import LoadingCircle from './LoadingCircle'

import classNames from '../utils/classNames'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  href?: string
  disabled?: boolean
  active?: boolean
  loading?: boolean
  className?: string
}

export default function Button({
  children,
  href,
  disabled = false,
  active = false,
  loading = false,
  type = 'button',
  className,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={classNames(
        'px-4 py-2 bg-blue-500 text-white font-semibold rounded-md focus:outline-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600',
        active ? 'bg-blue-700' : '',
        loading ? 'flex cursor-wait justify-center' : '',
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {href ? (
        <Link href={href}>{children}</Link>
      ) : loading ? (
        <LoadingCircle />
      ) : (
        children
      )}
    </button>
  )
}
